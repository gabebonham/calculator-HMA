import { getProfileByUserId } from '@/app/actions/profiles.actions'
import { findUserByEmail } from '@/app/services/users.service'
import { comparePassword } from '@/lib/password'
import { AuthConfig } from '@auth/core'
import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
interface UserAuth {
  id: string
  email: string
  name: string
  role: string
}

export const authOptions: NextAuthOptions = {
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
        const profileRes = await getProfileByUserId(user.data?.id as string)
        const passwordValid = await comparePassword(
          credentials?.password as string,
          user.data?.password as string,
        )

        if (passwordValid) {
          return {
            id: user.data?.id!,
            email: user.data?.email!,
            name: user.data?.username!,
            role: user.data?.role!,
            plan: profileRes.success ? profileRes.data?.planId : undefined,
            profileId: profileRes.success ? profileRes.data?.id : undefined,
          }
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email
        token.id = user.id
        token.name = user.name
        token.role = user.role
        token.plan = user.plan
        token.profileId = user.profileId
        const oneHourInSeconds = 60 * 60 * 24
        token.exp = new Date(
          Math.floor(Date.now() / 1000) + oneHourInSeconds * 1000,
        )
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.user.plan = token.plan
      session.user.profileId = token.profileId
      session.user.role = token.role as string
      session.expires = token.exp.toString()
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
