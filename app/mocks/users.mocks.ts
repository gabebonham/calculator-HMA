import { User } from '../models/user.entity'
export const uuid = () =>
  crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`

export const mockUsers: User[] = [
  new User(
    uuid(),
    'alice.j',
    'alice@example.com',
    'admin',
    new Date('2024-01-10'),
  ),
  new User(
    uuid(),
    'gabriel.s',
    'gabriel@example.com',
    'user',
    new Date('2024-02-18'),
  ),
  new User(
    uuid(),
    'lucas.m',
    'lucas@example.com',
    'user',
    new Date('2024-03-22'),
  ),
  new User(
    uuid(),
    'mariana.s',
    'mariana@example.com',
    'user',
    new Date('2024-04-05'),
  ),
  new User(
    uuid(),
    'carlos.p',
    'carlos@example.com',
    'user',
    new Date('2024-05-14'),
  ),
  new User(
    uuid(),
    'fernanda.l',
    'fernanda@example.com',
    'user',
    new Date('2024-06-01'),
  ),
  new User(
    uuid(),
    'rafael.a',
    'rafael@example.com',
    'user',
    new Date('2024-06-28'),
  ),
  new User(
    uuid(),
    'julia.c',
    'julia@example.com',
    'user',
    new Date('2024-07-07'),
  ),
  new User(
    uuid(),
    'thiago.g',
    'thiago@example.com',
    'user',
    new Date('2024-08-19'),
  ),
  new User(
    uuid(),
    'beatriz.r',
    'beatriz@example.com',
    'user',
    new Date('2024-09-11'),
  ),
]
