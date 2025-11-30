import { calculationTemplate } from '@/app/mocks/calculation.mocks'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import { plans } from '@/db/schema'
const template = calculationTemplate
type CalcType = 'DIRETO' | 'DIVISAO' | 'DIVISAO_JPY' | 'MULT' | 'MULT_INT'

interface PairRule {
  refer: string
  calc: CalcType
  pipFactor: number
}

export const RULES: Record<string, PairRule> = {
  'EUR/USD': { refer: 'EUR/USD', calc: 'DIRETO', pipFactor: 1 },
  'GBP/USD': { refer: 'GBP/USD', calc: 'DIRETO', pipFactor: 1 },
  'AUD/USD': { refer: 'AUD/USD', calc: 'DIRETO', pipFactor: 1 },
  'NZD/USD': { refer: 'NZD/USD', calc: 'DIRETO', pipFactor: 1 },

  'USD/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'USD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },
  'USD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },

  'EUR/GBP': { refer: 'GBP/USD', calc: 'MULT', pipFactor: 1 },
  'EUR/AUD': { refer: 'AUD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'EUR/NZD': { refer: 'NZD/USD', calc: 'MULT_INT', pipFactor: 1 },

  'EUR/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'EUR/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'EUR/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'GBP/AUD': { refer: 'AUD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'GBP/NZD': { refer: 'NZD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'GBP/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'GBP/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'GBP/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'AUD/NZD': { refer: 'NZD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'AUD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'AUD/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'AUD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'NZD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'NZD/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'NZD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'CAD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'CAD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },
  'CHF/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
}

interface HantecInputs {
  INP_planCode: string
  INP_step: string
  INP_stopLossTrade: number
  INP_safeValue: number
  INP_currentBalance: number
  INP_coinPair: string
  INPPA_targetProfitLots: number
}

interface HantecOutputs {
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
}
function excelForexCalcWithNZDSpecial(
  input: HantecInputs,
  template: CalculationTemplate,
  referPrice: number,
): HantecOutputs {
  const rule = RULES[input.INP_coinPair]
  if (!rule) throw new Error('Unknown pair: ' + input.INP_coinPair)

  const targetPerc = template.targetPerc
  const price = referPrice
  const targetProfitLots = input.INPPA_targetProfitLots
  const currentBalance = input.INP_currentBalance
  const currentTargetProfit = targetPerc * currentBalance
  const stopLossTrade = input.INP_stopLossTrade
  const breachDownPerc = template.breachDownPerc
  const safeValue = input.INP_safeValue
  const comissionReal = template.commissionReal
  const riskyCapital = (currentBalance * stopLossTrade) / 100
  const pointsRA = riskyCapital / targetProfitLots
  let LOT: number
  let stopPoints: number
  let takePoints: number
  let takeProfit: number

  switch (rule.calc) {
    case 'DIRETO':
      stopPoints = riskyCapital / targetProfitLots
      takePoints = currentTargetProfit / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / pointsRA
      break

    case 'DIVISAO':
      stopPoints = (riskyCapital * price) / targetProfitLots
      takePoints = (currentTargetProfit * price) / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA / price)
      break

    case 'DIVISAO_JPY':
      stopPoints = referPrice
      takePoints = (currentTargetProfit * (price / 100)) / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA / (price / 100))

      break

    case 'MULT':
      stopPoints = (riskyCapital * price) / targetProfitLots

      takePoints = currentTargetProfit / price / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA * price)
      break

    case 'MULT_INT':
      stopPoints = Math.round((riskyCapital * price) / targetProfitLots)
      takePoints = Math.round(currentTargetProfit / price / targetProfitLots)
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA * price)

      break
  }

  const stopLossLots = LOT

  return {
    OUTPA_stopLossPoints: Math.abs(stopPoints),
    OUTPA_targetProfitPoints: Math.abs(takePoints),
    OUTRA_stopLossLots: Number(stopLossLots.toFixed(2)),
  }
}
const res = excelForexCalcWithNZDSpecial(
  {
    INP_coinPair: 'USD/JPY',
    INP_currentBalance: 100000,
    INP_planCode: '7',
    INP_safeValue: 600,
    INP_step: '1',
    INP_stopLossTrade: 1,
    INPPA_targetProfitLots: 10,
  },
  template,
  156.15,
)
console.log(res)
