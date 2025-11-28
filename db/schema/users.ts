import { pgTable, timestamp, text, uuid } from 'drizzle-orm/pg-core'
import { createId } from '../../lib/id'

export const users = pgTable('users', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text(),
  email: text().notNull().unique(),
  role: text(),
  password: text(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
