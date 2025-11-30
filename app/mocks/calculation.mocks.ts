import { CalculationTemplate } from '../models/calculation-template.entity'
import { Calculation } from '../models/calculation.entity'
export const uuid = () =>
  crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`

export const calculationTemplate = new CalculationTemplate({
  id: uuid(),
  planDescription: 'FTMO',
  initialBalance: 100000,

  target: 110000,
  breachDown: 90000,
  margemDD: 10000,
  targetProfit: 10000,
  ddDay: -5000,
  breachDownPerc: 10,
  targetPerc: 0.1,
  leverageFunded: 30,
  commissionFunded: 3,
  leverageReal: 1000,
  commissionReal: 0,

  propFirmAccountNumber: '123456',
  totalGasto: '0,00%',

  targetProfitPA: 10000,
  stopLossPA: -1000,

  stopLossRA: 600,
  takeRA: 60,
  createdAt: new Date(),
  updatedAt: new Date(),
})
