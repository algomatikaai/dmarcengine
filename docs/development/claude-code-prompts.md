# DMARCEngine - Claude Code Prompts
*Automated Development Workflows & Prompt Library*

## 🤖 CLAUDE CODE DEVELOPMENT FRAMEWORK

### Project Context Setup
```
ESSENTIAL CONTEXT FOR ALL CLAUDE CODE SESSIONS:

Project: DMARCEngine - DMARC Management SaaS Platform
Foundation: MakerKit Next.js SaaS boilerplate
Target Market: 42.7M companies with DIY DMARC implementations
Business Model: $49-149/month recurring revenue
Tech Stack: Next.js 14, MakerKit, PostgreSQL, Prisma, Tailwind CSS, Shadcn UI
Goal: Automated money printer with minimal human intervention

Key Requirements:
- Follow MakerKit conventions and patterns
- Build for automation and scalability
- Implement proper error handling and logging
- Use TypeScript with strict typing
- Optimize for performance and user experience
- Include comprehensive testing
```

## 🏗️ CORE DEVELOPMENT PROMPTS

### 1. DMARC Scanner Engine Development
```
PROMPT: Build DMARC Scanner Engine

Context: We need to scan domains daily to find companies with DIY DMARC implementations that need professional management.

Requirements:
- Scan 10,000+ domains per day for DMARC records
- Analyze DMARC configuration quality and completeness
- Identify domains with suboptimal DMARC setups
- Store results in PostgreSQL database using Prisma
- Handle rate limiting and DNS provider rotation
- Implement proper error handling and retry logic
- Log all activities for debugging and optimization

Technical Specifications:
- Use Node.js with DNS lookup libraries
- Implement async processing for high throughput
- Use Redis for caching and rate limiting
- Follow MakerKit database schema patterns
- Include monitoring and alerting for failures
- Support multiple DNS providers (Cloudflare, Google, etc.)

Database Schema:
- domains table with scan results
- dmarc_records table with parsed DMARC data
- scan_jobs table for tracking processing status
- Include proper indexes for performance

Output: Complete DMARC scanner implementation with proper error handling, logging, and database integration.
```

### 2. Customer Dashboard Development
```
PROMPT: Build Customer DMARC Dashboard

Context: Customers need a professional dashboard to monitor their DMARC implementation, view reports, and get optimization recommendations.

Requirements:
- Real-time DMARC status monitoring
- Visual compliance scoring and trending
- DMARC report analysis and insights
- Alert configuration and management
- Policy recommendation engine
- Domain management (add/remove/configure)
- Performance metrics and analytics
- Mobile-responsive design

Technical Specifications:
- Use Next.js 14 App Router with React Server Components
- Implement with Shadcn UI components and Tailwind CSS
- Follow MakerKit dashboard patterns and layouts
- Use Prisma for database operations
- Implement real-time updates with WebSockets or SSE
- Include proper loading states and error handling
- Optimize for performance with proper caching

UI/UX Requirements:
- Clean, professional design matching SaaS standards
- Intuitive navigation and information hierarchy
- Interactive charts and visualizations
- Quick actions for common tasks
- Contextual help and tooltips
- Responsive design for mobile and desktop

Output: Complete customer dashboard with all monitoring, analysis, and management features.
```

### 3. Email Automation System
```
PROMPT: Build Automated Email Outreach System

Context: We need to automatically identify and email companies with DIY DMARC implementations to convert them to customers.

Requirements:
- Automated prospect identification from DMARC scans
- Personalized email generation based on DMARC status
- Multi-sequence email campaigns with smart timing
- Engagement tracking and optimization
- Unsubscribe and compliance management
- Deliverability monitoring and reputation management
- A/B testing for email optimization

Technical Specifications:
- Integrate with AWS SES for sending
- Use Redis for campaign scheduling and queuing
- Implement email templating with dynamic personalization
- Track opens, clicks, and conversions
- Handle bounces, complaints, and unsubscribes
- Include proper DMARC setup for our own emails
- Follow email best practices and regulations

Email Campaign Types:
- Initial outreach to DIY DMARC users
- Educational sequences about DMARC optimization
- Trial conversion and onboarding emails
- Customer retention and expansion campaigns
- Re-engagement campaigns for inactive users

Output: Complete email automation system with campaign management, personalization, and tracking.
```

### 4. MakerKit Integration & Customization
```
PROMPT: Customize MakerKit for DMARCEngine

Context: We need to adapt the MakerKit SaaS boilerplate for our DMARC management use case while maintaining all core functionality.

Requirements:
- Maintain all MakerKit authentication and billing features
- Customize branding and styling for DMARCEngine
- Add DMARC-specific database models and relationships
- Integrate custom dashboard components
- Configure subscription tiers and pricing
- Set up custom onboarding flows
- Add DMARC-specific user roles and permissions

Customization Areas:
- Update branding, colors, and logos
- Modify landing pages for DMARC messaging
- Add DMARC domain models to database schema
- Create custom dashboard layouts
- Configure Stripe products for our pricing tiers
- Add DMARC-specific settings and preferences
- Integrate email automation with user management

Technical Requirements:
- Follow MakerKit upgrade and customization patterns
- Maintain compatibility with MakerKit updates
- Use proper TypeScript interfaces and types
- Implement proper error handling and validation
- Include comprehensive testing for custom features
- Document all customizations for future reference

Output: Fully customized MakerKit installation with DMARC-specific features while maintaining core SaaS functionality.
```

### 5. API Development & Integrations
```
PROMPT: Build DMARCEngine API System

Context: We need robust APIs for our dashboard, mobile app, and third-party integrations.

Requirements:
- RESTful API design with proper versioning
- Authentication and authorization middleware
- Rate limiting and security controls
- Comprehensive API documentation
- Third-party integrations (BuiltWith, DNS providers)
- Webhook system for real-time notifications
- API analytics and monitoring

API Endpoints:
- /api/v1/domains - Domain management CRUD operations
- /api/v1/dmarc - DMARC analysis and reporting
- /api/v1/campaigns - Email campaign management
- /api/v1/analytics - Performance metrics and insights
- /api/v1/webhooks - Webhook configuration and delivery
- /api/v1/integrations - Third-party service integrations

Technical Specifications:
- Use Next.js API routes with proper middleware
- Implement OpenAPI/Swagger documentation
- Include proper error handling and validation
- Use Prisma for database operations
- Implement caching with Redis
- Add comprehensive logging and monitoring
- Include rate limiting and security headers

Output: Complete API system with documentation, security, and monitoring.
```

## 🎯 FEATURE-SPECIFIC PROMPTS

### 6. DMARC Report Processing
```
PROMPT: Build DMARC Report Processing Engine

Context: Process incoming DMARC reports to provide actionable insights and recommendations to customers.

Requirements:
- Parse XML DMARC reports from email attachments
- Extract authentication results and failure patterns
- Identify potential threats and spoofing attempts
- Generate actionable recommendations
- Create visual reports and dashboards
- Automate alert generation for critical issues

Implementation Details:
- Email parsing for DMARC report attachments
- XML parsing and validation
- Data normalization and storage
- Threat intelligence analysis
- Report generation and visualization
- Real-time alerting system

Output: Complete DMARC report processing system with analysis and alerting.
```

### 7. Customer Onboarding Automation
```
PROMPT: Build Automated Customer Onboarding

Context: Guide new customers through DMARC setup and optimization with minimal human intervention.

Requirements:
- Progressive onboarding with clear steps
- Automated DMARC configuration validation
- Personalized recommendations based on current setup
- Integration with help documentation
- Progress tracking and completion incentives
- Support integration for complex cases

Onboarding Flow:
- Account setup and domain verification
- Current DMARC analysis and scoring
- Step-by-step optimization guidance
- Policy recommendation and implementation
- Monitoring setup and alert configuration
- Success celebration and next steps

Output: Complete automated onboarding system with progress tracking and guidance.
```

### 8. Analytics & Reporting System
```
PROMPT: Build Advanced Analytics & Reporting

Context: Provide customers with comprehensive insights into their DMARC performance and email security.

Requirements:
- Real-time compliance monitoring
- Historical trend analysis
- Threat intelligence reporting
- Performance benchmarking
- Custom report generation
- Automated insights and recommendations

Analytics Features:
- Compliance scoring and trending
- Authentication failure analysis
- Threat detection and classification
- Industry benchmarking
- ROI calculation and reporting
- Predictive analytics for optimization

Output: Complete analytics and reporting system with insights and recommendations.
```

## 🔧 TECHNICAL IMPLEMENTATION PROMPTS

### 9. Database Schema & Models
```
PROMPT: Design DMARCEngine Database Schema

Context: Create comprehensive database schema for DMARC management SaaS using Prisma ORM.

Requirements:
- Extend MakerKit base schema with DMARC-specific models
- Support multi-tenancy and user management
- Optimize for performance with proper indexing
- Include audit logging and data retention
- Support real-time subscriptions and updates
- Maintain data integrity with proper constraints

Core Models:
- Domain management and ownership
- DMARC record configuration and history
- Report processing and analysis results
- Campaign management and tracking
- User preferences and notifications
- Billing and subscription data

Output: Complete Prisma schema with models, relationships, and migrations.
```

### 10. Security & Compliance Implementation
```
PROMPT: Implement Security & Compliance Features

Context: Ensure DMARCEngine meets enterprise security and compliance requirements.

Requirements:
- Data encryption at rest and in transit
- Access control and audit logging
- GDPR and privacy compliance
- Security headers and rate limiting
- Input validation and sanitization
- Incident response and monitoring

Security Features:
- Multi-factor authentication
- Role-based access control
- API security and rate limiting
- Data anonymization and retention
- Security monitoring and alerting
- Compliance reporting and documentation

Output: Complete security and compliance implementation with monitoring and documentation.
```

## 📱 ADVANCED FEATURE PROMPTS

### 11. Mobile App Development
```
PROMPT: Build DMARCEngine Mobile App

Context: Provide customers with mobile access to DMARC monitoring and alerts.

Requirements:
- Native iOS and Android apps using React Native
- Real-time push notifications for critical alerts
- Offline capability for basic monitoring
- Biometric authentication integration
- Simplified dashboard for mobile viewing
- Quick actions for common tasks

Mobile Features:
- Dashboard overview with key metrics
- Real-time alert notifications
- Domain status monitoring
- Quick policy adjustments
- Support chat integration
- Settings and preferences management

Output: Complete mobile app with native features and real-time capabilities.
```

### 12. White-Label & Reseller Platform
```
PROMPT: Build White-Label Platform for Resellers

Context: Enable partners to resell DMARCEngine under their own brand.

Requirements:
- Multi-tenant white-label architecture
- Custom branding and domain support
- Reseller management and billing
- Partner portal and training resources
- API access for custom integrations
- Revenue sharing and commission tracking

White-Label Features:
- Custom branding and styling
- Partner-specific pricing and features
- Reseller dashboard and analytics
- Customer management tools
- Support integration and escalation
- Marketing materials and resources

Output: Complete white-label platform with partner management and customization.
```

## 🚀 DEPLOYMENT & OPERATIONS PROMPTS

### 13. CI/CD Pipeline Setup
```
PROMPT: Set up CI/CD Pipeline for DMARCEngine

Context: Automate testing, building, and deployment processes for reliable releases.

Requirements:
- Automated testing on pull requests
- Build optimization and caching
- Staging and production deployments
- Database migration automation
- Performance monitoring integration
- Rollback capabilities for failed deployments

Pipeline Features:
- GitHub Actions for CI/CD
- Automated testing and quality checks
- Vercel deployment integration
- Database migration handling
- Environment configuration management
- Monitoring and alerting setup

Output: Complete CI/CD pipeline with automated testing and deployment.
```

### 14. Monitoring & Observability
```
PROMPT: Implement Comprehensive Monitoring

Context: Monitor DMARCEngine performance, errors, and user experience for optimal operations.

Requirements:
- Application performance monitoring
- Error tracking and alerting
- User experience monitoring
- Infrastructure monitoring
- Business metrics tracking
- Automated incident response

Monitoring Features:
- Real-time performance dashboards
- Error tracking and notification
- User session monitoring
- Infrastructure health checks
- Business KPI tracking
- Automated scaling and recovery

Output: Complete monitoring and observability stack with dashboards and alerting.
```

## 📊 OPTIMIZATION & SCALING PROMPTS

### 15. Performance Optimization
```
PROMPT: Optimize DMARCEngine Performance

Context: Ensure DMARCEngine performs optimally under high load with excellent user experience.

Requirements:
- Database query optimization
- Caching strategy implementation
- CDN and asset optimization
- API response time optimization
- Background job processing
- Memory and resource optimization

Optimization Areas:
- Database indexing and query optimization
- Redis caching for frequently accessed data
- CDN integration for static assets
- Lazy loading and code splitting
- Background processing with queues
- Resource monitoring and scaling

Output: Comprehensive performance optimization with monitoring and scaling capabilities.
```

## 🔄 MAINTENANCE & UPDATES PROMPTS

### 16. Automated Maintenance & Updates
```
PROMPT: Build Automated Maintenance System

Context: Minimize manual maintenance with automated updates, backups, and health checks.

Requirements:
- Automated dependency updates
- Database backup and recovery
- Health check automation
- Performance optimization scheduling
- Security patch management
- Documentation updates

Maintenance Features:
- Scheduled dependency updates
- Automated database backups
- System health monitoring
- Performance report generation
- Security vulnerability scanning
- Documentation synchronization

Output: Complete automated maintenance system with scheduling and monitoring.
```

These prompts provide comprehensive guidance for Claude Code to build DMARCEngine systematically while maintaining high quality, performance, and user experience standards.