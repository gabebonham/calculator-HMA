import { UUID } from 'crypto'

export class CalculationTemplate {
  id: UUID
  planDescription: string
  initialBalance: number

  target: number
  breachDown: number
  margemDD: number
  targetProfit: number
  ddDay: number
  breachDownPerc: number
  targetPerc: number
  leverageFunded: number
  commissionFunded: number
  leverageReal: number
  commissionReal: number

  propFirmAccountNumber: string
  totalGasto: string

  targetProfitPA: number
  stopLossPA: number

  stopLossRA: number
  takeRA: number
  createdAt: Date
  updatedAt: Date
  constructor(props: CalculationTemplate) {
    this.id = props.id
    this.planDescription = props.planDescription
    this.initialBalance = props.initialBalance
    this.breachDownPerc = props.breachDownPerc
    this.targetPerc = props.targetPerc

    this.target = props.target
    this.breachDown = props.breachDown
    this.margemDD = props.margemDD
    this.targetProfit = props.targetProfit
    this.ddDay = props.ddDay

    this.leverageFunded = props.leverageFunded
    this.commissionFunded = props.commissionFunded
    this.leverageReal = props.leverageReal
    this.commissionReal = props.commissionReal

    this.propFirmAccountNumber = props.propFirmAccountNumber
    this.totalGasto = props.totalGasto

    this.targetProfitPA = props.targetProfitPA
    this.stopLossPA = props.stopLossPA
    this.stopLossRA = props.stopLossRA
    this.takeRA = props.takeRA
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
export class CalculationTemplateReq {
  planDescription: string
  initialBalance: number

  target: number
  breachDown: number
  margemDD: number
  targetProfit: number
  ddDay: number
  breachDownPerc: number
  targetPerc: number
  leverageFunded: number
  commissionFunded: number
  leverageReal: number
  commissionReal: number

  propFirmAccountNumber: string
  totalGasto: string

  targetProfitPA: number
  stopLossPA: number

  stopLossRA: number
  takeRA: number
  constructor(props: CalculationTemplateReq) {
    this.planDescription = props.planDescription
    this.initialBalance = props.initialBalance
    this.breachDownPerc = props.breachDownPerc
    this.targetPerc = props.targetPerc

    this.target = props.target
    this.breachDown = props.breachDown
    this.margemDD = props.margemDD
    this.targetProfit = props.targetProfit
    this.ddDay = props.ddDay

    this.leverageFunded = props.leverageFunded
    this.commissionFunded = props.commissionFunded
    this.leverageReal = props.leverageReal
    this.commissionReal = props.commissionReal

    this.propFirmAccountNumber = props.propFirmAccountNumber
    this.totalGasto = props.totalGasto

    this.targetProfitPA = props.targetProfitPA
    this.stopLossPA = props.stopLossPA
    this.stopLossRA = props.stopLossRA
    this.takeRA = props.takeRA
  }
}
