import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import 'dotenv/config'
import { plans, profiles, users } from '../schema/index'
import * as schema from '@/db/schema'
import { hashPassword } from '@/lib/password'

const pool = new Pool({
  connectionString: process.env.DB_URL,
})

const db = drizzle(pool, { schema, casing: 'snake_case' })

async function main() {
  console.log('Seeding started...')

  //
  // 1) Insert Plans
  //
  await db.delete(profiles)
  await db.delete(users)
  await db.delete(plans)
  const pass = await hashPassword('Teste1234@')
  const [[basicPlan], [standardPlan], [premiumPlan], [ultimatePlan]] =
    await Promise.all([
      db
        .insert(plans)
        .values({
          id: crypto.randomUUID(),
          name: 'Basic',
          description:
            'Plano básico ideal para começar e testar nossos serviços essenciais.',
          period: 'monthly',
          price: 23.12,
          color: 'text-blue-500',
          bgcolor: 'bg-blue-200',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning(),

      db
        .insert(plans)
        .values({
          id: crypto.randomUUID(),
          name: 'Standard',
          description:
            'Plano padrão para quem quer mais recursos e benefícios adicionais.',
          period: 'semiannual',
          price: 52.59,
          color: 'text-yellow-500',
          bgcolor: 'bg-yellow-200',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning(),

      db
        .insert(plans)
        .values({
          id: crypto.randomUUID(),
          name: 'Premium',
          description:
            'Plano premium com acesso completo às funcionalidades avançadas.',
          period: 'yearly',
          price: 140.1,
          color: 'text-amber-500',
          bgcolor: 'bg-amber-200',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning(),

      db
        .insert(plans)
        .values({
          id: crypto.randomUUID(),
          name: 'Ultimate',
          description:
            'Plano ultimate para usuários que desejam todos os privilégios sem limitações.',
          period: 'lifetime',
          price: 210.26,
          color: 'text-orange-500',
          bgcolor: 'bg-orange-200',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning(),
    ])

  //
  // 2) Insert User
  //
  const [createdUser] = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      username: 'Cassiano',
      email: 'cassiano@gmail.com',
      password: pass,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()

  //
  // 3) Insert Profile
  //
  await db.insert(profiles).values({
    id: crypto.randomUUID(),
    userId: createdUser.id,
    name: 'Cassiano Silva',
    email: createdUser.email,
    planId: ultimatePlan.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const [createdUser2] = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      username: 'Marcelão',
      email: 'marcelo@gmail.com',
      password: pass,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()

  //
  // 3) Insert Profile
  //
  await db.insert(profiles).values({
    id: crypto.randomUUID(),
    userId: createdUser2.id,
    name: 'Marcelão',
    email: createdUser2.email,
    planId: ultimatePlan.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  console.log('Seeding finished!')
  process.exit(0)
}

main().catch((err) => {
  console.log(err)
  process.exit(0)
})
