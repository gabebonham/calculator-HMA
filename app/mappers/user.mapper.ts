import { User } from '../models/user.entity'

export function userMapper(user: User) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
    createdAt: user.createdAt,
  }
}
export function usersMapper(users: User[]) {
  return users.map(userMapper)
}
