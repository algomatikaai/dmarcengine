# Development Documentation
*Technical guides, implementation plans, and development resources*

## 📚 Available Documentation

### Core Development Resources

1. **[Technical Architecture](architecture.md)**  
   Complete system design including high-level architecture, core components, data flow, performance considerations, and security implementation.

2. **[Claude Code Prompts](claude-code-prompts.md)**  
   Comprehensive prompt library for AI-assisted development covering all major features including DMARC scanner, dashboard, email automation, and more.

3. **[Implementation Plan](implementation-plan.md)**  
   Detailed 4-week launch strategy with daily objectives, success criteria, and milestone tracking for rapid deployment using MakerKit.

4. **[Project Instructions](project-instructions.md)**  
   Team structure, responsibilities, development guidelines, and operational procedures for building DMARCEngine efficiently.

## 🚀 Quick Start for Developers

### If You're Building Features
1. Review the [Technical Architecture](architecture.md) for system design
2. Use [Claude Code Prompts](claude-code-prompts.md) for AI-assisted development
3. Follow patterns in [Project Instructions](project-instructions.md)

### If You're Planning Development
1. Check the [Implementation Plan](implementation-plan.md) for timeline
2. Review current sprint status in [`/project-management/current-sprint.md`](../../project-management/current-sprint.md)
3. Understand priorities from [`/DMARCENGINE_CONTEXT.md`](../../DMARCENGINE_CONTEXT.md)

## 🛠️ Technology Stack

- **Framework:** Next.js 15 with App Router
- **Foundation:** MakerKit SaaS boilerplate
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Styling:** Tailwind CSS + Shadcn UI
- **Payments:** Stripe
- **Hosting:** Vercel
- **Email:** AWS SES + Postmark

## 📋 Development Standards

### Code Quality
- TypeScript strict mode
- Comprehensive error handling
- Security best practices
- Performance optimization
- Automated testing

### MakerKit Patterns
- Follow authentication patterns
- Use billing integration
- Maintain multi-tenancy
- Leverage component library
- Follow database conventions

## 🔗 Related Resources

- [Business Documentation](../business/) - Product requirements and strategy
- [MakerKit Docs](../../makerkit-docs/) - Framework reference
- [Session Handoffs](../../handoffs/) - Development continuity

---

**Development Philosophy:** Automation first, MakerKit patterns, error resilient, data-driven