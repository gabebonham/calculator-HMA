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

  leverageFunded: 30,
  commissionFunded: 3,
  leverageReal: 1000,
  commissionReal: 693.83,

  propFirmAccountNumber: '123456',
  totalGasto: '0,00%',

  targetProfitPA: 10000,
  stopLossPA: -1000,

  stopLossRA: 600,
  takeRA: 60,
  createdAt: new Date(),
})
function mockCalculation(): Calculation {
  return new Calculation(
    uuid() as any,
    uuid() as any,
    Math.floor(Math.random() * 5) + 1, // INP_planCode
    Math.floor(Math.random() * 3) + 1, // INP_step
    Number((Math.random() * 50).toFixed(2)), // INP_stopLossTrade
    Number((Math.random() * 100).toFixed(2)), // INP_safeValue
    Number((Math.random() * 10000).toFixed(2)), // INP_currentBalance
    Number((Math.random() * 10).toFixed(4)), // INP_coinPairValue
    Number((Math.random() * 0.5).toFixed(2)), // INPPA_targetProfitLots
    Math.floor(Math.random() * 100), // OUTPA_targetProfitPoints
    Math.floor(Math.random() * 200), // OUTPA_stopLossPoints
    Number((Math.random() * 0.5).toFixed(2)), // OUTRA_stopLossLots
    new Date(),
    undefined,
  )
}

export const calculationsMock = Array.from({ length: 10 }, () =>
  mockCalculation(),
)
