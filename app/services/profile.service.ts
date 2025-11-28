'use server'

import { db } from '@/db/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function sgetProfileByUserId(id: string) {
  try {
    const [targetProfile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, id))
    if (!targetProfile)
      return { success: false, error: Error('Profile not found') }
    return { success: true, data: targetProfile }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
