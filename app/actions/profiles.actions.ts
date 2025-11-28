'use server'

import { cookies } from 'next/headers'
import { mockProfiles } from '../mocks/profile.mocks'
import { JwtPayload } from 'jsonwebtoken'
import { getTokenPayload } from './token.actions'
import { sgetProfileByUserId } from '../services/profile.service'

export async function getProfiles() {
  try {
    return { success: true, data: mockProfiles }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getProfileById(id: string) {
  try {
    const targetProfile = mockProfiles.find((profile) => profile.id == id)
    if (!targetProfile)
      return { success: false, error: Error('Profile not found') }
    else return { success: true, data: targetProfile }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getProfileByCookie() {
  try {
    // const cookieStore = await cookies()
    // const token = cookieStore.get('token')
    // const payload = decodeJwt(token?.value as string)
    // const userId = (payload?.payload as JwtPayload).sub
    const payload = await getTokenPayload()
    const targetProfileRes = await getProfileByUserId(payload.sub as string)
    const targetProfile = targetProfileRes.data
    if (!targetProfile)
      return { success: false, error: Error('Profile not found') }
    else return { success: true, data: targetProfile }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getProfileByUserId(id: string) {
  try {
    const targetProfile = await sgetProfileByUserId(id)
    if (!targetProfile.success)
      return { success: false, error: targetProfile.error }
    return { success: true, data: targetProfile.data }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
