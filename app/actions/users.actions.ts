'use service'

import { mockUsers } from '../mocks/users.mocks'
import {
  sdeleteUser,
  sgetUserById,
  supdateUser,
} from '../services/users.service'

export async function getUsers() {
  try {
    return { success: true, data: mockUsers }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getUserById(id: string) {
  try {
    const targetUser = await sgetUserById(id)
    if (!targetUser) return { success: false, error: Error('User not found') }
    else return { success: true, data: targetUser.data }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function updateUser(id: string, email?: string, name?: string) {
  try {
    const targetProfile = await supdateUser(id, email, name)
    if (!targetProfile.success)
      return { success: false, error: targetProfile.error }
    return { success: true }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function deleteUser(id: string) {
  try {
    const res = await sdeleteUser(id)
    return { success: res.success, error: res.error }
  } catch (e) {
    console.log(`Error (sdeleteUser): ${e}`)
    return { error: e, success: false }
  }
}
