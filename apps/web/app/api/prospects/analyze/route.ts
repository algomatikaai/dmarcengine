import { enhanceRouteHandler } from '@kit/next/routes';
import { getLogger } from '@kit/shared/logger';
import { z } from 'zod';
import dns from 'dns/promises';

const AnalyzeDomainSchema = z.object({
  domain: z.string().min(1, 'Domain is required'),
  email_service: z.string().optional(),
});

/**
 * @description Analyze a specific domain for DMARC issues and revenue potential
 */
export const POST = enhanceRouteHandler(
  async ({ request }) => {
    const logger = await getLogger();

    const ctx = {
      name: 'prospects.analyze',
    };

    logger.info(ctx, 'Starting domain analysis...');

    try {
      const body = await request.json();
      const { domain, email_service } = AnalyzeDomainSchema.parse(body);

      // Clean the domain (remove protocol, www, etc.)
      const cleanDomain = domain
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '')
        .toLowerCase();

      logger.info(ctx, `Analyzing domain: ${cleanDomain}`);

      // Check DNS records
      const [dmarcStatus, spfStatus, dkimStatus] = await Promise.all([
        checkDMARCRecord(cleanDomain),
        checkSPFRecord(cleanDomain),
        checkDKIMRecord(cleanDomain)
      ]);

      // Calculate basic revenue estimates
      const estimatedRevenue = estimateRevenue(cleanDomain);
      const estimatedMonthlyEmails = estimateEmailVolume(estimatedRevenue, email_service || 'unknown');
      const estimatedMonthlyLoss = calculateRevenueLoss({
        monthlyEmails: estimatedMonthlyEmails,
        dmarcStatus,
        spfStatus,
        dkimStatus,
        estimatedRevenue,
        emailService: email_service || 'unknown'
      });

      const analysis = {
        domain: cleanDomain,
        dns_analysis: {
          dmarc: {
            status: dmarcStatus,
            vulnerable: dmarcStatus === 'missing' || dmarcStatus === 'none',
            record: await getDMARCRecord(cleanDomain)
          },
          spf: {
            status: spfStatus,
            vulnerable: spfStatus === 'missing' || spfStatus === 'fail',
            record: await getSPFRecord(cleanDomain)
          },
          dkim: {
            status: dkimStatus,
            vulnerable: dkimStatus === 'missing',
            record: dkimStatus === 'pass' ? 'Found' : 'Not found'
          }
        },
        revenue_analysis: {
          estimated_monthly_emails: estimatedMonthlyEmails,
          estimated_revenue: estimatedRevenue,
          estimated_monthly_loss: estimatedMonthlyLoss,
          risk_level: getRiskLevel(dmarcStatus, spfStatus, dkimStatus),
          email_service: email_service || 'unknown'
        },
        recommendations: generateRecommendations(dmarcStatus, spfStatus, dkimStatus, estimatedMonthlyLoss),
        analyzed_at: new Date().toISOString()
      };

      logger.info(ctx, `Domain analysis complete: ${cleanDomain} - $${estimatedMonthlyLoss}/month potential loss`);

      return new Response(
        JSON.stringify({
          success: true,
          analysis
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      logger.error({ ...ctx, error }, 'Failed to analyze domain');

      if (error instanceof z.ZodError) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Invalid request data',
            details: error.errors
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to analyze domain',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
  {
    auth: true,
  }
);

// Helper functions

async function checkDMARCRecord(domain: string): Promise<'none' | 'quarantine' | 'reject' | 'missing'> {
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

async function checkSPFRecord(domain: string): Promise<'pass' | 'fail' | 'missing'> {
  try {
    const records = await dns.resolveTxt(domain);
    
    for (const record of records) {
      const recordText = Array.isArray(record) ? record.join('') : record;
      
      if (recordText.includes('v=spf1')) {
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

async function checkDKIMRecord(domain: string): Promise<'pass' | 'fail' | 'missing'> {
  const selectors = ['default', 'selector1', 'selector2', 'mail', 'dkim', 'google'];
  
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

async function getDMARCRecord(domain: string): Promise<string | null> {
  try {
    const records = await dns.resolveTxt(`_dmarc.${domain}`);
    
    for (const record of records) {
      const recordText = Array.isArray(record) ? record.join('') : record;
      
      if (recordText.includes('v=DMARC1')) {
        return recordText;
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function getSPFRecord(domain: string): Promise<string | null> {
  try {
    const records = await dns.resolveTxt(domain);
    
    for (const record of records) {
      const recordText = Array.isArray(record) ? record.join('') : record;
      
      if (recordText.includes('v=spf1')) {
        return recordText;
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

function estimateRevenue(domain: string): number {
  // Simple domain-based revenue estimation
  // In a real implementation, this would use more sophisticated signals
  
  // Base estimate
  let revenue = 1000000; // $1M base
  
  // Adjust based on domain characteristics
  if (domain.includes('shop') || domain.includes('store') || domain.includes('buy')) {
    revenue *= 1.5; // E-commerce indicators
  }
  
  if (domain.length > 15) {
    revenue *= 0.8; // Longer domains might be smaller companies
  }
  
  return Math.min(revenue, 50000000); // Cap at $50M
}

function estimateEmailVolume(revenue: number, emailService: string): number {
  const serviceMultipliers: Record<string, number> = {
    'sendgrid': 1.2,
    'amazonses': 1.0,
    'mailgun': 1.1,
    'mailchimp': 0.8,
    'postmark': 0.9,
    'unknown': 1.0
  };
  
  const multiplier = serviceMultipliers[emailService?.toLowerCase()] || 1.0;
  const baseEmails = (revenue / 100000) * multiplier;
  
  return Math.floor(baseEmails);
}

function calculateRevenueLoss(params: {
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

  // Email-to-revenue conversion rate
  const avgOrderValue = estimatedRevenue / (monthlyEmails * 0.02);
  
  // Calculate monthly loss
  const failedEmails = monthlyEmails * failureRate;
  const monthlyLoss = failedEmails * avgOrderValue * 0.02;
  
  return Math.floor(monthlyLoss);
}

function getRiskLevel(dmarcStatus: string, spfStatus: string, dkimStatus: string): 'low' | 'medium' | 'high' | 'critical' {
  if (dmarcStatus === 'missing' && (spfStatus === 'missing' || dkimStatus === 'missing')) {
    return 'critical';
  }
  
  if (dmarcStatus === 'missing' || dmarcStatus === 'none') {
    return 'high';
  }
  
  if (spfStatus === 'fail' || dkimStatus === 'missing') {
    return 'medium';
  }
  
  return 'low';
}

function generateRecommendations(dmarcStatus: string, spfStatus: string, dkimStatus: string, monthlyLoss: number): string[] {
  const recommendations: string[] = [];
  
  if (dmarcStatus === 'missing') {
    recommendations.push('Implement DMARC policy to protect against email spoofing');
  } else if (dmarcStatus === 'none') {
    recommendations.push('Upgrade DMARC policy from p=none to p=quarantine or p=reject');
  }
  
  if (spfStatus === 'missing') {
    recommendations.push('Add SPF record to authorize email senders');
  } else if (spfStatus === 'fail') {
    recommendations.push('Fix SPF record configuration to prevent authentication failures');
  }
  
  if (dkimStatus === 'missing') {
    recommendations.push('Configure DKIM signing to improve email authentication');
  }
  
  if (monthlyLoss > 5000) {
    recommendations.push('High revenue impact - prioritize immediate implementation');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Email authentication is properly configured');
  }
  
  return recommendations;
}