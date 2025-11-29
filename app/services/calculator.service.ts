import { PLANOS_DATA } from './calculator-service2'

// helper: parse numbers that may use '.' as thousands separator and ',' as decimal separator
function parseEuropeanNumber(
  v: string | number | null | undefined,
): number | null {
  if (v === null || v === undefined) return null
  if (typeof v === 'number') return v
  const s = String(v).trim()
  if (s === '') return null

  // if it already looks like a standard JS number, parse normally
  if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s)

  // handle formats like "10.000,00" or "693,83" or "1.234" or "1000,5"
  // 1) remove thousand separators (periods)
  // 2) replace decimal comma with dot
  const cleaned = s.replace(/\./g, '').replace(/,/g, '.')

  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

// Minimal VLOOKUP-like helper for an array of rows/objects.
// table: array of rows (either arrays or objects)
// key: lookup key to compare with first column
// colIndex: 1-based column index to return (like Excel VLOOKUP)
// exactMatch: boolean for exact match (true => require equality)
function vlookup(table: any, INP_planCode: string): any | null {
  const plan = table[INP_planCode]
  if (!plan) {
    throw new Error(
      `Plan Code ${INP_planCode} não encontrado no mapa de planos.`,
    )
  }
  return plan
}

/* --- Your existing interfaces (copied/adapted) --- */
export interface HantecInputs {
  INP_planCode: string
  INP_step?: string
  INP_stopLossTrade: number // money (stop loss money)
  INP_safeValue?: number
  INP_currentBalance?: number
  INP_coinPairValue?: number
  INPPA_targetProfitLots: number
}

export interface HantecOutputs {
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
}

/* Minimal CalculationTemplate shape used in calc */
type CalculationTemplateLike = {
  commissionFunded?: number | string // may come from template or lookup
  commissionReal?: number | string
  stopLossRA?: number | string // template.stopLossRA
}

/**
 * calculateHantecWithLookup
 * - plansTable: the 'Planos (FUNDED)' sheet represented as an array of rows or objects
 * - inputs: user inputs
 * - template: fallback template values
 */
export function calculateHantecWithLookup(
  plansTable: Array<any>,
  inputs: HantecInputs,
  template: CalculationTemplateLike,
): HantecOutputs {
  const plan = PLANOS_DATA[inputs.INP_planCode]
  let V_TARGET_PERCENT: number
  let V_BREACH_DOWN_PERCENT: number

  // F9 (TARGET %) e F10 (DD %) logic based on E6 (INP_step)
  if (inputs.INP_step === '1') {
    V_TARGET_PERCENT = plan.target_f1
    V_BREACH_DOWN_PERCENT = plan.dd_f1
  } else if (inputs.INP_step === '2') {
    V_TARGET_PERCENT = plan.target_f2
    V_BREACH_DOWN_PERCENT = plan.dd_f2
  } else if (
    inputs.INP_step === 'F1' ||
    inputs.INP_step === 'F2' ||
    inputs.INP_step === 'F AC'
  ) {
    V_TARGET_PERCENT = plan.target_fac
    V_BREACH_DOWN_PERCENT = plan.dd_fac
  } else {
    throw new Error(`Step ${inputs.INP_step} inválido.`)
  }
  const POINTS_PER_LOT_PROP = inputs.INP_coinPairValue as number
  const POINTS_PER_LOT_REAL = 16

  // Try to find the plan row and extract the 3rd column (A:C;3 in Excel)
  const rawLookupValue = vlookup(plansTable, inputs.INP_planCode)

  // Parse as number (handles "693,83" etc.)
  const lookupValueNum = parseEuropeanNumber(rawLookupValue)

  // If lookup succeeded use it; otherwise fall back to template.commissionFunded
  // NOTE: in your workbook the VLOOKUP(...;A:C;3;0) probably returns "VALUE" (not necessarily commission).
  // Adjust below depending on what column 3 actually contains.
  const commissionFunded =
    lookupValueNum ?? parseEuropeanNumber(template.commissionFunded) ?? 0
  const commissionReal = parseEuropeanNumber(template.commissionReal) ?? 1 // avoid divide by 0

  // PROP ACCOUNT calculations
  const OUTPA_targetProfitPoints =
    inputs.INPPA_targetProfitLots * POINTS_PER_LOT_PROP

  // stopLossTrade is a money amount (negative or positive). To compute stopLoss lots we need a divisor:
  // In earlier logic we divided stopLossMoney by commissionFunded (this matches your previous attempt).
  // If commissionFunded is actually something else (e.g., 'value' per lot), change logic accordingly.
  const stopLossLotsPA =
    commissionFunded !== 0 ? inputs.INP_stopLossTrade / commissionFunded : 0
  const OUTPA_stopLossPoints = stopLossLotsPA * POINTS_PER_LOT_PROP

  // REAL account stop loss lots: template.stopLossRA / template.commissionReal
  const stopLossRA_num = parseEuropeanNumber(template.stopLossRA) ?? 0
  const OUTRA_stopLossLots =
    commissionReal !== 0 ? stopLossRA_num / commissionReal : 0

  return {
    OUTPA_targetProfitPoints,
    OUTPA_stopLossPoints,
    OUTRA_stopLossLots,
  }
}
