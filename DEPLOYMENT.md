# Vercel Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (for cloud database)
- Vercel account

## Step 1: Prepare Your MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database-name`)

## Step 2: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: School Management System"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/next-school-app.git

# Push to main branch
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"
5. Configure environment variables (next step)

## Step 4: Set Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Click "Environment Variables"
3. Add the following variables:

```
MONGODB_URI = your_mongodb_connection_string
NEXT_PUBLIC_API_URL = https://your-project.vercel.app
```

## Step 5: Deploy

1. Click "Deploy" button
2. Wait for the deployment to complete
3. Your app will be live at `https://your-project.vercel.app`

## Important Notes

### MongoDB Connection String Format
```
mongodb+srv://username:password@cluster-url/database-name?retryWrites=true&w=majority
```

### Production Environment Variables
For production (Vercel), update `NEXT_PUBLIC_API_URL` to your actual Vercel domain:
```
NEXT_PUBLIC_API_URL = https://your-project-name.vercel.app
```

### Build Optimization
Your Next.js app is already optimized for Vercel with:
- React 19.2.0
- Next.js 16.0.5
- Tailwind CSS 4
- Redux Toolkit for state management

### Troubleshooting

**MongoDB Connection Failed:**
- Check your IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development, or specific IPs)
- Verify username and password are URL-encoded if they contain special characters

**API Endpoint Errors:**
- Ensure `NEXT_PUBLIC_API_URL` is set correctly to your Vercel domain
- Check that MongoDB URI is valid and accessible

**Build Failures:**
- Check the Vercel build logs
- Ensure all environment variables are set
- Run `npm run build` locally to test

## Redeployment

After making changes:

```bash
# Commit and push to GitHub
git add .
git commit -m "Your changes"
git push

# Vercel will automatically redeploy from GitHub
# Or manually trigger from Vercel Dashboard
```

## Monitoring

- Monitor logs in Vercel Dashboard → Project → Deployments
- Check MongoDB Atlas for connection metrics
- Use Vercel Analytics for performance monitoring

---

**Your app is now ready for production!** 🚀
