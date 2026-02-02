#!/usr/bin/env node

/**
 * Configuration Check Script
 * Run this to verify your environment is properly configured
 */

const fs = require('fs');
const path = require('path');

// Load .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key] = value;
      }
    }
  });
}

console.log('\n🔍 Checking RoomVision Configuration...\n');

// Check environment variables
const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
];

const firebaseClientVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

let allGood = true;

console.log('📋 NextAuth Configuration:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName} is set`);
  } else {
    console.log(`  ❌ ${varName} is NOT set`);
    allGood = false;
  }
});

console.log('\n🔥 Firebase Configuration:');
let firebaseConfigured = true;
firebaseClientVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName} is set`);
  } else {
    console.log(`  ⚠️  ${varName} is NOT set`);
    firebaseConfigured = false;
  }
});

console.log('\n📊 Summary:');
if (allGood && firebaseConfigured) {
  console.log('  ✅ All configuration is complete!');
  console.log('  🚀 Your app is ready to deploy to Vercel');
} else if (allGood && !firebaseConfigured) {
  console.log('  ⚠️  NextAuth is configured, but Firebase is not');
  console.log('  📝 App will use in-memory storage (data lost on restart)');
  console.log('  🔗 See QUICKSTART.md for Firebase setup instructions');
} else {
  console.log('  ❌ Configuration is incomplete');
  console.log('  📝 Please check .env.local file');
}

console.log('\n💡 Next Steps:');
if (!firebaseConfigured) {
  console.log('  1. Follow QUICKSTART.md to set up Firebase');
  console.log('  2. Add Firebase credentials to .env.local');
  console.log('  3. Restart your dev server');
  console.log('  4. Run this script again to verify');
} else {
  console.log('  1. Test signup/login locally');
  console.log('  2. Push code to GitHub');
  console.log('  3. Follow VERCEL_DEPLOYMENT.md to deploy');
}

console.log('\n');

process.exit(allGood ? 0 : 1);
