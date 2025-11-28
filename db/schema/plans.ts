import {
  pgTable,
  uuid,
  text,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createId } from '../../lib/id'

export const plans = pgTable('plans', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  name: text().notNull(),
  description: text().notNull(),

  period: text().notNull(),
  price: doublePrecision().notNull(),

  color: text().notNull(),
  bgcolor: text().notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SelectPlan = typeof plans.$inferSelect
export type InsertPlan = typeof plans.$inferInsert
