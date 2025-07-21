# Branch Protection Rules

## Main Branch Protection

Configure these rules for the `main` branch in GitHub repository settings:

### Required Status Checks
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

#### Required checks:
- `lint`
- `typecheck`
- `test`
- `build`
- `security`

### Pull Request Requirements
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from CODEOWNERS

### Conversation Resolution
- ✅ Require conversation resolution before merging

### Additional Settings
- ✅ Include administrators
- ✅ Restrict who can push to matching branches
  - Add your team members or specific users

## Develop Branch Protection

Configure lighter rules for the `develop` branch:

### Required Status Checks
- ✅ Require status checks to pass before merging

#### Required checks:
- `lint`
- `typecheck`

### Pull Request Requirements
- ✅ Require a pull request before merging

## Setting Up Branch Protection

1. Go to Settings → Branches in your GitHub repository
2. Click "Add rule"
3. Enter branch name pattern (e.g., `main`)
4. Configure the settings as described above
5. Click "Create" to save the rule

## Recommended Git Flow

1. Create feature branches from `develop`
2. Make changes and push to feature branch
3. Create PR to `develop` branch
4. After testing in develop, create PR from `develop` to `main`
5. Production deployment triggers automatically on merge to `main`