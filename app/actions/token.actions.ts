'use server'
import { getServerSession } from 'next-auth/next'
export async function getTokenPayload() {
  const session = await getServerSession()
  console.log(session)
  return { sub: session?.user.id, role: session?.user.role }
}
