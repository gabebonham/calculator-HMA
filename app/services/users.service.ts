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
    console.log(user)
    return { success: true, data: user }
  } catch (e) {
    console.log(`Error (findUserByEmail): ${e}`)
    return { error: e, success: false }
  }
}

export async function supdateUser(id: string, email?: string, name?: string) {
  try {
    if (email != undefined) {
      const [t] = await db
        .update(users)
        .set({ email: email })
        .where(eq(users.id, id))
        .returning()
      console.log(t)
    }

    if (name != undefined) {
      const [t] = await db
        .update(users)
        .set({ username: name })
        .where(eq(users.id, id))
        .returning()
      console.log(t)
    }

    return { success: true }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function sgetUserById(id: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
    return { success: true, data: user }
  } catch (e) {
    console.log(`Error (sgetUserById): ${e}`)
    return { error: e, success: false }
  }
}
export async function sdeleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id))
    return { success: true }
  } catch (e) {
    console.log(`Error (sdeleteUser): ${e}`)
    return { error: e, success: false }
  }
}
