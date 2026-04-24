# 🚀 Vercel Deployment Guide - DevSphere

## Quick Start - Deploy to Vercel

### Step 1: Prepare Your Repository
```bash
# Push your code to GitHub (required for Vercel)
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository (`multiyservices`)
4. Click "Import"

### Step 3: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
NEXTAUTH_SECRET=generate-strong-secret-key-use-https://www.uuidgenerator.net/
NEXTAUTH_URL=https://your-project.vercel.app
GITHUB_CLIENT_ID=your_github_oauth_id
GITHUB_CLIENT_SECRET=your_github_oauth_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Step 4: Deploy
Click "Deploy" - Vercel will automatically build and deploy your app!

---

## 📋 Environment Variables Explained

### Database
- **MONGODB_URI**: MongoDB Atlas connection string with credentials
  - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Create a cluster and get your connection string

### Authentication (NextAuth)
- **NEXTAUTH_SECRET**: Random secret for JWT encryption
  - Generate one: `openssl rand -base64 32`
  - Or use: https://generate-secret.vercel.app/32
- **NEXTAUTH_URL**: Your Vercel app URL (e.g., `https://myapp.vercel.app`)

### OAuth Providers
- **GitHub OAuth**: https://github.com/settings/developers → OAuth Apps → New OAuth App
  - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`
- **Google OAuth**: https://console.cloud.google.com/ → Create Project → OAuth 2.0 Credentials
  - Authorized redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`

### Cloudinary (Image Upload)
- **CLOUDINARY_CLOUD_NAME**: Your cloud name from Cloudinary dashboard
- **CLOUDINARY_API_KEY**: API key from Settings → API Keys
- **CLOUDINARY_API_SECRET**: API secret from Settings → API Keys
- **NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME**: Same as CLOUDINARY_CLOUD_NAME (public)
- **NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET**: Create unsigned preset in Upload Settings

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables configured in Vercel
- [ ] MongoDB URI pointing to production database
- [ ] NextAuth credentials set (GitHub/Google OAuth configured)
- [ ] Cloudinary credentials configured
- [ ] NEXTAUTH_URL matches your Vercel domain
- [ ] Build passes locally: `npm run build`
- [ ] No console errors in production build
- [ ] Code pushed to GitHub main/master branch

---

## 🚨 Common Issues & Solutions

### Build Fails with TypeScript Errors
- These are ignored by default in `next.config.ts`
- If needed, check `tsconfig.json` settings

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for Vercel)
- Test connection string locally first

### Environment Variables Not Loading
- Ensure variables are added to Vercel dashboard (not .env.local)
- Redeploy after adding/updating variables
- Variables prefixed with `NEXT_PUBLIC_` are exposed to browser

### Authentication Not Working
- Verify OAuth callback URLs match exactly
- Check NEXTAUTH_URL includes protocol (https://)
- Ensure NEXTAUTH_SECRET is set

---

## 📊 Monitoring & Logs

After deployment:

1. **View Logs**: Vercel Dashboard → Deployments → View Runtime Logs
2. **Monitor Performance**: Analytics tab shows real-time metrics
3. **Error Tracking**: Check build logs and function logs
4. **Preview URLs**: Each pull request gets a preview deployment

---

## 🔄 Continuous Deployment

Vercel automatically deploys on:
- Push to main branch → Production deployment
- Pull requests → Preview deployment
- Rollback available in Deployments tab

---

## 📱 Custom Domain

1. Go to Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS settings as shown
4. Update `NEXTAUTH_URL` environment variable

---

## 💡 Pro Tips

- **Preview Deployments**: Every PR automatically gets a preview URL
- **Automatic Rollback**: Click "Rollback" on any deployment
- **Function Logs**: Check API route logs at `/api/*` endpoints
- **Rebalance Database**: Set MongoDB connection pooling if needed
- **Enable Analytics**: Enable Web Analytics for performance insights

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support

Happy deploying! 🎉
