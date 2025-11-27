import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@/lib/id'
import { plans } from './plans'
import { users } from './users'

export const profiles = pgTable('profiles', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  name: text().notNull(),
  email: text().notNull(),

  planId: uuid()
    .notNull()
    .references(() => plans.id, { onDelete: 'cascade' }),

  createdAt: timestamp().notNull().defaultNow(),
})

export type SelectProfile = typeof profiles.$inferSelect
export type InsertProfile = typeof profiles.$inferInsert
