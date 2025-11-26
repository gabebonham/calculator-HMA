'use service'

import { mockUsers } from '../mocks/users.mocks'

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
    const targetUser = mockUsers.find((user) => user.id == id)
    if (!targetUser) return { success: false, error: Error('User not found') }
    else return { success: true, data: targetUser }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
