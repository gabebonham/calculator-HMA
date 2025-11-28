import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core'
import { createId } from '../../lib/id'
import { users } from './users'

export const codes = pgTable('codes', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  code: integer().notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SelectCode = typeof codes.$inferSelect
export type InsertCode = typeof codes.$inferInsert
