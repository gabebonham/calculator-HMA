import NextAuth, { DefaultSession, User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string
      role: string
      plan: string | null | undefined
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    plan: string | null | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    role: string
    plan: string | null | undefined
    exp: number
  }
}
