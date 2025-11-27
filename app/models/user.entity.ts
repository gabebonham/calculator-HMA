import { UUID } from 'crypto'
type Role = 'user' | 'admin'
export class User {
  id: UUID
  username: string
  email: string
  password: string
  role: Role
  createdAt: Date
  constructor(
    id: UUID,
    username: string,
    email: string,
    password: string,
    role: Role,
    createdAt: Date,
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.role = role
    this.password = password
    this.createdAt = createdAt
  }
}
export class UserInsert {
  username: string
  email: string
  password: string
  role: Role
  constructor(username: string, email: string, role: Role, password: string) {
    this.username = username
    this.email = email
    this.password = password
    this.role = role
  }
}
