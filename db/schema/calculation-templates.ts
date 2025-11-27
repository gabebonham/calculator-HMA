import {
  pgTable,
  uuid,
  text,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createId } from '@/lib/id'

export const calculationTemplates = pgTable('calculation_templates', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  planDescription: text().notNull(),
  initialBalance: doublePrecision().notNull(),

  target: doublePrecision().notNull(),
  breachDown: doublePrecision().notNull(),
  margemDD: doublePrecision().notNull(),
  targetProfit: doublePrecision().notNull(),
  ddDay: doublePrecision().notNull(),

  leverageFunded: doublePrecision().notNull(),
  commissionFunded: doublePrecision().notNull(),
  leverageReal: doublePrecision().notNull(),
  commissionReal: doublePrecision().notNull(),

  propFirmAccountNumber: text().notNull(),
  totalGasto: text().notNull(),

  targetProfitPA: doublePrecision().notNull(),
  stopLossPA: doublePrecision().notNull(),

  stopLossRA: doublePrecision().notNull(),
  takeRA: doublePrecision().notNull(),

  createdAt: timestamp().notNull().defaultNow(),
})

export type SelectCalculationTemplate = typeof calculationTemplates.$inferSelect
export type InsertCalculationTemplate = typeof calculationTemplates.$inferInsert
