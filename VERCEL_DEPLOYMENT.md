# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

Before deploying to Vercel, make sure you have completed these steps:

### 1. Firebase Setup
- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Created Firestore database
- [ ] Set up Firestore security rules
- [ ] Got Firebase configuration credentials

### 2. Local Testing
- [ ] Tested signup functionality
- [ ] Tested login functionality
- [ ] Verified users appear in Firebase Console
- [ ] Tested protected routes (dashboard, etc.)

### 3. Code Repository
- [ ] Code is pushed to GitHub (or GitLab/Bitbucket)
- [ ] `.env.local` is in `.gitignore` (secrets not committed)
- [ ] No console errors in browser

---

## 🔐 Environment Variables for Vercel

Copy these variables to Vercel project settings:

```bash
# NextAuth (REQUIRED)
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here

# Firebase Client (REQUIRED - Get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 📋 Step-by-Step Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Select your repository
3. Click "Import"
4. Vercel will detect Next.js automatically ✅

### 3. Configure Environment Variables

In the Vercel import screen:
1. Click **"Environment Variables"**
2. Add all variables from above
3. Make sure to add them for all environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### 4. Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. Get your deployment URL (e.g., `your-app.vercel.app`)

### 5. Update Firebase Authorized Domains

1. Go to Firebase Console
2. **Authentication** → **Settings** → **Authorized domains**
3. Click **"Add domain"**
4. Add: `your-app.vercel.app` (your actual Vercel URL)
5. Click **"Add"**

### 6. Update NEXTAUTH_URL in Vercel

1. Go to Vercel project **Settings** → **Environment Variables**
2. Find `NEXTAUTH_URL`
3. Update value to: `https://your-app.vercel.app` (your actual URL)
4. Click **"Save"**
5. Redeploy from **Deployments** tab

### 7. Test Your Deployment

1. Visit your deployed site
2. Test signup
3. Test login
4. Check if authentication works
5. Verify protected pages load correctly

---

## 🔧 Troubleshooting Deployment Issues

### Build Fails

**Error: Missing environment variables**
- Check all `NEXT_PUBLIC_*` variables are set in Vercel
- Verify no typos in variable names

**Error: Build timeout**
- This is rare with Next.js, try redeploying
- Check for infinite loops in components

### Authentication Doesn't Work

**Error: "Authentication domain not authorized"**
- Add Vercel domain to Firebase Authorized domains
- Make sure you added the exact domain (no https://)

**Error: "Invalid callback URL"**
- Update `NEXTAUTH_URL` in Vercel to match deployment URL
- Redeploy after updating

**Error: "Session undefined" or redirects to login**
- Check `NEXTAUTH_SECRET` is set in Vercel
- Make sure `NEXTAUTH_URL` is correct
- Clear browser cookies and try again

### Firestore Errors

**Error: "Permission denied"**
- Check Firestore security rules
- Make sure authentication is working first
- Rules should allow authenticated users to read/write

**Error: "Firebase not initialized"**
- Verify all Firebase environment variables are set
- Check for typos in variable names
- Make sure variables are in Production environment

---

## 📊 Monitoring Your App

### Vercel Dashboard

Monitor:
- Build status
- Deployment logs
- Analytics (if enabled)
- Function logs

### Firebase Console

Monitor:
- Authentication: See registered users
- Firestore: Check database writes
- Usage: Monitor quotas

---

## 🚀 Post-Deployment

Once deployed successfully:

1. **Test thoroughly**
   - Create test accounts
   - Test all features
   - Check mobile responsiveness

2. **Share your link**
   - Your app is live at `https://your-app.vercel.app`
   - Share with users, friends, or team

3. **Set up custom domain** (Optional)
   - Vercel Settings → Domains
   - Add your custom domain
   - Follow DNS setup instructions

4. **Monitor usage**
   - Firebase: Free tier includes 50K reads/day
   - Vercel: Free tier includes 100GB bandwidth

---

## 🔄 Updating Your App

Every time you push to GitHub:
1. Vercel automatically deploys
2. New version goes live in ~1-2 minutes
3. No manual deployment needed!

To force a redeploy:
- Go to Vercel dashboard
- Deployments tab
- Click "..." → "Redeploy"

---

## 📝 Notes

- **Free Tier Limits:**
  - Vercel: 100GB bandwidth/month
  - Firebase: 50K document reads/day, 20K writes/day
  - Both are generous for most apps

- **Costs:**
  - Both platforms have pay-as-you-go beyond free tier
  - Monitor usage in dashboards
  - Set up billing alerts

- **Backups:**
  - Firestore has built-in backups
  - Export data periodically from Firebase Console
  - Keep your Firebase credentials secure

---

## ✅ Deployment Complete!

Your app should now be:
- ✅ Live on the internet
- ✅ Using Firebase for data persistence
- ✅ Auto-deploying on every push
- ✅ Production-ready

Questions? Check the [Next.js deployment docs](https://nextjs.org/docs/deployment) or [Vercel docs](https://vercel.com/docs).
