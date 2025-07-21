# DMARCEngine - Project Instructions
*Team & AI Agent Development Guide*

## 🎯 PROJECT MISSION
Build an automated DMARC management SaaS platform that serves the 42.7 million companies with DIY DMARC implementations. This is designed as a "money printer" - maximum automation, minimum human intervention, targeting $15M+ exit within 24 months.

## 🏗️ TECHNICAL FOUNDATION

### Core Technology Stack
- **Framework:** Next.js 14 with App Router (latest stable)
- **Foundation:** MakerKit SaaS boilerplate (pre-built auth, billing, multi-tenancy)
- **Database:** Supabase (PostgreSQL with real-time features)
- **ORM:** Prisma ORM for type-safe database operations
- **Styling:** Tailwind CSS + Shadcn UI components
- **Payments:** Stripe (integrated with MakerKit)
- **Hosting:** Vercel with edge functions
- **Email Infrastructure:** AWS SES (bulk) + Postmark (transactional)
- **Monitoring:** Sentry for errors, Vercel Analytics for performance

### Project Structure (MakerKit Based)
```
dmarcengine/
├── apps/web/                    # Main Next.js application
│   ├── app/
│   │   ├── (marketing)/        # Landing pages, pricing, blog
│   │   ├── (auth)/             # Authentication pages
│   │   ├── home/
│   │   │   ├── (user)/         # Personal dashboard
│   │   │   └── [account]/      # Team workspace
│   │   └── api/                # API routes
│   ├── components/             # Shared components
│   ├── lib/                    # Utilities, hooks, services
│   ├── config/                 # Application configuration
│   └── supabase/              # Database schemas
├── packages/                   # Shared packages
├── docs/                      # MakerKit documentation (cloned)
└── claude-instructions/       # This file and related docs
```

## 👥 TEAM STRUCTURE & RESPONSIBILITIES

### Founder Role (2-4 hours/day maximum)
```
Daily Focus:
├── Morning (30 min): Review metrics, team standup
├── Core Work (2-3 hours): Claude Code development sessions
├── Evening (30 min): Strategic decisions, next-day planning
└── Weekly (2 hours): Product roadmap, team performance review

Responsibilities:
├── Strategic product decisions
├── Claude Code automation development
├── Customer feedback analysis
├── Financial planning and fundraising
└── Team hiring and management (when needed)
```

### Next.js Developer (Full-time)
```
Primary Responsibilities:
├── MakerKit customization and feature development
├── DMARC scanning engine implementation
├── Dashboard UI/UX development
├── API integration and optimization
├── Performance monitoring and optimization
├── Code reviews and quality assurance
└── Technical documentation

Daily Workflow:
├── Feature development using Claude Code assistance
├── Bug fixes and performance optimization
├── Integration testing and deployment
├── Code review and documentation updates
└── Team collaboration and planning
```

### Marketing Team (4 people, part-time)
```
Marketing Lead (6 hours/day):
├── Email campaign strategy and automation
├── Content marketing and SEO optimization
├── Customer acquisition funnel optimization
├── Competitive analysis and positioning
└── Team coordination and performance tracking

Content Creators (2 people, 4 hours/day each):
├── Blog posts and educational content
├── Email templates and sequences
├── Social media content automation
├── Customer success stories and case studies
└── SEO-optimized landing pages

Marketing Automation Specialist (4 hours/day):
├── Email infrastructure management
├── Campaign performance optimization
├── Lead scoring and qualification
├── Integration management (BuiltWith, etc.)
└── Analytics and reporting automation
```

## 🤖 CLAUDE CODE INTEGRATION

### Development Philosophy
- **Automation First:** Every feature should run without human oversight
- **MakerKit Patterns:** Follow established MakerKit conventions and patterns
- **Template-Driven:** Use consistent patterns for rapid development
- **Error Resilient:** Graceful failure handling and recovery
- **Data-Driven:** Log everything for optimization and debugging

### Claude Code Workflow
```
1. Daily Development Sessions (2-3 hours):
   ├── Review previous day's development
   ├── Define specific feature requirements
   ├── Use Claude Code to generate implementation
   ├── Test and iterate on generated code
   └── Deploy and monitor performance

2. Code Generation Priorities:
   ├── DMARC scanning and analysis logic
   ├── Email automation and templating
   ├── Dashboard components and data visualization
   ├── API integrations and data processing
   └── Customer onboarding and billing flows

3. Quality Assurance:
   ├── Code review before merging
   ├── Automated testing implementation
   ├── Performance benchmarking
   ├── Security vulnerability scanning
   └── User acceptance testing
```

### MakerKit Documentation Integration
```
Setup Instructions:
1. Clone MakerKit documentation locally:
   git clone https://github.com/makerkit/documentation.git ./docs

2. Reference during development:
   ├── Authentication patterns
   ├── Billing integration guides
   ├── Component library usage
   ├── Database schema conventions
   └── Deployment procedures

3. Custom Extensions:
   ├── DMARC-specific database models
   ├── Email automation workflows
   ├── Customer dashboard customizations
   ├── Subscription tier management
   └── API endpoint additions
```

## 📊 DEVELOPMENT PRIORITIES

### Phase 1: Foundation (Weeks 1-2)
```
Week 1 Objectives:
├── MakerKit installation and configuration
├── Basic DMARC checker implementation
├── Customer authentication and billing setup
├── Email infrastructure configuration
└── Landing page and pricing implementation

Week 2 Objectives:
├── Customer dashboard development
├── DMARC report processing engine
├── Email campaign automation setup
├── Basic customer onboarding flow
└── Performance monitoring implementation
```

### Phase 2: Core Features (Weeks 3-4)
```
Week 3 Objectives:
├── Advanced DMARC analysis features
├── Alert and notification system
├── Customer support chat integration
├── Payment processing optimization
└── Mobile responsiveness implementation

Week 4 Objectives:
├── API documentation and testing
├── Advanced dashboard analytics
├── Email deliverability optimization
├── Customer feedback collection system
└── Performance optimization and scaling
```

### Phase 3: Growth Features (Weeks 5-8)
```
Advanced Features:
├── White-label capabilities for resellers
├── Advanced analytics and reporting
├── Third-party integrations (BuiltWith, etc.)
├── Enterprise customer features
├── Mobile app development
├── Advanced security features
└── International market support
```

## 🛠️ DEVELOPMENT GUIDELINES

### Code Quality Standards
```
TypeScript Requirements:
├── Strict mode enabled, no any types
├── Proper interface definitions
├── Comprehensive error handling
├── Performance optimization
└── Security best practices

Testing Requirements:
├── Unit tests for business logic
├── Integration tests for API endpoints
├── End-to-end tests for critical flows
├── Performance testing for scalability
└── Security testing for vulnerabilities

Documentation Standards:
├── Inline comments for complex logic
├── API documentation (OpenAPI/Swagger)
├── Component documentation (Storybook)
├── Database schema documentation
└── Deployment and maintenance guides
```

### MakerKit Conventions
```
Follow MakerKit Patterns:
├── Authentication: Use Supabase Auth integration
├── Billing: Leverage Stripe integration
├── Multi-tenancy: Follow workspace patterns
├── UI Components: Use provided component library
├── API Routes: Follow established routing patterns
├── Database: Use Prisma schema conventions
└── Deployment: Use Vercel deployment pipeline
```

### Security Requirements
```
Authentication & Authorization:
├── Multi-factor authentication for sensitive operations
├── Role-based access control (RBAC)
├── API rate limiting and DDoS protection
├── Input validation and sanitization
└── SQL injection prevention

Data Protection:
├── Encryption at rest and in transit
├── PII data handling compliance
├── GDPR and privacy regulation compliance
├── Regular security audits
└── Incident response procedures
```

## 📈 AUTOMATION REQUIREMENTS

### Customer Acquisition Automation
```
Daily Automation Tasks:
├── DNS scanning for DIY DMARC implementations
├── Company data enrichment and qualification
├── Personalized email campaign generation
├── Engagement tracking and follow-up scheduling
└── Lead scoring and prioritization

Weekly Automation Tasks:
├── Campaign performance analysis
├── Customer segmentation updates
├── Content generation for marketing
├── Competitive intelligence gathering
└── Financial reporting and analysis
```

### Customer Success Automation
```
Onboarding Automation:
├── Welcome email sequences
├── Feature introduction tutorials
├── Progress tracking and guidance
├── Success milestone celebrations
└── Upgrade recommendation triggers

Retention Automation:
├── Usage monitoring and health scoring
├── Proactive issue detection and resolution
├── Renewal reminder campaigns
├── Expansion opportunity identification
└── Churn prediction and prevention
```

## 💰 FINANCIAL TRACKING

### Key Metrics Dashboard
```
Daily Metrics:
├── New trial signups
├── Trial to paid conversions
├── Monthly recurring revenue (MRR)
├── Customer acquisition cost (CAC)
├── Customer lifetime value (LTV)
├── Churn rate and retention
└── System performance and uptime

Weekly Metrics:
├── Revenue growth rate
├── Customer satisfaction (NPS)
├── Feature adoption rates
├── Support ticket volume
├── Marketing campaign performance
├── Competitive analysis updates
└── Team productivity metrics
```

### Budget Management
```
Monthly Operating Costs:
├── Infrastructure: ~$500 (Vercel, Supabase, AWS)
├── Tools and Services: ~$800 (BuiltWith, monitoring, etc.)
├── Marketing: ~$1,000 (email, content, advertising)
├── Team Compensation: Variable based on revenue
└── Total: ~$2,300 base + team costs

Revenue Targets:
├── Month 3: $35K MRR (500 customers)
├── Month 6: $150K MRR (2,000 customers)
├── Month 12: $750K MRR (10,000 customers)
└── Break-even: Month 2-3 with conservative growth
```

## 🚀 DEPLOYMENT & OPERATIONS

### Deployment Pipeline
```
Development Workflow:
├── Feature branches for new development
├── Pull request reviews and testing
├── Staging deployment for validation
├── Production deployment with monitoring
└── Post-deployment verification and rollback plans

Monitoring and Alerting:
├── Application performance monitoring (APM)
├── Error tracking and notification
├── Infrastructure monitoring and scaling
├── Customer experience monitoring
└── Security incident detection and response
```

### Operational Procedures
```
Daily Operations:
├── System health checks and monitoring
├── Customer support ticket management
├── Performance optimization and scaling
├── Security monitoring and updates
└── Backup verification and maintenance

Weekly Operations:
├── Infrastructure cost optimization
├── Performance analysis and improvements
├── Security audit and vulnerability assessment
├── Team performance review and planning
└── Strategic planning and goal adjustment
```

## 📋 SUCCESS CRITERIA

### Phase 1 Success (Month 3)
```
Technical Achievements:
├── ✅ Full DMARC scanning and analysis functionality
├── ✅ Customer dashboard with real-time monitoring
├── ✅ Automated email outreach generating 100+ trials/week
├── ✅ Payment processing and customer management
└── ✅ 99.9% system uptime with monitoring

Business Achievements:
├── ✅ 500+ paying customers generating $35K+ MRR
├── ✅ <$95 customer acquisition cost
├── ✅ >25% trial to paid conversion rate
├── ✅ 95%+ customer satisfaction score
└── ✅ Break-even operational cash flow
```

### Phase 2 Success (Month 6)
```
Technical Achievements:
├── ✅ Advanced analytics and reporting features
├── ✅ Mobile-optimized experience
├── ✅ API integrations with major email providers
├── ✅ White-label capabilities for partners
└── ✅ Advanced security and compliance features

Business Achievements:
├── ✅ 2,000+ paying customers generating $150K+ MRR
├── ✅ Positive unit economics with >$2,400 LTV
├── ✅ <3% monthly churn rate
├── ✅ Market leadership recognition
└── ✅ $1.8M+ annual revenue run rate
```

### Exit Preparation (Month 12-24)
```
Strategic Objectives:
├── ✅ 10,000+ customers generating $750K+ MRR
├── ✅ Dominant market position in SMB DMARC management
├── ✅ Proven scalable business model
├── ✅ Strong financial performance and growth metrics
├── ✅ Strategic acquirer interest and valuation discussions
├── ✅ Clean legal and financial structure
└── ✅ $15M+ exit value achievement
```

## ⚠️ RISK MITIGATION

### Technical Risk Management
```
High-Priority Risks:
├── Email deliverability issues → Multiple provider strategy
├── DNS API rate limiting → Provider rotation and caching
├── Scalability bottlenecks → Cloud-native architecture
├── Data accuracy problems → Multiple validation sources
└── Security vulnerabilities → Security-first development

Monitoring and Response:
├── Real-time alerting for critical issues
├── Automated failover and recovery procedures
├── Regular security audits and penetration testing
├── Performance monitoring and optimization
└── Incident response and communication plans
```

### Business Risk Management
```
Market Risks:
├── Competitive threats → First-mover advantage and innovation
├── Economic downturns → Freemium model and cost flexibility
├── Regulatory changes → Automated compliance monitoring
├── Technology shifts → Extensible platform architecture
└── Customer concentration → Diversified customer base

Operational Risks:
├── Team scaling → Remote-first and automated processes
├── Cash flow → Conservative projections and funding
├── Vendor dependency → Multi-vendor architecture
├── Customer support → Self-service optimization
└── Legal compliance → Automated compliance systems
```

This document serves as the comprehensive guide for building DMARCEngine using MakerKit foundation with Claude Code automation, ensuring efficient development while maintaining quality and achieving business objectives.