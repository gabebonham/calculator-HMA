'use server'

import { db } from '@/db/db'
import { users } from '@/db/schema'
import { User, UserInsert } from '../models/user.entity'
import { eq } from 'drizzle-orm'

export async function createUser({
  email,
  role,
  username,
  password,
}: UserInsert) {
  try {
    const user = await db
      .insert(users)
      .values({ email, role, username, password })
      .returning()
    return { success: true, data: user }
  } catch (e) {
    console.log(`Error (createUser): ${e}`)
    return { error: e, success: false }
  }
}
export async function findUserByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    return { success: true, data: user }
  } catch (e) {
    console.log(`Error (findUserByEmail): ${e}`)
    return { error: e, success: false }
  }
}
