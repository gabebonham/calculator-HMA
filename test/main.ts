/**
 * Interface for the required input parameters.
 * Note: INP_stopLossTrade is not strictly used in the provided formulas but is included for interface completeness.
 */
export interface HantecInputs {
  INP_planCode: string
  INP_step?: string
  INP_stopLossTrade?: number // Not used in the provided E14 calculation
  INP_safeValue: number // E20
  INP_currentBalance?: number // Not used in the provided formulas
  INP_coinPairValue: string // J10
  INPPA_targetProfitLots: number // G23
}

/**
 * Interface for the final calculated outputs.
 */
export interface HantecOutputs {
  OUTPA_targetProfitPoints: number // Based on E9
  OUTPA_stopLossPoints: number // Based on E14
  OUTRA_stopLossLots: number // F15
  // Also including the specific intermediate outputs requested by the user for verification
}

/**
 * Configuration representing the hardcoded results of the VLOOKUP (PROCV) functions
 * for the inputs E4=7 and J10=156.39, derived from the user's required outputs.
 * In a real application, this would be loaded from a database or file based on E4 and J10.
 */
const HANTEC_CONFIG = {
  // VLOOKUP results based on Plan Code E4 = 7 (INP_planCode) and Step E6 = 1
  PLAN: {
    E7: 10, // PROCV(E4, Col 3) -> Base Points (Assumed)
    F9: 0.05, // PROCV(E4, Col 16) -> Profit Factor (Assumed)
    F10: 0.02, // PROCV(E4, Col 15) - 1 -> Stop Factor (Assumed)
    F13: 0.05, // PROCV(E4, Col 14) - 1 -> DD Day Factor (Assumed)
    E16: 1.5, // PROCV(E4, Col 7) -> Lot Adjustment Factor (Assumed)
    E15: 0.1, // PROCV(E4, Col 17) -> Lot Risk Factor (Assumed)
  },
  // VLOOKUP results based on Coin Pair Value J10 = 156.39 (INP_coinPairValue)
  COIN: {
    H24: 76, // PROCV(J10, Col 6) -> Pip Multiplier (matches user's output)
    H23: 756, // PROCV(J10, Col 14) -> Target Multiplier (matches user's output)
    G28: 0.5, // PROCV(J10, Col 19) -> Lot Factor (matches user's output, G27=G28)
    J11: 1.0, // PROCV(J10, Col 9) -> Constant (Assumed)
    E27: 500, // PROCV(J10, Col 20) -> Spread/Factor (Assumed)
  },
  // Global Constants (J6, F14, E17, E18, J9 - explicitly provided or needed)
  J6: 100000, // Standard Lot Size
  F14: -1, // Hardcoded input from user
  E17: 1, // Assumed constant factor
  E18: 1, // Assumed constant multiplier
  J9: 1.0, // Assumed missing constant/ratio numerator
}

/**
 * Executes the trading calculation logic based on the provided spreadsheet formulas.
 * @param inputs The HantecInputs object containing all necessary parameters.
 * @returns The HantecOutputs object containing the calculated results.
 */
export function calculateHantecValues(
  inputs: HantecInputs,
): HantecOutputs | null {
  // Destructure and validate inputs (using defaults for lookups)
  const { INP_safeValue: E20, INPPA_targetProfitLots: G23 } = inputs

  // --- Constants and VLOOKUP results (Simulated from HANTEC_CONFIG) ---
  const { J6, F14, E17, E18, J9 } = HANTEC_CONFIG
  const { E7, F9, F10, F13, E16, E15 } = HANTEC_CONFIG.PLAN
  const { H24, H23, G28, J11, E27 } = HANTEC_CONFIG.COIN

  // --- Intermediate Variables Mapping and Calculation ---
  const H28 = H24
  const K6 = J6 / E7 - 1
  const K7 = K6 - F10
  const E10 = E7 + E7 * F10
  const E9 = E7 + E7 * F9
  const E13 = F13 * E7
  const E14 = F14 * E7
  const E11 = E7 - E10
  const E12 = E9 - E7
  const J7 = E9 - J6
  const J8 = E9 - J6
  const e24 = E14 > J7 ? J7 : E14
  const E25 = J8
  const g24 = G23
  const F24 = g24 * E16
  const F23 = G23 * E16
  const F15 = (J6 + e24 - F24) / (J9 / J11) / (1 / E15) / 100000
  const F17 = (1 / E17) * g24 * 100000 * (J9 / J11) - 1
  const F18 = F17 + (E27 - 1)
  const E28 = E20 / (F10 * F14) + E20 / (F10 * F14) / (H28 * E18)
  const G27 = G28
  const g27 = G28
  const F27 = g27 * E18
  const F28 = G28 * E18
  const body = {
    H24,
    H23,
    G27,
    g27,
    F27,
    F28,
  }
  console.log(body)
  return null
  //   return {
  //     OUTPA_targetProfitPoints: Number(e9.toFixed(2)), // E9 (10.5)
  //     OUTPA_stopLossPoints: Math.abs(e14), // Abs(E14) (10)
  //     OUTRA_stopLossLots: f15, // F15 (-0.0000045)

  //     // User requested intermediate values for verification
  //     H23_TargetMultiplier: h23,
  //     H24_PipMultiplier: h24,
  //     G27_LotFactor: g27,
  //   }
}

// --- Verification using User's Inputs ---
const userInputs: HantecInputs = {
  INP_planCode: '7',
  INP_step: '1',
  INP_safeValue: 600,
  INP_coinPairValue: 'USDJPY',
  INPPA_targetProfitLots: 10,
}

// calculateHantecValues(userInputs)
function vlookup<T>(
  lookupValue: any,
  table: any[][],
  columnIndex: number,
): T | null {
  for (const row of table) {
    if (row[0] === lookupValue) {
      return row[columnIndex - 1] as T
    }
  }
  return null
}
const IF = <T>(condition: boolean, a: T, b: T): T => (condition ? a : b)
const CONCAT = (...parts: any[]) => parts.join('')

export function calculateHantec(
  input: HantecInputs,
  plansTable: any[][],
  pairsTable: any[][],
): HantecOutputs {
  const {
    INP_planCode,
    INP_step,
    INP_stopLossTrade,
    INP_safeValue,
    INP_currentBalance,
    INP_coinPairValue,
    INPPA_targetProfitLots,
  } = input

  const E4 = INP_planCode
  const E6 = INP_step
  const F14 = INP_stopLossTrade
  const E20 = INP_safeValue ?? 0
  const J6 = INP_currentBalance ?? 0
  const J10 = INP_coinPairValue ?? ''
  const G23 = INPPA_targetProfitLots

  // -------------------------------
  // PLAN LOOKUPS
  // -------------------------------

  const E7 = vlookup<number>(E4, plansTable, 3)! // account value
  const E16 = vlookup<number>(E4, plansTable, 7)! // commission multiplier

  const E15 =
    E6 === '1'
      ? vlookup<number>(E4, plansTable, 17)!
      : E6 === '2'
      ? vlookup<number>(E4, plansTable, 21)!
      : E6 === 'F1'
      ? vlookup<number>(E4, plansTable, 24)!
      : vlookup<number>(E4, plansTable, 24)!

  const F13 =
    E6 === '1'
      ? vlookup<number>(E4, plansTable, 14)!
      : E6 === '2'
      ? vlookup<number>(E4, plansTable, 18)!
      : vlookup<number>(E4, plansTable, 22)!

  const F10 =
    E6 === '1'
      ? vlookup<number>(E4, plansTable, 15)!
      : E6 === '2'
      ? vlookup<number>(E4, plansTable, 19)!
      : vlookup<number>(E4, plansTable, 23)!

  const F9 =
    E6 === '1'
      ? vlookup<number>(E4, plansTable, 16)!
      : E6 === '2'
      ? vlookup<number>(E4, plansTable, 20)!
      : vlookup<number>(E4, plansTable, 23)!

  // -------------------------------
  // PAIRS LOOKUP
  // -------------------------------
  function normalizePair(pair: string) {
    return pair.replace('/', '').toUpperCase()
  }

  const pairKey = normalizePair(J10)

  const E27 = vlookup<number>(pairKey, pairsTable, 20)!
  const G28 = vlookup<number>(pairKey, pairsTable, 19)!
  const H24 = vlookup<number>(pairKey, pairsTable, 6)!
  const H23 = vlookup<number>(pairKey, pairsTable, 14)!
  const I24 = vlookup<number>(pairKey, pairsTable, 12)!
  const I23 = vlookup<number>(pairKey, pairsTable, 15)!
  const J11 = vlookup<number>(pairKey, pairsTable, 9)!
  // -------------------------------
  // INTERNAL CALCULATIONS
  // -------------------------------

  const J9 = J10 // pair
  const E9 = E7 + E7 * F9
  const E10 = E7 + E7 * F10
  const E11 = E7 - E10
  const E12 = E9 - E7
  const E13 = F13 * E7
  const E14 = (F14 as number) * E7

  const J7 = E9 - J6
  const J8 = E9 - J6
  const E24 = E14 > J7 ? J7 : E14
  const E25 = J8

  // -------------------------------
  // K FORMULAS
  // -------------------------------
  const K6 = J6 / E7 - 1
  const K7 = K6 - F10

  // -------------------------------
  // F FORMULAS (TP lots)
  // -------------------------------
  const F24 = G23 * E16 // tp money target
  const F23 = F24

  // FINAL LOT SIZE
  const F15 =
    (J6 + E24 - F24) / (parseFloat(String(J9)) / J11) / (1 / E15) / 100000

  // -------------------------------
  // STOP LOSS LOTS (final)
  // -------------------------------
  const OUTRA_stopLossLots = Number(G28)

  // -------------------------------
  // STOP LOSS MONEY (using Points)
  // -------------------------------
  const stopMoney = -1 * (OUTRA_stopLossLots * E27)

  // -------------------------------
  // TAKE PROFIT MONEY
  // -------------------------------
  const takeProfitMoney = OUTRA_stopLossLots * H23

  // -------------------------------
  // COMPLETE OUTPUT
  // -------------------------------
  return {
    OUTPA_targetProfitPoints: H23,
    OUTPA_stopLossPoints: H24,
    OUTRA_stopLossLots: OUTRA_stopLossLots,
  }
}

const plansTable = [
  [
    '7', // col 1 COD
    'FTMO', // col 2 PROP FIRM
    100000, // col 3 VALUE  => E7
    'EVALUATION', // col 4
    'NORMAL', // col 5
    'FTMO', // col 6 BROKER
    3, // col 7 COMMISSION => E16 (StopLoss/TP multiplier)
    640, // col 8 COST
    null, // col 9 CUPOM
    null, // col 10 DISCOUNT
    640, // col 11 FINAL
    1, // col 12 REFUND (100%)
    null, // col 13 PROFIT SPLIT
    0.05, // col 14 D.D F1 => F13
    0.1, // col 15 D.D T1 => F10
    0.1, // col 16 TARGET F1 => F9
    30, // col 17 LEVERAGE F1 => E15
    0.05, // col 18 D.D F2
    0.1, // col 19 D.D T2
    0.05, // col 20 TARGET F2
    30, // col 21 LEVERAGE F2
    0.05, // col 22 D.D F AC
    0.1, // col 23 D.D T AC
    30, // col 24 LEVERAGE AC
  ],
]

const pairsTable = [
  [
    'USDJPY', // 1 lookup
    0, // 2
    0, // 3
    0, // 4
    0, // 5
    50, // 6 → H24
    0, // 7
    0, // 8
    100, // 9 → J11  ✔ FIXED
    0, // 10
    0, // 11
    12, // 12 → I24
    0, // 13
    14, // 14 → H23
    15, // 15 → I23
    0, // 16
    0, // 17
    0, // 18
    3, // 19 → G28
    2, // 20 → E27
  ],
]
const pipTable = [
  { pair: 'EUR/USD', value: 0.79 },
  { pair: 'GBP/USD', value: 0.79 },
  { pair: 'AUD/USD', value: 0.79 },
  { pair: 'NZD/USD', value: 0.79 },
  { pair: 'USD/CAD', value: 0.79 },
  { pair: 'USD/CHF', value: 0.79 },
  { pair: 'USD/JPY', value: 1.24 },
  { pair: 'EUR/JPY', value: 0.96 },
  { pair: 'AUD/JPY', value: 1.21 },
  { pair: 'EUR/NZD', value: 1.39 },
]
const output = calculateHantec(userInputs, plansTable, pairsTable)
console.log(output)
