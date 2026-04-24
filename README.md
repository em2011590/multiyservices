# DevSphere - Multi-Service Developer Platform

## Overview
DevSphere is an integrated developer toolkit featuring 6 powerful services:
- 🔄 **Code Translator** - Convert code between 15+ languages
- 🤖 **AI Assistant** - Intelligent code analysis & debugging
- 🔎 **Deep Search** - Find NPM packages & GitHub repos
- 🔌 **API Explorer** - Build & test REST APIs
- 📦 **Format Converter** - Convert JSON, YAML, XML
- 🌐 **Content Translator** - Translate text across languages

## 🚀 Quick Deployment to Vercel

### Prerequisites
- [Node.js](https://nodejs.org/) 20+
- [Git](https://git-scm.com/)
- [GitHub account](https://github.com)
- [Vercel account](https://vercel.com) (free)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) (free tier available)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjustf%2Fmultiyservices&env=MONGODB_URI,NEXTAUTH_SECRET,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET&project-name=devsphere&repository-name=multiyservices)

### Manual Deployment Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will automatically detect Next.js

3. **Add Environment Variables**
In Vercel Dashboard → Settings → Environment Variables:
```
MONGODB_URI=your_mongodb_atlas_uri
NEXTAUTH_SECRET=generate_using_openssl_rand_base64_32
NEXTAUTH_URL=https://your-project.vercel.app
GITHUB_CLIENT_ID=your_github_oauth_id
GITHUB_CLIENT_SECRET=your_github_oauth_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

4. **Deploy**
Click "Deploy" and wait for completion!

---

## 📖 Detailed Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- ✅ Complete checklist
- 🔧 Troubleshooting guide
- 🛠️ Environment variable setup
- 📊 Monitoring & logs
- 🆘 Common issues & solutions

---

## 🏗️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Three.js** - 3D visualizations

### Backend
- **Next.js API Routes** - Serverless functions
- **NextAuth.js 5** - Authentication (GitHub, Google)
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Deployment
- **Vercel** - Serverless hosting
- **Node.js 20** - Runtime

---

## 🌍 Local Development Setup

### Installation
```bash
# Clone repository
git clone https://github.com/justf/multiyservices.git
cd multiyservices

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 🔐 Security Checklist

- [ ] NEXTAUTH_SECRET is a strong random string
- [ ] NEXTAUTH_URL matches your domain
- [ ] Database credentials are not in version control
- [ ] API keys are never logged or exposed
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] OAuth callback URLs are correct

---

## 📝 Features

### Authentication
- ✅ Email/Password signup & login
- ✅ GitHub OAuth integration
- ✅ Google OAuth integration
- ✅ Bcrypt password hashing
- ✅ JWT-based sessions

### Services
- ✅ Code translation with AST visualization
- ✅ AI-powered code assistant
- ✅ NPM & GitHub search
- ✅ REST API builder & tester
- ✅ Data format conversion
- ✅ Multi-language translator

### UI/UX
- ✅ Glassmorphism design
- ✅ Dark theme
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Real-time updates

---

## 📦 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   ├── auth/               # Authentication pages
│   └── dashboard/          # Dashboard pages
├── components/             # React components
│   ├── services/          # Service components
│   └── ui/               # UI components
├── lib/                    # Utility functions
├── models/               # MongoDB models
├── store/                # Redux store
├── vercel.json           # Vercel configuration
└── DEPLOYMENT.md         # Deployment guide
```

---

## 🧪 Testing & Verification

```bash
# Build for production
npm run build

# Check build output
ls -la .next

# Test production build
npm run start
```

---

## 📊 Deployment Files

- `vercel.json` - Vercel configuration
- `.vercelignore` - Files excluded from Vercel build
- `DEPLOYMENT.md` - Detailed deployment guide
- `next.config.ts` - Next.js configuration

---

## 🚨 Troubleshooting

### Build Fails
- Check `npm run build` locally first
- Review Vercel build logs
- Ensure all dependencies are installed

### Environment Variables Not Working
- Verify they're in Vercel dashboard (not .env.local)
- Redeploy after adding/updating
- Public variables must start with `NEXT_PUBLIC_`

### Database Connection Issues
- Test MongoDB URI locally
- Add IP 0.0.0.0/0 to MongoDB Atlas whitelist
- Check connection string format

### Authentication Fails
- Verify OAuth callback URLs match exactly
- Check NEXTAUTH_SECRET is set
- Ensure NEXTAUTH_URL includes https://

---

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

## 📧 Support

For issues and questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- Review troubleshooting section
- Check Vercel logs and build output

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 You're All Set!

Your DevSphere application is ready for production on Vercel. Follow the deployment steps above to get your multi-service platform live!

**Happy coding! 🚀**
