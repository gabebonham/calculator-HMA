'use server'

import { calculationTemplate } from '../mocks/calculation.mocks'

export async function getCalculationTemplate() {
  try {
    return { success: true, data: calculationTemplate }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
