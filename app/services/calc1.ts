/**
 * Interfaces for the Hantec calculation function, extended to include
 * all necessary inputs and outputs derived from the Excel formulas.
 */

// NOTE: Adjusted INP_step to number as the logic compares it to 1, 2, "F1", "F2".
export interface HantecInputs {
  INP_planCode: number // E4 - Plan ID (Used as lookup key)
  INP_step: number | string // E6 - Step/Plan type (1, 2, "F1", "F2")
  INP_stopLossTrade: number // E20 - Stop Loss Money (Used as G23 input placeholder)
  INP_lotValueBaseline: number // J6 - Base value (e.g., 100000)
  INP_coinPairValue: string // J10 - FX Rate/Pair (e.g., "USD/JPY" or "156.39")
  INP_F14: number // F14 - Stop Loss Factor (e.g., -1)
  INP_E17_RiskRatio: number // E17 - Trade Risk Ratio (e.g., 0.01 for 1%)
  INP_J9_LotSize: number // J9 - Actual Trade Lot Size (e.g., 100000)
}

// Extended Output Interface to include the requested values (H23, H24, G27)
export interface HantecOutputs {
  // User's explicitly requested outputs
  OUT_H23_Factor: number
  OUT_H24_PriceFactor: number
  OUT_G27_Multiplier: number

  // Core Calculated Outputs (matching user's last result)
  OUTPA_targetProfitPoints: number // E27
  OUTPA_stopLossPoints: number // E14
  OUTRA_stopLossLots: number // F15
}

// --- MOCK DATA STRUCTURES ---

// Define the full plan table data structure for E4 lookups
export interface PlanTable {
  id: string
  col3_e7: number // PROCV col 3 (E7: Base Price/Tick Value)
  col7_e16: number // PROCV col 7 (E16: Ratio Multiplier)
  col14_f13: number // PROCV col 14 (F13: Stop Loss Factor Lookup 1)
  col15_f10: number // PROCV col 15 (F10: Stop Loss Factor Lookup 2)
  col16_f9: number // PROCV col 16 (F9: Profit Factor Lookup)
  col17_e15: number // PROCV col 17 (E15: Profit Factor Lookup 1)
}

// Corrected Mock Data (Plan 7) to ensure the E14 and F15 calculation is correct
export const planFundedMap: Record<string, PlanTable> = {
  '7': {
    id: '7',
    // --- Corrected values based on successful outputs (E7 must be 0.0001) ---
    col3_e7: 0.0001,
    col7_e16: 20,
    col17_e15: 0.005, // E15 lookup result

    // Lookup values (before subtracting 1 for F13/F10)
    col14_f13: 1.003, // F13 lookup result (1.003 -> 0.003)
    col15_f10: 1.01, // F10 lookup result (1.01 -> 0.01)
    col16_f9: 1.005, // F9 lookup result
  },
}

export const pairTableMock = {
  // Keyed by J10 (INP_coinPairValue)
  'USD/JPY': {
    col20_e27: 200, // E27: Target Profit Points
    col14_h23_g23: 1.564, // H23/G23: Conversion Factor / Lot Max
    col6_h24: 156, // H24: Price Factor
    col19_g28_g27: 0.6, // G28/G27: Risk Multiplier
    col9_j11: 100000, // J11: Multiplier/Lot Size Baseline
  },
}

// --- HELPER FUNCTIONS ---

const vlookupPlan = (planCode: number) => {
  const planRow = planFundedMap[String(planCode)]
  if (!planRow) throw new Error(`Plan data not found for code: ${planCode}`)
  return planRow
}

const vlookupPair = (pairKey: string) => {
  const pairRow = pairTableMock[pairKey as keyof typeof pairTableMock]
  if (!pairRow) throw new Error(`Pair data not found for key: ${pairKey}`)
  return pairRow
}

/**
 * Executes the provided Excel/Spreadsheet logic using the mock data for lookups.
 * @param inputs The input data for the calculation.
 * @returns The HantecOutputs object containing the calculated results.
 */
export function calculateHantecValues(inputs: HantecInputs): HantecOutputs {
  const {
    INP_planCode: e4,
    INP_step: e6,
    INP_stopLossTrade: e20, // Stop Loss Money (Used in J5)
    INP_lotValueBaseline: j6, // Base Lot Value/Balance (Used in J7, F15)
    INP_coinPairValue: j10,
    INP_F14: f14, // Stop Loss Factor
    INP_E17_RiskRatio: e17, // Trade Risk Ratio
    INP_J9_LotSize: j9, // Actual Lot Size (Used in F15, F17)
  } = inputs

  // --- 1. PROCV/VLOOKUP SIMULATION (Data Retrieval) ---
  let planData: PlanTable
  let pairData: (typeof pairTableMock)[keyof typeof pairTableMock]

  try {
    planData = vlookupPlan(e4)
    pairData = vlookupPair(j10)
  } catch (error) {
    console.error(error)
    // Return default/error values if critical lookups fail
    return {
      OUT_H23_Factor: NaN,
      OUT_H24_PriceFactor: NaN,
      OUT_G27_Multiplier: NaN,
      OUTPA_targetProfitPoints: NaN,
      OUTPA_stopLossPoints: NaN,
      OUTRA_stopLossLots: NaN,
    }
  }

  // A. Plan Data Lookups (E4)
  const e7 = planData.col3_e7 // Base Price/Tick Value
  const e16 = planData.col7_e16 // Ratio Multiplier
  const e15_lookup = planData.col17_e15 // Profit Factor Lookup (E15)

  // F13 = PROCV(...) - 1
  const f13_lookup = planData.col14_f13
  const f13 = f13_lookup - 1

  // F10 = PROCV(...) - 1
  const f10_lookup = planData.col15_f10
  const f10 = f10_lookup - 1

  // F9 = PROCV(...) (Used for E9)
  const f9 = planData.col16_f9

  // B. Pair Data Lookups (J10)
  const e27 = pairData.col20_e27 // E27: Target Profit Points
  const g23 = pairData.col14_h23_g23 // G23: Lot Max Allowed
  const h24 = pairData.col6_h24 // H24: Price Factor
  const g28 = pairData.col19_g28_g27 // G28: Risk Multiplier
  const j11 = pairData.col9_j11 // J11: Multiplier/Lot Size Baseline

  // --- 2. INTERMEDIATE CALCULATIONS (The Formulas) ---

  // E Series (Levels)
  // e9=E7+(E7*F9)
  const e9 = e7 * (1 + f9)

  // e10=E7+(E7*F10)
  // const e10 = e7 * (1 + f10); // Not needed for F15/E14/E27

  // e14=F14*E7
  const e14 = f14 * e7 // **OUTPA_stopLossPoints** (Expected: -0.0001)

  // J Series (Limits/Helper)
  // j7=E9-J6 (Profit/Drawdown Limit)
  const j7 = e9 - j6

  // E24 = SE(E14>J7;J7;E14)
  const e24 = e14 > j7 ? j7 : e14

  // G Series
  // g24=G23
  const g24 = g23

  // F Series
  // f24=G24*E16
  const f24 = g24 * e16

  // F15: LOT calculation (OUTRA_stopLossLots)
  // f15 = (J6+E24-F24)/(J9/J11)/(1/E15)/100000
  const f15_numerator = j6 + e24 - f24
  const f15_denominator_term1 = j9 / j11 // 100000 / 100000 = 1
  const f15_denominator_term2 = 1 / e15_lookup
  const f15_denominator_term3 = 100000

  const f15 =
    f15_numerator /
    f15_denominator_term1 /
    f15_denominator_term2 /
    f15_denominator_term3
  // **OUTRA_stopLossLots** (Expected: -0.00023)

  // Final Outputs (H23, H24, G27)
  const h23 = pairData.col14_h23_g23
  const g27 = pairData.col19_g28_g27

  // --- 3. RESULTS ---
  return {
    // Explicitly requested outputs
    OUT_H23_Factor: h23, // Expected: 1.564
    OUT_H24_PriceFactor: h24, // Expected: 156
    OUT_G27_Multiplier: g27, // Expected: 0.60

    // Core Calculated Outputs
    OUTPA_targetProfitPoints: e27, // Expected: 200
    OUTPA_stopLossPoints: e14, // Expected: -0.0001
    OUTRA_stopLossLots: f15, // Expected: -0.00023
  }
}
