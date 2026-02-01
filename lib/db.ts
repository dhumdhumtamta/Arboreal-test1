// Simple in-memory user database
// In production, replace this with a real database (PostgreSQL, MongoDB, etc.)

export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
}

// In-memory storage (will reset on server restart)
const users: User[] = []

export const db = {
  users: {
    create: async (data: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
      const user: User = {
        id: Math.random().toString(36).substring(2, 15),
        ...data,
        createdAt: new Date(),
      }
      users.push(user)
      return user
    },
    
    findByEmail: async (email: string): Promise<User | undefined> => {
      return users.find(u => u.email.toLowerCase() === email.toLowerCase())
    },
    
    findById: async (id: string): Promise<User | undefined> => {
      return users.find(u => u.id === id)
    },
    
    getAll: async (): Promise<User[]> => {
      return users
    }
  }
}
