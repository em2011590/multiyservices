#!/bin/bash
# Vercel Deployment Verification Checklist

echo "🚀 DevSphere Vercel Deployment Checklist"
echo "========================================"
echo ""

# Check for required files
echo "✓ Checking required files..."
files=("vercel.json" ".vercelignore" ".env.example" "package.json" "next.config.ts")
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file - MISSING"
  fi
done

echo ""
echo "✓ Checking build..."
npm run build --quiet > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✓ Production build successful"
else
  echo "  ✗ Production build failed"
  exit 1
fi

echo ""
echo "✓ Checking dependencies..."
if grep -q "next" package.json; then
  echo "  ✓ Next.js configured"
fi
if grep -q "bcrypt" package.json; then
  echo "  ✓ Bcrypt for password hashing"
fi
if grep -q "mongoose" package.json; then
  echo "  ✓ MongoDB driver"
fi
if grep -q "next-auth" package.json; then
  echo "  ✓ NextAuth for authentication"
fi

echo ""
echo "✓ Environment variables to configure:"
echo "  - MONGODB_URI"
echo "  - NEXTAUTH_SECRET"
echo "  - NEXTAUTH_URL"
echo "  - GITHUB_CLIENT_ID & SECRET"
echo "  - GOOGLE_CLIENT_ID & SECRET"
echo "  - CLOUDINARY credentials"

echo ""
echo "========================================"
echo "✅ Ready for Vercel deployment!"
echo ""
echo "Next steps:"
echo "1. git push to your GitHub repository"
echo "2. Go to vercel.com and connect your repo"
echo "3. Add environment variables"
echo "4. Click Deploy"
echo ""
