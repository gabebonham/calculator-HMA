import {
  pgTable,
  uuid,
  text,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createId } from '../../lib/id'

export const calculationTemplates = pgTable('calculation_templates', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => createId()),

  planDescription: text('plan_description').notNull(),
  name: text('name').notNull(),
  initialBalance: doublePrecision('initial_balance').notNull(),

  target: doublePrecision().notNull(),
  breachDown: doublePrecision('breach_down').notNull(),
  breachDownPerc: doublePrecision('breach_down_perc').notNull(),
  targetPerc: doublePrecision('target_perc').notNull(),
  margemDD: doublePrecision('margem_dd').notNull(),
  targetProfit: doublePrecision('target_profit').notNull(),
  ddDay: doublePrecision('dd_day').notNull(),

  leverageFunded: doublePrecision('leverage_funded').notNull(),
  commissionFunded: doublePrecision('commission_funded').notNull(),
  leverageReal: doublePrecision('leverage_real').notNull(),
  commissionReal: doublePrecision('commission_real').notNull(),

  propFirmAccountNumber: text('propFirm_account_number').notNull(),
  totalGasto: text('total_gasto').notNull(),

  targetProfitPA: doublePrecision('target_profit_pa').notNull(),
  stopLossPA: doublePrecision('stop_loss_pa').notNull(),

  stopLossRA: doublePrecision('stop_loss_ra').notNull(),
  takeRA: doublePrecision('take_ra').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SelectCalculationTemplate = typeof calculationTemplates.$inferSelect
export type InsertCalculationTemplate = typeof calculationTemplates.$inferInsert
