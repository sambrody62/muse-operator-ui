# Deployment Guide

## Branch Strategy

- **`development`** - Active development branch
- **`staging`** - Testing branch for preview deployments
- **`main`** - Production branch (when ready)

## Vercel Deployments

### Staging/Preview Deployment
Used for testing big updates before production.

```bash
# Switch to staging branch
git checkout staging

# Merge latest changes from development
git merge development

# Push to GitHub
git push origin staging

# Deploy to staging URL (preview)
npx vercel
```

**Staging URL:** https://muse-operator-avs7pg1gq-sams-projects-27213651.vercel.app

### Production Deployment
Only after testing on staging.

```bash
# Switch to development branch
git checkout development

# Deploy to production
npx vercel --prod
```

**Production URL:** https://muse-operator-ui.vercel.app

## Workflow for Big Updates

1. Make changes on `development` branch
2. Test locally with `npm start`
3. Merge to `staging`: `git checkout staging && git merge development`
4. Deploy to staging: `npx vercel`
5. Test on staging URL
6. If everything works, deploy to production: `git checkout development && npx vercel --prod`

## Current URLs

- **Production:** https://muse-operator-ui.vercel.app
- **Staging:** https://muse-operator-avs7pg1gq-sams-projects-27213651.vercel.app
- **GitHub:** https://github.com/sambrody62/muse-operator-ui

## Environment Variables

Both staging and production use the same environment variables:
- `REACT_APP_ELEVENLABS_API_KEY` - Set in Vercel dashboard