import { findUserByEmail } from '@/app/services/users.service'
import { comparePassword } from '@/lib/password'
import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
interface UserAuth {
  id: string
  email: string
  name: string
  role: string
}

export const authOptions = {
  // pages: {
  //   signIn: "/auth/signin", // Custom sign-in page path
  // },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'user@username.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await findUserByEmail(credentials?.email as string)
        const passwordValid = await comparePassword(
          credentials?.password as string,
          user.data?.password as string,
        )
        if (passwordValid) {
          return {
            id: user.data?.id!,
            email: user.data?.email!,
            name: user.data?.username,
            role: user.data?.role,
          }
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: UserAuth }) {
      if (user) {
        token.email = user.email
        token.id = user.id
        token.name = user.name
        const oneHourInSeconds = 60 * 60 * 24
        token.exp = new Date(
          Math.floor(Date.now() / 1000) + oneHourInSeconds * 1000,
        )
      }

      return token
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session
      token: JWT
      user: UserAuth
    }) {
      session.user.id = user.id
      session.user.email = user.email
      session.user.name = user.name
      session.user.role = user.role
      session.expires = token.exp.toISOString()
      return session
    },
  },
}

const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }
