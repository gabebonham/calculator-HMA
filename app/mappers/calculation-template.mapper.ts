import { CalculationTemplate } from '../models/calculation-template.entity'

export function calculationTemplateMapper(calculation: CalculationTemplate) {
  return {
    id: calculation.id,
    planDescription: calculation.planDescription,
    initialBalance: calculation.initialBalance,
    breachDownPerc: calculation.breachDownPerc,
    targetPerc: calculation.targetPerc,
    target: calculation.target,
    breachDown: calculation.breachDown,
    margemDD: calculation.margemDD,
    targetProfit: calculation.targetProfit,
    ddDay: calculation.ddDay,

    leverageFunded: calculation.leverageFunded,
    commissionFunded: calculation.commissionFunded,
    leverageReal: calculation.leverageReal,
    commissionReal: calculation.commissionReal,

    propFirmAccountNumber: calculation.propFirmAccountNumber,
    totalGasto: calculation.totalGasto,

    targetProfitPA: calculation.targetProfitPA,
    stopLossPA: calculation.stopLossPA,

    stopLossRA: calculation.stopLossRA,
    takeRA: calculation.takeRA,
    createdAt: calculation.createdAt,
  }
}
export function calculationTemplatesMapper(
  calculations: CalculationTemplate[],
) {
  return calculations.map(calculationTemplateMapper)
}
