import { getLogger } from '@kit/shared/logger';
import dns from 'dns/promises';

/**
 * Types for prospect discovery
 */
export interface DiscoveryParams {
  limit: number;
  targetServices: string[];
}

export interface ProspectData {
  domain: string;
  company_name: string;
  email_service: string;
  industry: string;
  estimated_monthly_emails: number;
  estimated_revenue: number;
  dmarc_status: 'none' | 'quarantine' | 'reject' | 'missing';
  spf_status: 'pass' | 'fail' | 'missing';
  dkim_status: 'pass' | 'fail' | 'missing';
  estimated_monthly_loss: number;
  discovery_source: string;
  contact_email?: string;
  company_size?: string;
  created_at: string;
  status: 'active' | 'contacted' | 'converted' | 'ignored';
}

interface BuiltWithResponse {
  Results: Array<{
    Domain: string;
    FirstIndexed: string;
    LastIndexed: string;
    Technologies: Array<{
      Name: string;
      Link: string;
      Tag: string;
    }>;
  }>;
}

/**
 * Service for discovering high-value DMARC prospects
 */
export class ProspectDiscoveryService {
  private readonly logger = getLogger();
  private readonly builtwithApiKey = process.env.BUILTWITH_API_KEY;

  constructor() {
    if (!this.builtwithApiKey) {
      throw new Error('BUILTWITH_API_KEY environment variable is required');
    }
  }

  /**
   * Discover prospects using BuiltWith API and DNS analysis
   */
  async discoverProspects(params: DiscoveryParams): Promise<ProspectData[]> {
    const logger = await this.logger;
    const ctx = { name: 'ProspectDiscoveryService.discoverProspects' };

    logger.info(ctx, 'Starting prospect discovery...');

    const prospects: ProspectData[] = [];

    // Discover prospects for each target service
    for (const service of params.targetServices) {
      try {
        const serviceProspects = await this.discoverByEmailService(service, Math.floor(params.limit / params.targetServices.length));
        prospects.push(...serviceProspects);
      } catch (error) {
        logger.error({ ...ctx, error, service }, `Failed to discover prospects for ${service}`);
      }
    }

    // Remove duplicates and sort by revenue loss potential
    const uniqueProspects = this.deduplicateProspects(prospects);
    const sortedProspects = uniqueProspects
      .sort((a, b) => b.estimated_monthly_loss - a.estimated_monthly_loss)
      .slice(0, params.limit);

    logger.info(ctx, `Discovered ${sortedProspects.length} unique high-value prospects`);

    return sortedProspects;
  }

  /**
   * Discover prospects using a specific email service
   */
  private async discoverByEmailService(service: string, limit: number): Promise<ProspectData[]> {
    const logger = await this.logger;
    const ctx = { name: 'ProspectDiscoveryService.discoverByEmailService', service };

    logger.info(ctx, `Discovering prospects using ${service}...`);

    try {
      // Query BuiltWith API for companies using this email service
      const builtWithData = await this.queryBuiltWithAPI(service, limit);
      
      const prospects: ProspectData[] = [];

      for (const result of builtWithData.Results) {
        try {
          // Analyze each domain for DMARC issues and revenue potential
          const prospect = await this.analyzeDomain(result.Domain, service, result);
          
          if (prospect && prospect.estimated_monthly_loss >= 1000) {
            prospects.push(prospect);
          }
        } catch (error) {
          logger.warn({ ...ctx, error, domain: result.Domain }, `Failed to analyze domain`);
        }
      }

      return prospects;
    } catch (error) {
      logger.error({ ...ctx, error }, `Failed to discover prospects for ${service}`);
      return [];
    }
  }

  /**
   * Query BuiltWith API for companies using specific technology
   */
  private async queryBuiltWithAPI(technology: string, limit: number): Promise<BuiltWithResponse> {
    const logger = await this.logger;
    const ctx = { name: 'ProspectDiscoveryService.queryBuiltWithAPI', technology };

    // Map service names to BuiltWith technology names
    const techMapping: Record<string, string> = {
      'sendgrid': 'SendGrid',
      'amazonses': 'Amazon SES',
      'mailgun': 'Mailgun',
      'mailchimp': 'MailChimp',
      'postmark': 'Postmark'
    };

    const techName = techMapping[technology.toLowerCase()] || technology;

    const url = new URL('https://api.builtwith.com/free1/api.json');
    url.searchParams.set('key', this.builtwithApiKey!);
    url.searchParams.set('lookup', techName);
    url.searchParams.set('limit', limit.toString());

    logger.info(ctx, `Querying BuiltWith API for ${techName}...`);

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': 'DMARCEngine/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`BuiltWith API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      logger.info(ctx, `Found ${data.Results?.length || 0} results for ${techName}`);

      return data;
    } catch (error) {
      logger.error({ ...ctx, error }, `Failed to query BuiltWith API`);
      throw error;
    }
  }

  /**
   * Analyze a domain for DMARC issues and revenue potential
   */
  private async analyzeDomain(domain: string, emailService: string, builtWithData: any): Promise<ProspectData | null> {
    const logger = await this.logger;
    const ctx = { name: 'ProspectDiscoveryService.analyzeDomain', domain };

    try {
      // Check DNS records for email authentication
      const [dmarcStatus, spfStatus, dkimStatus] = await Promise.all([
        this.checkDMARCRecord(domain),
        this.checkSPFRecord(domain),
        this.checkDKIMRecord(domain)
      ]);

      // Only target domains with DMARC issues (p=none or missing)
      if (dmarcStatus === 'reject') {
        return null; // Already properly configured
      }

      // Estimate company size and email volume
      const estimatedRevenue = this.estimateCompanyRevenue(domain, builtWithData);
      const estimatedMonthlyEmails = this.estimateEmailVolume(estimatedRevenue, emailService);
      
      // Ignore small companies with low email volume
      if (estimatedMonthlyEmails < 5000) {
        return null;
      }

      // Calculate potential monthly revenue loss
      const estimatedMonthlyLoss = this.calculateRevenueLoss({
        monthlyEmails: estimatedMonthlyEmails,
        dmarcStatus,
        spfStatus,
        dkimStatus,
        estimatedRevenue,
        emailService
      });

      // Generate company name from domain
      const companyName = this.generateCompanyName(domain);

      const prospect: ProspectData = {
        domain,
        company_name: companyName,
        email_service: emailService,
        industry: this.guessIndustry(domain, builtWithData),
        estimated_monthly_emails: estimatedMonthlyEmails,
        estimated_revenue: estimatedRevenue,
        dmarc_status: dmarcStatus,
        spf_status: spfStatus,
        dkim_status: dkimStatus,
        estimated_monthly_loss: estimatedMonthlyLoss,
        discovery_source: 'builtwith',
        company_size: this.estimateCompanySize(estimatedRevenue),
        created_at: new Date().toISOString(),
        status: 'active'
      };

      logger.info(ctx, `Analyzed ${domain}: $${estimatedMonthlyLoss}/month potential loss`);

      return prospect;
    } catch (error) {
      logger.error({ ...ctx, error }, `Failed to analyze domain ${domain}`);
      return null;
    }
  }

  /**
   * Check DMARC record for a domain
   */
  private async checkDMARCRecord(domain: string): Promise<'none' | 'quarantine' | 'reject' | 'missing'> {
    try {
      const records = await dns.resolveTxt(`_dmarc.${domain}`);
      
      for (const record of records) {
        const recordText = Array.isArray(record) ? record.join('') : record;
        
        if (recordText.includes('v=DMARC1')) {
          if (recordText.includes('p=reject')) return 'reject';
          if (recordText.includes('p=quarantine')) return 'quarantine';
          if (recordText.includes('p=none')) return 'none';
        }
      }
      
      return 'missing';
    } catch (error) {
      return 'missing';
    }
  }

  /**
   * Check SPF record for a domain
   */
  private async checkSPFRecord(domain: string): Promise<'pass' | 'fail' | 'missing'> {
    try {
      const records = await dns.resolveTxt(domain);
      
      for (const record of records) {
        const recordText = Array.isArray(record) ? record.join('') : record;
        
        if (recordText.includes('v=spf1')) {
          // Basic SPF validation
          if (recordText.includes('-all') || recordText.includes('~all')) {
            return 'pass';
          } else {
            return 'fail';
          }
        }
      }
      
      return 'missing';
    } catch (error) {
      return 'missing';
    }
  }

  /**
   * Check DKIM record (simplified check)
   */
  private async checkDKIMRecord(domain: string): Promise<'pass' | 'fail' | 'missing'> {
    // Common DKIM selectors to check
    const selectors = ['default', 'selector1', 'selector2', 'mail', 'dkim'];
    
    for (const selector of selectors) {
      try {
        const records = await dns.resolveTxt(`${selector}._domainkey.${domain}`);
        
        for (const record of records) {
          const recordText = Array.isArray(record) ? record.join('') : record;
          
          if (recordText.includes('v=DKIM1')) {
            return 'pass';
          }
        }
      } catch (error) {
        // Continue checking other selectors
      }
    }
    
    return 'missing';
  }

  /**
   * Estimate company revenue based on domain and other signals
   */
  private estimateCompanyRevenue(domain: string, builtWithData: any): number {
    // Basic revenue estimation based on domain characteristics
    // This would be enhanced with more sophisticated analysis
    
    const technologies = builtWithData.Technologies || [];
    
    // Base estimate
    let revenue = 1000000; // $1M base
    
    // Adjust based on technologies used
    const enterpriseTech = technologies.filter((tech: any) => 
      ['Salesforce', 'HubSpot', 'Marketo', 'Oracle', 'SAP'].includes(tech.Name)
    );
    
    if (enterpriseTech.length > 0) {
      revenue *= 5; // Enterprise tech suggests larger company
    }

    // Domain age and other factors would be considered in a real implementation
    
    return Math.min(revenue, 50000000); // Cap at $50M for our target market
  }

  /**
   * Estimate monthly email volume based on revenue and service type
   */
  private estimateEmailVolume(revenue: number, emailService: string): number {
    // Different services indicate different email volumes
    const serviceMultipliers: Record<string, number> = {
      'sendgrid': 1.2,  // Higher volume transactional
      'amazonses': 1.0,  // Standard
      'mailgun': 1.1,   // Slightly higher
      'mailchimp': 0.8, // Mostly marketing
      'postmark': 0.9   // Smaller volume
    };
    
    const multiplier = serviceMultipliers[emailService.toLowerCase()] || 1.0;
    
    // Rough estimate: $1M revenue = ~10k emails/month
    const baseEmails = (revenue / 100000) * multiplier;
    
    return Math.floor(baseEmails);
  }

  /**
   * Calculate potential monthly revenue loss from email authentication issues
   */
  private calculateRevenueLoss(params: {
    monthlyEmails: number;
    dmarcStatus: string;
    spfStatus: string;
    dkimStatus: string;
    estimatedRevenue: number;
    emailService: string;
  }): number {
    const {
      monthlyEmails,
      dmarcStatus,
      spfStatus,
      dkimStatus,
      estimatedRevenue,
      emailService
    } = params;

    // Base failure rate based on authentication status
    let failureRate = 0;

    if (dmarcStatus === 'missing') {
      failureRate += 0.15; // 15% failure rate without DMARC
    } else if (dmarcStatus === 'none') {
      failureRate += 0.08; // 8% failure rate with monitoring-only DMARC
    }

    if (spfStatus === 'missing' || spfStatus === 'fail') {
      failureRate += 0.05; // Additional 5% for SPF issues
    }

    if (dkimStatus === 'missing') {
      failureRate += 0.03; // Additional 3% for missing DKIM
    }

    // Email-to-revenue conversion rate (varies by industry and email type)
    const avgOrderValue = estimatedRevenue / (monthlyEmails * 0.02); // Assume 2% of emails drive revenue
    
    // Calculate monthly loss
    const failedEmails = monthlyEmails * failureRate;
    const monthlyLoss = failedEmails * avgOrderValue * 0.02; // 2% conversion rate for failed emails
    
    return Math.floor(monthlyLoss);
  }

  /**
   * Generate company name from domain
   */
  private generateCompanyName(domain: string): string {
    const name = domain.replace(/\.(com|net|org|io|co\.uk|co|app)$/i, '');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /**
   * Guess industry from domain and technologies
   */
  private guessIndustry(domain: string, builtWithData: any): string {
    const technologies = builtWithData.Technologies || [];
    
    // E-commerce indicators
    const ecommerceTech = technologies.filter((tech: any) => 
      ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce'].includes(tech.Name)
    );
    
    if (ecommerceTech.length > 0) {
      return 'E-commerce';
    }

    // SaaS indicators
    const saasTech = technologies.filter((tech: any) => 
      ['React', 'Angular', 'Vue.js', 'Node.js', 'Docker'].includes(tech.Name)
    );
    
    if (saasTech.length > 2) {
      return 'SaaS';
    }

    return 'Business Services';
  }

  /**
   * Estimate company size based on revenue
   */
  private estimateCompanySize(revenue: number): string {
    if (revenue < 1000000) return 'Small';
    if (revenue < 10000000) return 'Medium';
    return 'Large';
  }

  /**
   * Remove duplicate prospects based on domain
   */
  private deduplicateProspects(prospects: ProspectData[]): ProspectData[] {
    const seen = new Set<string>();
    return prospects.filter(prospect => {
      if (seen.has(prospect.domain)) {
        return false;
      }
      seen.add(prospect.domain);
      return true;
    });
  }
}