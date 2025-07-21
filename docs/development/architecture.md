# DMARCEngine - Technical Architecture
*System design and architecture documentation*

## 🏗️ System Overview

DMARCEngine is built as a modern SaaS platform targeting the 42.7M companies with DIY DMARC implementations, providing automated monitoring, optimization, and threat intelligence.

### Core Architecture Principles
- **Automation First:** Every component designed for minimal human intervention
- **Scalability:** Built to handle 10,000+ customers with automated operations
- **Performance:** <2s page loads, <500ms dashboard refresh times
- **Security:** Multi-provider infrastructure with perfect DMARC implementation

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DMARCEngine Platform                      │
├─────────────────────────────────────────────────────────────┤
│                     Frontend Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Marketing     │  │   Dashboard     │  │   Admin     │  │
│  │   Website       │  │   (Customer)    │  │   Panel     │  │
│  │  (Next.js 15)   │  │  (React 19)     │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   DMARC Engine  │  │   Email Engine  │  │   Business  │  │
│  │   - DNS Scanning│  │   - Outreach    │  │   Logic     │  │
│  │   - Analysis    │  │   - Templates   │  │   - Auth    │  │
│  │   - Reporting   │  │   - Automation  │  │   - Billing │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Data Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   PostgreSQL    │  │     Redis       │  │   Storage   │  │
│  │   (Supabase)    │  │   (Caching)     │  │  (Files)    │  │
│  │   - User Data   │  │   - Sessions    │  │  - Reports  │  │
│  │   - DMARC Data  │  │   - Queues      │  │  - Exports  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                   External Services                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   AWS SES       │  │     Stripe      │  │   BuiltWith │  │
│  │   (Email)       │  │   (Billing)     │  │   (Data)    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🧩 Core Components

### 1. DMARC Discovery Engine
**Purpose:** Automated identification and qualification of DIY DMARC users

**Architecture:**
```typescript
interface DMARCDiscoveryEngine {
  // DNS Scanning System
  domainScanner: {
    capacity: "10,000 domains/day",
    sources: ["BuiltWith API", "Domain lists", "Company databases"],
    analysis: "Real-time DMARC record parsing and scoring"
  },
  
  // Qualification System
  prospectQualifier: {
    scoring: "AI-based qualification algorithm",
    enrichment: "Company data integration",
    prioritization: "Lead scoring and ranking"
  },
  
  // Database Integration
  storage: {
    prospects: "PostgreSQL with indexed search",
    dmarc_data: "Time-series DMARC record tracking",
    company_data: "Enriched company information"
  }
}
```

### 2. DMARC Management Dashboard
**Purpose:** Professional monitoring and optimization interface for customers

**Architecture:**
```typescript
interface DMARCDashboard {
  // Real-time Monitoring
  monitoring: {
    compliance_scoring: "0-100 scoring system with trending",
    threat_intelligence: "Real-time threat detection and analysis",
    policy_recommendations: "AI-generated optimization suggestions"
  },
  
  // Analytics Engine
  analytics: {
    historical_analysis: "Time-series compliance tracking",
    comparative_analysis: "Industry benchmarking",
    performance_metrics: "Email deliverability correlation"
  },
  
  // Alert System
  alerts: {
    channels: ["Email", "In-app", "SMS", "Webhooks"],
    triggers: "Configurable thresholds and conditions",
    escalation: "Smart escalation based on severity"
  }
}
```

### 3. Automated Email Outreach
**Purpose:** Customer acquisition without human intervention

**Architecture:**
```typescript
interface EmailOutreachEngine {
  // Campaign Management
  campaigns: {
    sequences: "Multi-touch email sequences",
    personalization: "Dynamic content based on DMARC analysis",
    timing: "AI-optimized sending schedules"
  },
  
  // Deliverability System
  deliverability: {
    infrastructure: "AWS SES with multiple IPs",
    reputation: "Domain warming and monitoring",
    compliance: "CAN-SPAM and GDPR compliance"
  },
  
  // Performance Tracking
  analytics: {
    engagement: "Open, click, conversion tracking",
    optimization: "A/B testing and performance optimization",
    attribution: "Revenue attribution to campaigns"
  }
}
```

## 🗄️ Data Architecture

### Database Schema Overview
```sql
-- Core Business Entities (MakerKit Foundation)
accounts (customers, teams)
users (individual users)
subscriptions (billing and plans)
memberships (team relationships)

-- DMARC-Specific Entities
domains (customer domains)
dmarc_records (parsed DMARC configurations)
dmarc_reports (analysis results)
dmarc_recommendations (optimization suggestions)

-- Customer Acquisition
prospects (potential customers)
email_campaigns (outreach campaigns)
email_sequences (campaign flows)
campaign_performance (tracking data)

-- Operational
notifications (system alerts)
audit_logs (compliance tracking)
support_tickets (customer service)
```

### Data Flow Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   DNS Sources   │───▶│  DMARC Engine   │───▶│   PostgreSQL    │
│  - BuiltWith    │    │  - Scanning     │    │  - Structured   │
│  - Domain Lists │    │  - Analysis     │    │  - Indexed      │
│  - Public Data  │    │  - Enrichment   │    │  - Auditable    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                  │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Customers     │◀───│   Dashboard     │◀───│   Redis Cache   │
│  - Monitoring   │    │  - Real-time    │    │  - Sessions     │
│  - Alerts       │    │  - Analytics    │    │  - Fast Access  │
│  - Reports      │    │  - Controls     │    │  - Queue Jobs   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## ⚡ Performance Architecture

### Scalability Design
```typescript
interface PerformanceArchitecture {
  // Frontend Performance
  frontend: {
    framework: "Next.js 15 with App Router",
    optimization: "Code splitting, lazy loading, CDN",
    caching: "Static generation + ISR for marketing",
    metrics: "Core Web Vitals monitoring"
  },
  
  // API Performance
  api: {
    architecture: "Next.js API routes with edge functions",
    caching: "Redis for frequent data, CDN for static",
    rate_limiting: "Tiered limits based on subscription",
    monitoring: "Response time tracking and alerting"
  },
  
  // Database Performance
  database: {
    architecture: "PostgreSQL with read replicas",
    indexing: "Optimized indexes for common queries",
    partitioning: "Time-series data partitioning",
    monitoring: "Query performance and slow query detection"
  }
}
```

### Auto-Scaling Strategy
```
Load Balancer (Vercel)
    │
    ├─ Web App Instances (Auto-scale)
    ├─ API Route Handlers (Edge Functions)
    └─ Background Jobs (Queue Workers)
         │
         ├─ DNS Scanning Jobs
         ├─ Email Campaign Jobs
         ├─ Report Analysis Jobs
         └─ Notification Jobs
```

## 🔒 Security Architecture

### Multi-Layer Security
```typescript
interface SecurityArchitecture {
  // Application Security
  application: {
    authentication: "Supabase Auth with MFA support",
    authorization: "Row-level security (RLS) policies",
    input_validation: "Zod schemas for all inputs",
    output_encoding: "Automatic XSS prevention"
  },
  
  // Infrastructure Security
  infrastructure: {
    hosting: "Vercel with edge security",
    database: "Supabase with encryption at rest",
    email: "AWS SES with DKIM/SPF/DMARC",
    monitoring: "Real-time security event detection"
  },
  
  // Data Security
  data: {
    encryption: "TLS 1.3 in transit, AES-256 at rest",
    privacy: "GDPR compliance with data retention policies",
    audit: "Complete audit trail for compliance",
    backup: "Automated encrypted backups"
  }
}
```

## 🔄 Integration Architecture

### External Service Integration
```typescript
interface ExternalIntegrations {
  // Email Infrastructure
  email: {
    primary: "AWS SES for bulk campaigns",
    transactional: "Postmark for customer emails",
    monitoring: "Real-time deliverability tracking"
  },
  
  // Payment Processing
  billing: {
    processor: "Stripe for subscription management",
    features: "Usage-based billing, proration, tax",
    webhooks: "Real-time subscription event handling"
  },
  
  // Data Enrichment
  data: {
    company_data: "BuiltWith API for technology detection",
    dns_services: "Multiple DNS providers for reliability",
    threat_intel: "Security threat feed integration"
  }
}
```

## 🚀 Deployment Architecture

### Production Environment
```
Production Stack:
├── Frontend: Vercel deployment with global CDN
├── Database: Supabase managed PostgreSQL
├── Cache: Redis Cloud for session and application cache
├── Email: AWS SES with dedicated IPs
├── Monitoring: Sentry for errors, Vercel Analytics for performance
├── Backups: Automated daily backups with point-in-time recovery
└── Security: WAF, DDoS protection, SSL termination
```

### Development Workflow
```
Development Flow:
├── Local Development: pnpm dev with local Supabase
├── Feature Branches: Git workflow with PR reviews
├── Staging: Automatic deployment to preview environments
├── Testing: Automated CI/CD with comprehensive test suite
├── Production: Manual deployment with rollback capabilities
└── Monitoring: Real-time performance and error tracking
```

This architecture provides the foundation for DMARCEngine to scale efficiently while maintaining security, performance, and reliability standards required for the target market of 42.7M DIY DMARC users.