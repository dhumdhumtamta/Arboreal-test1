import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY

export const isAdminConfigured = () => {
  return !!(projectId && clientEmail && privateKey)
}

let adminDb: ReturnType<typeof getFirestore> | null = null

if (isAdminConfigured()) {
  const app = getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey?.replace(/\\n/g, "\n"),
        }),
      })
    : getApps()[0]

  adminDb = getFirestore(app)
} else {
  console.warn("Firebase Admin is not configured. Server-side writes will use client SDK or fallback storage.")
}

export { adminDb }
