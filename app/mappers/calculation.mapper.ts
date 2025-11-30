import { Calculation } from '../models/calculation.entity'

export function calculationMapper(calculation: Calculation) {
  if (!calculation) return undefined
  return {
    id: calculation.id,
    profileId: calculation.profileId,

    INP_planCode: calculation.INP_planCode,
    INP_step: calculation.INP_step,
    INP_stopLossTrade: calculation.INP_stopLossTrade,
    INP_safeValue: calculation.INP_safeValue,
    INP_currentBalance: calculation.INP_currentBalance,
    INP_coinPairValue: calculation.INP_coinPairValue,
    INP_coinPair: calculation.INP_coinPair,

    INPPA_targetProfitLots: calculation.INPPA_targetProfitLots,
    OUTPA_targetProfitPoints: calculation.OUTPA_targetProfitPoints,
    OUTPA_stopLossPoints: calculation.OUTPA_stopLossPoints,
    OUTRA_stopLossLots: calculation.OUTRA_stopLossLots,

    createdAt: calculation.createdAt,
  }
}

export function calculationsMapper(calculations: Calculation[]) {
  if (!calculations) return []
  return calculations.map(calculationMapper)
}
