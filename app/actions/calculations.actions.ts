'use server'

import { calculationTemplate } from '../mocks/calculation.mocks'
import { CalculationTemplateReq } from '../models/calculation-template.entity'
import { Calculation } from '../models/calculation.entity'
import {
  HantecInputs,
  HantecOutputs,
  screateCalculation,
  sgetCalculationsFromProfileId,
  sgetCalculationTemplate,
  supdateCalculationTemplate,
} from '../services/calculator.service'

export async function getCalculationTemplate() {
  try {
    const res = await sgetCalculationTemplate()
    return { success: res.success, error: res.error, data: res.data }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getCalculationsByProfileId(id: string) {
  try {
    const res = await sgetCalculationsFromProfileId(id)
    return { success: res.success, data: res.data, error: res.error }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function createCalculation(
  input: HantecInputs,
  output: HantecOutputs,
  profileId: string,
  INP_coinPairValue: number,
) {
  try {
    await screateCalculation(input, output, profileId, INP_coinPairValue)
    return { success: true }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function updateCalculationTemplate(
  calculationTemp: CalculationTemplateReq,
) {
  try {
    const res = await supdateCalculationTemplate(calculationTemp)
    return { success: true, data: res.data }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
