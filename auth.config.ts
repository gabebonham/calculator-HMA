import type { AuthOptions } from 'next-auth'

export interface UserWithId {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export const authConfig: AuthOptions = {
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }
      return token
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as UserWithId
      }
      return session
    },
  },
}
