import {
  pgTable,
  uuid,
  integer,
  doublePrecision,
  timestamp,
  text,
} from 'drizzle-orm/pg-core'
import { createId } from '../../lib/id'

import { profiles } from './profiles'

export const calculations = pgTable('calculations', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  profileId: uuid('profile_id')
    .notNull()
    .references(() => profiles.id, { onDelete: 'cascade' }),
  INP_coinPair: text('INP_coin_pair').notNull(),
  INP_planCode: integer('INP_planCode').notNull(),
  INP_step: integer('INP_step').notNull(),
  INP_stopLossTrade: doublePrecision('INP_stopLossTrade').notNull(),
  INP_safeValue: doublePrecision('INP_safeValue').notNull(),
  INP_currentBalance: doublePrecision('INP_currentBalance').notNull(),
  INP_coinPairValue: doublePrecision('INP_coinPairValue').notNull(),

  INPPA_targetProfitLots: doublePrecision('INPPA_targetProfitLots').notNull(),
  OUTPA_targetProfitPoints: doublePrecision(
    'OUTPA_targetProfitPoints',
  ).notNull(),
  OUTPA_stopLossPoints: doublePrecision('OUTPA_stopLossPoints').notNull(),
  OUTRA_stopLossLots: doublePrecision('OUTRA_stopLossLots').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SelectCalculation = typeof calculations.$inferSelect
export type InsertCalculation = typeof calculations.$inferInsert
