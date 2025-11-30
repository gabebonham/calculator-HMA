import {
  pgTable,
  uuid,
  text,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createId } from '../../lib/id'

export const planRules = pgTable('plan_rules', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  pair: text().notNull(),
  refer: text().notNull(),

  calc: text().notNull(),

  pipFactor: doublePrecision('pip_factor').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SelectPlanRules = typeof planRules.$inferSelect
export type InsertPlanRules = typeof planRules.$inferInsert
