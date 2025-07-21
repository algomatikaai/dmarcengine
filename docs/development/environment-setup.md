# Environment Setup Guide
*Complete setup instructions for DMARCEngine development and production environments*

## 📋 Overview

DMARCEngine uses different environment configurations for development, production, and CI/CD workflows. This guide covers the complete setup process.

## 🚀 Quick Start

### 1. Development Environment

```bash
# Clone and setup
git clone git@github.com:algomatikaai/dmarcengine.git
cd dmarcengine
pnpm install

# Start local Supabase
pnpm supabase:start

# Start development server
pnpm dev
```

Your development environment will run at:
- **Web App:** http://localhost:3000
- **Supabase Studio:** http://localhost:54323
- **API:** http://127.0.0.1:54321

### 2. Production Environment

Production deployment is automated via GitHub Actions, but requires proper environment variable configuration.

## 🔧 Environment Files

### File Structure
```
apps/web/
├── .env                 # Shared configuration (committed)
├── .env.development     # Development settings (committed)
├── .env.production      # Production public config (committed)
├── .env.local          # Local overrides (NOT committed)
└── .env.example        # Template for new developers
```

### Environment Variables Reference

#### Core Application
| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `NEXT_PUBLIC_SITE_URL` | Application URL | `http://localhost:3000` | `https://dmarcengine.com` |
| `NEXT_PUBLIC_PRODUCT_NAME` | Product name | `DMARCEngine` | `DMARCEngine` |

#### Supabase Database
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret API key | ✅ |
| `SUPABASE_DB_WEBHOOK_SECRET` | Webhook secret | ✅ |

#### Stripe Billing
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public API key | ✅ |
| `STRIPE_SECRET_KEY` | Secret API key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Webhook secret | ✅ |

#### Email (AWS SES)
| Variable | Description | Required |
|----------|-------------|----------|
| `MAILER_PROVIDER` | Email service (`nodemailer`) | ✅ |
| `EMAIL_SENDER` | From address | ✅ |
| `EMAIL_HOST` | SMTP host | ✅ |
| `EMAIL_PORT` | SMTP port | ✅ |
| `EMAIL_USER` | SMTP username | ✅ |
| `EMAIL_PASSWORD` | SMTP password | ✅ |
| `EMAIL_TLS` | Use TLS | ✅ |

## 🔐 Secrets Management

### Development Secrets
Development uses local Supabase and test credentials. All dev secrets are committed in `.env.development`.

### Production Secrets
Production secrets are managed through:

1. **GitHub Secrets** (for CI/CD):
   ```
   VERCEL_TOKEN
   VERCEL_ORG_ID  
   VERCEL_PROJECT_ID
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Vercel Environment Variables** (for runtime):
   ```
   SUPABASE_SERVICE_ROLE_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   EMAIL_PASSWORD
   NEXT_PUBLIC_SENTRY_DSN
   ```

### Setting Up Production Secrets

#### 1. Supabase Setup
```bash
# Create new Supabase project
npx supabase projects create dmarcengine

# Get your project URL and keys
npx supabase projects api-keys --project-ref your-project-id
```

#### 2. Stripe Setup
```bash
# Get keys from Stripe Dashboard
# Test: https://dashboard.stripe.com/test/apikeys  
# Live: https://dashboard.stripe.com/apikeys

# Setup webhooks
# Add endpoint: https://dmarcengine.com/api/billing/webhook
# Select events: customer.subscription.*, invoice.*, checkout.session.*
```

#### 3. AWS SES Setup
```bash
# Create SES SMTP credentials
aws sesv2 put-account-sending-enabled --enabled

# Create SMTP credentials (save these securely)
aws iam create-user --user-name dmarcengine-ses
aws iam create-access-key --user-name dmarcengine-ses
```

#### 4. GitHub Configuration
Add secrets in GitHub repository settings:

**Repository Secrets:**
- `VERCEL_TOKEN` - From Vercel account settings
- `VERCEL_ORG_ID` - From Vercel team settings  
- `VERCEL_PROJECT_ID` - From Vercel project settings
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

**Vercel Environment Variables:**
```bash
# Add via Vercel dashboard or CLI
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production  
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add EMAIL_PASSWORD production
```

## 🔄 Environment Validation

The project includes environment validation to catch configuration errors early:

### Development Validation
```bash
# Check all required variables
pnpm env:check

# Start with validation
pnpm dev
```

### Production Validation
```bash
# Test production build locally
pnpm build

# Check for missing production variables
NODE_ENV=production pnpm env:check
```

## 🚨 Common Issues

### Issue: "Invalid API Key" 
**Solution:** Check that Supabase keys match your project:
```bash
npx supabase status
```

### Issue: "Stripe webhook verification failed"
**Solution:** Update webhook secret:
```bash
# Get webhook secret from Stripe Dashboard
vercel env add STRIPE_WEBHOOK_SECRET production
```

### Issue: "Email sending failed"
**Solution:** Verify AWS SES configuration:
```bash
# Test SES credentials
aws ses send-email --region us-east-1 --source noreply@dmarcengine.com
```

## 📚 Related Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [AWS SES Setup Guide](https://docs.aws.amazon.com/ses/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Security Note:** Never commit actual secrets to version control. Use `.env.local` for sensitive local development overrides.