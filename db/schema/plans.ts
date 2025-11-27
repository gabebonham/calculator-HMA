import {
  pgTable,
  uuid,
  text,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createId } from '@/lib/id'

export const plans = pgTable('plans', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  name: text().notNull(),
  description: text().notNull(),

  period: text().notNull(), // "monthly" | "semiannual" | "yearly" | "lifetime"
  price: doublePrecision().notNull(),

  color: text().notNull(),
  bgcolor: text().notNull(),

  createdAt: timestamp().notNull().defaultNow(),
})

export type SelectPlan = typeof plans.$inferSelect
export type InsertPlan = typeof plans.$inferInsert
