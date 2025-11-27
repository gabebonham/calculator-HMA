import {
  pgTable,
  uuid,
  integer,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createId } from '@/lib/id'
import { profiles } from './profiles'

export const calculations = pgTable('calculations', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  profileId: uuid()
    .notNull()
    .references(() => profiles.id, { onDelete: 'cascade' }),

  INP_planCode: integer().notNull(),
  INP_step: integer().notNull(),
  INP_stopLossTrade: doublePrecision().notNull(),
  INP_safeValue: doublePrecision().notNull(),
  INP_currentBalance: doublePrecision().notNull(),
  INP_coinPairValue: doublePrecision().notNull(),

  INPPA_targetProfitLots: doublePrecision().notNull(),
  OUTPA_targetProfitPoints: doublePrecision().notNull(),
  OUTPA_stopLossPoints: doublePrecision().notNull(),
  OUTRA_stopLossLots: doublePrecision().notNull(),

  createdAt: timestamp().notNull().defaultNow(),
})

export type SelectCalculation = typeof calculations.$inferSelect
export type InsertCalculation = typeof calculations.$inferInsert
