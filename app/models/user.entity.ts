import { UUID } from 'crypto'
type Role = 'user' | 'admin'
export class User {
  id: UUID
  username: string
  email: string
  role: Role
  createdAt: Date
  constructor(
    id: UUID,
    username: string,
    email: string,
    role: Role,
    createdAt: Date,
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.role = role
    this.createdAt = createdAt
  }
}
