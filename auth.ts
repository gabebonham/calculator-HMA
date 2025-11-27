// auth.ts

import NextAuth, { AuthOptions, DefaultUser, DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// --- 1. Custom Types (Crucial for Type Safety) ---

/** Extend the NextAuth types to include 'id' on the session user */
export interface UserWithId extends DefaultUser {
  id: string
}

// NOTE: You must also create a separate 'next-auth.d.ts' file
// to globally declare these augmented types for TypeScript.

// --- 2. Configuration Options ---

export const authConfig: AuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // ⚠️ YOUR AUTHENTICATION LOGIC GOES HERE ⚠️
        // Example: Look up user in database, verify password

        // If authorization succeeds, return a user object that MUST include an 'id'
        if (
          credentials?.email === 'test@example.com' &&
          credentials?.password === 'password'
        ) {
          return {
            id: 'user-db-12345',
            name: 'Test User',
            email: 'test@example.com',
          } as UserWithId // Cast it to your custom type
        }
        // If authorization fails
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // 1. On sign-in, transfer the user's ID and data to the token
      if (user) {
        token.user = {
          id: (user as UserWithId).id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }
      return token
    },

    async session({ session, token }) {
      // 2. On subsequent requests, transfer the data from the token to the session
      if (token.user) {
        session.user = token.user as UserWithId & DefaultSession['user']
      }
      return session
    },
  },
}
console.log("✅ AUTH.TS FILE IS BEING LOADED.");
// --- 3. Exported NextAuth Instance (Resolves 'GET' Destructuring Error) ---

/**
 * Initializes NextAuth and exports the necessary functions/handlers.
 */
export const {
  handlers, // Required for the API Route Handler (route.ts)
  auth, // Function for getting the session server-side
  signIn, // Function for initiating sign-in server-side
  signOut, // Function for initiating sign-out server-side
} = NextAuth(authConfig)
