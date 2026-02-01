# Authentication Test Guide

## Testing the Login and Signup System

### 1. Create a New Account (Signup)

1. Navigate to: `http://localhost:3001/signup`
2. Fill in the form:
   - **Full Name**: Test User
   - **Email**: test@example.com
   - **Password**: password123
   - **Confirm Password**: password123
3. Click "Create account"
4. You should be automatically logged in and redirected to the homepage

### 2. Test Logout

1. On the homepage, click the "Sign out" button in the navbar
2. You should see "Sign in" and "Get Started" buttons appear

### 3. Test Login

1. Navigate to: `http://localhost:3001/login`
2. Enter the credentials:
   - **Email**: test@example.com
   - **Password**: password123
3. Click "Sign in"
4. You should be logged in and redirected to the homepage
5. You should see your name and "Sign out" button in the navbar

### 4. Test Protected Routes

1. Try to access: `http://localhost:3001/capture`
   - If logged in: You should access the page
   - If logged out: You should be redirected to `/login`

### 5. Test Form Validation

**Signup Form:**
- Try submitting with empty fields (should show errors)
- Try submitting with invalid email (should show error)
- Try submitting with password less than 6 characters (should show error)
- Try submitting with mismatched passwords (should show error)
- Try signing up with an existing email (should show error)

**Login Form:**
- Try submitting with empty fields (should show errors)
- Try submitting with invalid email format (should show error)
- Try submitting with wrong password (should show error)
- Try submitting with non-existent email (should show error)

## Features Implemented

✅ **User Registration** (Signup)
- Form validation with Zod
- Password confirmation
- Email uniqueness check
- Automatic login after signup

✅ **User Login**
- Credentials authentication
- Form validation
- Error handling
- Session management

✅ **Session Management**
- JWT-based sessions
- Persistent login state
- Secure password hashing (bcrypt)

✅ **Protected Routes**
- Middleware-based route protection
- Automatic redirect to login
- Routes protected: /capture, /furniture, /generate, /result

✅ **UI Components**
- Clean, Google Workspace-inspired design
- Responsive forms
- Loading states
- Error messages
- Success feedback

✅ **Security**
- Password hashing with bcrypt
- Secure session tokens
- Input validation
- SQL injection prevention (using type-safe code)

## API Endpoints

- `POST /api/register` - Create new user
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/session` - Get current session

## Database

Currently using **in-memory storage** for demo purposes.
⚠️ **Important**: Users will be lost when server restarts.

### To use a real database:

Replace `lib/db.ts` with actual database implementation:
- PostgreSQL with Prisma
- MongoDB with Mongoose
- MySQL with TypeORM
- Supabase
- Firebase

## Environment Variables

Located in `.env.local`:
```
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=arboreal-secret-key-change-this-in-production
```

⚠️ **Production**: Change `NEXTAUTH_SECRET` to a secure random string

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js v5
- **Form Validation**: React Hook Form + Zod
- **Password Hashing**: bcryptjs
- **UI**: Tailwind CSS + Radix UI components
- **Session**: JWT-based

## Troubleshooting

**Issue**: Can't log in after signup
- **Solution**: Make sure the email and password match what you entered during signup

**Issue**: Redirected to login when accessing protected routes
- **Solution**: You need to be logged in. Go to `/login` or `/signup` first

**Issue**: "User already exists" error
- **Solution**: Use a different email or restart the server (clears in-memory database)

**Issue**: Session not persisting
- **Solution**: Make sure cookies are enabled in your browser
