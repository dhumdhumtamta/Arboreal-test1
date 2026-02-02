// Firebase Firestore database with fallback to in-memory storage
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore'
import { db as firestore, isFirebaseConfigured } from './firebase'
import { adminDb, isAdminConfigured } from './firebase-admin'

export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
}

// Fallback in-memory storage when Firebase is not configured
const inMemoryUsers: User[] = []

const useFirestore = () => {
  return isFirebaseConfigured() && firestore !== null
}

const useAdminFirestore = () => {
  return isAdminConfigured() && adminDb !== null
}

export const db = {
  users: {
    create: async (data: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
      const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const user: User = {
        id: userId,
        ...data,
        createdAt: new Date(),
      }
      
      if (useAdminFirestore()) {
        await adminDb!
          .collection('users')
          .doc(userId)
          .set({
            email: user.email.toLowerCase(),
            name: user.name,
            password: user.password,
            createdAt: user.createdAt.toISOString(),
          })
      } else if (useFirestore()) {
        try {
          // Store in Firestore (client SDK)
          await setDoc(doc(firestore!, 'users', userId), {
            email: user.email.toLowerCase(),
            name: user.name,
            password: user.password,
            createdAt: user.createdAt.toISOString(),
          })
        } catch (error) {
          console.warn('Firestore write failed, falling back to in-memory storage.', error)
          inMemoryUsers.push({ ...user, email: user.email.toLowerCase() })
        }
      } else {
        // Fallback to in-memory storage
        inMemoryUsers.push({ ...user, email: user.email.toLowerCase() })
        console.warn('Using in-memory storage. Data will be lost on server restart.')
      }
      
      return user
    },
    
    findByEmail: async (email: string): Promise<User | undefined> => {
      if (useAdminFirestore()) {
        const snapshot = await adminDb!
          .collection('users')
          .where('email', '==', email.toLowerCase())
          .limit(1)
          .get()

        if (snapshot.empty) {
          return undefined
        }

        const docData = snapshot.docs[0].data()
        return {
          id: snapshot.docs[0].id,
          email: docData.email,
          name: docData.name,
          password: docData.password,
          createdAt: new Date(docData.createdAt),
        }
      } else if (useFirestore()) {
        try {
          const usersRef = collection(firestore!, 'users')
          const q = query(usersRef, where('email', '==', email.toLowerCase()))
          const querySnapshot = await getDocs(q)
          
          if (querySnapshot.empty) {
            return undefined
          }
          
          const docData = querySnapshot.docs[0].data()
          return {
            id: querySnapshot.docs[0].id,
            email: docData.email,
            name: docData.name,
            password: docData.password,
            createdAt: new Date(docData.createdAt),
          }
        } catch (error) {
          console.warn('Firestore read failed, falling back to in-memory storage.', error)
          return inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
        }
      } else {
        // Fallback to in-memory storage
        return inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
      }
    },
    
    findById: async (id: string): Promise<User | undefined> => {
      if (useAdminFirestore()) {
        const docSnap = await adminDb!
          .collection('users')
          .doc(id)
          .get()

        if (!docSnap.exists) {
          return undefined
        }

        const docData = docSnap.data()!
        return {
          id: docSnap.id,
          email: docData.email,
          name: docData.name,
          password: docData.password,
          createdAt: new Date(docData.createdAt),
        }
      } else if (useFirestore()) {
        try {
          const docRef = doc(firestore!, 'users', id)
          const docSnap = await getDoc(docRef)
          
          if (!docSnap.exists()) {
            return undefined
          }
          
          const docData = docSnap.data()
          return {
            id: docSnap.id,
            email: docData.email,
            name: docData.name,
            password: docData.password,
            createdAt: new Date(docData.createdAt),
          }
        } catch (error) {
          console.warn('Firestore read failed, falling back to in-memory storage.', error)
          return inMemoryUsers.find(u => u.id === id)
        }
      } else {
        // Fallback to in-memory storage
        return inMemoryUsers.find(u => u.id === id)
      }
    },
    
    getAll: async (): Promise<User[]> => {
      if (useAdminFirestore()) {
        const snapshot = await adminDb!.collection('users').get()
        return snapshot.docs.map(docSnap => {
          const data = docSnap.data()
          return {
            id: docSnap.id,
            email: data.email,
            name: data.name,
            password: data.password,
            createdAt: new Date(data.createdAt),
          }
        })
      } else if (useFirestore()) {
        try {
          const usersRef = collection(firestore!, 'users')
          const querySnapshot = await getDocs(usersRef)
          
          return querySnapshot.docs.map(doc => {
            const data = doc.data()
            return {
              id: doc.id,
              email: data.email,
              name: data.name,
              password: data.password,
              createdAt: new Date(data.createdAt),
            }
          })
        } catch (error) {
          console.warn('Firestore read failed, falling back to in-memory storage.', error)
          return inMemoryUsers
        }
      } else {
        // Fallback to in-memory storage
        return inMemoryUsers
      }
    }
  }
}
