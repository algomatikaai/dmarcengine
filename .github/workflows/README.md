# DMARCEngine CI/CD Configuration

## Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

### Vercel Deployment
- `VERCEL_TOKEN` - Your Vercel personal access token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### Turbo Build Cache
- `TURBO_TOKEN` - Your Turborepo remote cache token (optional)

### Supabase (for build process)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Required GitHub Variables

Configure these variables in your repository settings:

- `TURBO_TEAM` - Your Turborepo team name (optional)

## Workflow Files

### 1. CI Pipeline (`ci.yml`)
Runs on every push and pull request:
- Linting
- Type checking
- Testing
- Building
- Security scanning

### 2. Preview Deployments (`deploy-preview.yml`)
Creates preview deployments for pull requests:
- Builds the application
- Deploys to Vercel preview environment
- Comments on PR with preview URL

### 3. Production Deployment (`deploy-production.yml`)
Deploys to production when pushing to main:
- Builds the application
- Deploys to Vercel production
- Creates a GitHub release

## Setting Up

1. Create a Vercel account and link your project
2. Get your Vercel token from: https://vercel.com/account/tokens
3. Find your org and project IDs in Vercel project settings
4. Add all required secrets to GitHub repository settings
5. Push to main branch to trigger production deployment

## Local Development

To test workflows locally, you can use [act](https://github.com/nektos/act):

```bash
# Test CI workflow
act push

# Test PR workflow
act pull_request

# Test with specific job
act -j lint
```