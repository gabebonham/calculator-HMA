import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'
import { mockUsers } from '@/app/mocks/users.mocks'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const uuid = () =>
  crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`

export function decodeJwt(token: string) {
  const decoded = jwt.decode(token, { complete: true })
  return decoded
}
export function decodeJwtFake(token: string) {
  return { sub: mockUsers[0].id, role: mockUsers[0].role }
}
