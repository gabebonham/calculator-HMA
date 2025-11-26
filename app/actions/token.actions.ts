'use server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { mockUsers } from '../mocks/users.mocks'
// export async function getTokenPayload() {
//   const cookieStore = await cookies()
//   const tokenCookie = cookieStore.get('token')
//   const token = tokenCookie?.value as string
//   const decoded = jwt.decode(token)
//   return decoded as JwtPayload
// }
export async function getTokenPayload() {
  return { sub: mockUsers[0].id, role: mockUsers[0].role }
}
