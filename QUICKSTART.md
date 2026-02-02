# RoomVision - Quick Start with Firebase

## 🚀 Project is Running!

Your project is now running on **http://localhost:3001**

## ⚠️ Important: Firebase Setup Required

Currently, the app is using **in-memory storage** (data will be lost on restart). To persist data and deploy to Vercel, you need to set up Firebase.

---

## 📝 Firebase Setup Steps

### 1. Create Firebase Project (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select existing project
3. Follow the setup wizard
4. ✅ **Google Analytics is optional** - you can skip it

### 2. Enable Authentication

1. In Firebase Console, click **"Authentication"** in the left menu
2. Click **"Get started"**
3. Click the **"Sign-in method"** tab
4. Enable **"Email/Password"**
5. Click **"Save"**

### 3. Create Firestore Database

1. Click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Choose **"Start in production mode"** 
4. Select a location close to your users
5. Click **"Enable"**

### 4. Get Your Firebase Config

1. Click the **⚙️ gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`)
4. Register app name: `RoomVision` (or any name)
5. **Don't** check "Also set up Firebase Hosting"
6. Click **"Register app"**
7. Copy the `firebaseConfig` object

### 5. Update .env.local

Open `.env.local` and fill in these values from the `firebaseConfig` you copied:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 6. Set Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if true; // Allow user registration
    }
  }
}
```

3. Click **"Publish"**

### 7. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
pnpm dev
```

---

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub repository with your code
- Vercel account (free at [vercel.com](https://vercel.com))

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Firebase integration"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   
   In Vercel project settings → **Environment Variables**, add:

   ```
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=generate-a-new-secret-key
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Update Firebase Authorized Domains**
   - Go to Firebase Console → **Authentication** → **Settings** → **Authorized domains**
   - Add your Vercel domain: `your-app.vercel.app`
   - This allows authentication to work on your deployed site

5. **Deploy**
   - Click **"Deploy"** in Vercel
   - Wait for deployment (usually 1-2 minutes)
   - Visit your live site!

---

## 🧪 Testing Your Setup

1. Go to http://localhost:3001/signup
2. Create a test account
3. Sign in
4. Check Firebase Console → **Authentication** to see your user
5. Check **Firestore Database** → **users** collection for user data

---

## ❓ Troubleshooting

### "Firebase is not configured" warning

- Check that all Firebase environment variables are set in `.env.local`
- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Restart your dev server after changing `.env.local`

### Can't sign in after deployment

- Verify your Vercel domain is added to Firebase Authorized domains
- Check that all environment variables are set in Vercel project settings
- Make sure `NEXTAUTH_URL` matches your actual deployment URL

### "Permission denied" in Firestore

- Check your Firestore security rules
- Make sure the `users` collection has proper read/write rules
- Users must be authenticated to access their data

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 🎉 You're All Set!

Once Firebase is configured:
- ✅ User data persists across server restarts
- ✅ Authentication works reliably
- ✅ Ready to deploy to Vercel
- ✅ Production-ready database

Need help? Check [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions.
