import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import 'dotenv/config'
import { plans, profiles, users } from '../schema/index'
import * as schema from '@/db/schema'
import { hashPassword } from '@/lib/password'
import { planRules } from '../schema/plan-rule'

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

  await db.insert(planRules).values([
    {
      pair: 'EUR/USD',
      refer: 'EUR/USD',
      calc: 'DIRETO',
      pipFactor: 1,
    },
    {
      pair: 'GBP/USD',
      refer: 'GBP/USD',
      calc: 'DIRETO',
      pipFactor: 1,
    },
    {
      pair: 'AUD/USD',
      refer: 'AUD/USD',
      calc: 'DIRETO',
      pipFactor: 1,
    },
    {
      pair: 'NZD/USD',
      refer: 'NZD/USD',
      calc: 'DIRETO',
      pipFactor: 1,
    },

    {
      pair: 'USD/CAD',
      refer: 'USD/CAD',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'USD/CHF',
      refer: 'USD/CHF',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'USD/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },

    {
      pair: 'EUR/GBP',
      refer: 'GBP/USD',
      calc: 'MULT',
      pipFactor: 1,
    },
    {
      pair: 'EUR/AUD',
      refer: 'AUD/USD',
      calc: 'MULT_INT',
      pipFactor: 1,
    },
    {
      pair: 'EUR/NZD',
      refer: 'NZD/USD',
      calc: 'MULT_INT',
      pipFactor: 1,
    },
    {
      pair: 'EUR/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },
    {
      pair: 'EUR/CAD',
      refer: 'USD/CAD',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'EUR/CHF',
      refer: 'USD/CHF',
      calc: 'DIVISAO',
      pipFactor: 1,
    },

    {
      pair: 'GBP/AUD',
      refer: 'AUD/USD',
      calc: 'MULT_INT',
      pipFactor: 1,
    },
    {
      pair: 'GBP/NZD',
      refer: 'NZD/USD',
      calc: 'MULT_INT',
      pipFactor: 1,
    },
    {
      pair: 'GBP/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },
    {
      pair: 'GBP/CAD',
      refer: 'USD/CAD',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'GBP/CHF',
      refer: 'USD/CHF',
      calc: 'DIVISAO',
      pipFactor: 1,
    },

    {
      pair: 'AUD/NZD',
      refer: 'NZD/USD',
      calc: 'MULT_INT',
      pipFactor: 1,
    },
    {
      pair: 'AUD/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },
    {
      pair: 'AUD/CAD',
      refer: 'USD/CAD',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'AUD/CHF',
      refer: 'USD/CHF',
      calc: 'DIVISAO',
      pipFactor: 1,
    },

    {
      pair: 'NZD/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },
    {
      pair: 'NZD/CAD',
      refer: 'USD/CAD',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'NZD/CHF',
      refer: 'USD/CHF',
      calc: 'DIVISAO',
      pipFactor: 1,
    },

    {
      pair: 'CAD/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },
    {
      pair: 'CAD/CHF',
      refer: 'USD/CHF',
      calc: 'DIVISAO',
      pipFactor: 1,
    },
    {
      pair: 'CHF/JPY',
      refer: 'USD/JPY',
      calc: 'DIVISAO_JPY',
      pipFactor: 100,
    },
  ])
  await db.insert(schema.calculationTemplates).values({
    planDescription: 'FTMO',
    name: 'mainTemplate',

    initialBalance: 100000,

    target: 110000,
    breachDown: 90000,
    margemDD: 10000,
    targetProfit: 10000,
    ddDay: -5000,
    breachDownPerc: 10,
    targetPerc: 0.1,

    leverageFunded: 30,
    commissionFunded: 3,
    leverageReal: 1000,
    commissionReal: 0,

    propFirmAccountNumber: '123456',
    totalGasto: '0,00%',

    targetProfitPA: 10000,
    stopLossPA: -1000,

    stopLossRA: 600,
    takeRA: 60,
  })

  console.log('Seeding finished!')
  process.exit(0)
}

main().catch((err) => {
  console.log(err)
  process.exit(0)
})
