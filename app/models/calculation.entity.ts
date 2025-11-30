import { UUID } from 'crypto'
import { Plan } from './plan.entity'
import { Profile } from './profile.entity'

export class Calculation {
  id: UUID
  profileId: UUID
  profile?: Profile
  INP_planCode: number
  INP_step: number
  INP_stopLossTrade: number
  INP_safeValue: number
  INP_currentBalance: number
  INP_coinPairValue: number
  INP_coinPair: string
  INPPA_targetProfitLots: number
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
  createdAt: Date
  constructor(
    id: UUID,
    profileId: UUID,
    INP_planCode: number,
    INP_step: number,
    INP_stopLossTrade: number,
    INP_coinPair: string,
    INP_safeValue: number,
    INP_currentBalance: number,
    INP_coinPairValue: number,
    INPPA_targetProfitLots: number,
    OUTPA_targetProfitPoints: number,
    OUTPA_stopLossPoints: number,
    OUTRA_stopLossLots: number,
    createdAt: Date,
    profile?: Profile,
  ) {
    this.id = id
    this.profileId = profileId
    this.profile = profile
    this.INP_planCode = INP_planCode
    this.INP_step = INP_step
    this.INP_stopLossTrade = INP_stopLossTrade
    this.INP_safeValue = INP_safeValue
    this.INP_currentBalance = INP_currentBalance
    this.INP_coinPairValue = INP_coinPairValue
    this.INP_coinPair = INP_coinPair
    this.INPPA_targetProfitLots = INPPA_targetProfitLots
    this.OUTPA_targetProfitPoints = OUTPA_targetProfitPoints
    this.OUTPA_stopLossPoints = OUTPA_stopLossPoints
    this.OUTRA_stopLossLots = OUTRA_stopLossLots
    this.createdAt = createdAt
  }
}
