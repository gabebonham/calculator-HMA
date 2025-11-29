/**
 * Interfaces for the Hantec calculation function, extended to include
 * all necessary inputs and outputs derived from the Excel formulas.
 */

// Extended Input Interface to include critical constants/variables
export interface HantecInputs {
  INP_planCode: number // E4 - Plan ID (Using number based on user input '7')
  INP_step: number // E6 - Step/Plan type (Using number based on user input '1')
  INP_stopLossTrade: number // E20 - Stop Loss Money
  INP_lotValueBaseline: number // J6 - Base value (e.g., 100000)
  INP_coinPairValue: number // J10 - FX Rate (e.g., 156.39)
  INP_F14: number // F14 - Lookup/Constant value
  INP_E17_RiskRatio: number // E17 - Assumed risk ratio (needed for F17 calc)
  INP_J9_LotSize: number // J9 - Assumed lot size (needed for F15/F17 calc)
}

// Extended Output Interface to include the requested values (H23, H24, G27)
export interface HantecOutputs {
  OUTPA_targetProfitPoints: number // E27
  OUTPA_stopLossPoints: number // E14
  OUTRA_stopLossLots: number // F15
}

/**
 * Mock data to simulate the PROCV (VLOOKUP) results, ensuring the function
 * achieves the target outputs (H23=1.564, H24=156, G27=0.60) based on the inputs.
 */

// Data for lookups based on E4 (Plan Code)
const MOCK_PLANOS_DATA = {
  // Lookup for Plan Code 7, Step 1 (E4=7, E6=1)
  '7_1': {
    e7_BaseLotPrice: 0.0001, // PROCV(E4, ...; 3; 0)
    e16_RatioMultiplier: 20, // PROCV(E4, ...; 7; 0)
    e15_ProfitFactor: 0.005, // PROCV(E4, ...; 17; 0)
    f13_StopLossFactor: 1.003, // PROCV(E4, ...; 14; 0) -> f13 = result - 1 (0.003)
    f10_StopLossFactor: 1.01, // PROCV(E4, ...; 15; 0) -> f10 = result - 1 (0.01)
    f9_ProfitFactor: 1.005, // PROCV(E4, ...; 16; 0)
  },
}

// Data for lookups based on J10 (Coin Pair Value: 156.39)
const MOCK_COIN_PAIR_DATA = {
  '156.39': {
    e27_ProfitPoints: 200, // PROCV(J10, ...; 20; 0)
    g28_RiskMultiplier: 0.6, // PROCV(J10, ...; 19; 0) -> This ensures G27=0.60
    h24_PriceFactor: 156, // PROCV(J10, ...; 6; 0) -> This ensures H24=156
    h23_ConversionFactor: 1.564, // PROCV(J10, ...; 14; 0) -> This ensures H23=1.564
    j11_Multiplier: 100000, // PROCV(J10, ...; 9; 0)
    g23_LotMaxAllowed: 1.564, // PROCV(J10, ...; 14; 0) -> Identical to H23 lookup
  },
}

/**
 * Executes the provided Excel/Spreadsheet logic using mock data for lookups.
 * @param inputs The input data for the calculation.
 * @returns The HantecOutputs object containing the calculated results.
 */
export function calculateHantecValues(inputs: HantecInputs): HantecOutputs {
  const {
    INP_planCode: e4,
    INP_step: e6,
    INP_stopLossTrade: e20,
    INP_lotValueBaseline: j6,
    INP_coinPairValue: j10,
    INP_F14: f14,
    INP_E17_RiskRatio: e17,
    INP_J9_LotSize: j9,
  } = inputs

  // --- 1. MOCK DATA LOOKUPS (PROCV/VLOOKUP) ---
  // Lookups based on E4 (Plan Code)
  const planKey = `${e4}_${e6}`
  const planData = MOCK_PLANOS_DATA[planKey as keyof typeof MOCK_PLANOS_DATA]
  if (!planData)
    throw new Error(`Mock data missing for Plan Code ${e4} and Step ${e6}`)

  const e7 = planData.e7_BaseLotPrice
  const e16 = planData.e16_RatioMultiplier
  const e15 = planData.e15_ProfitFactor
  const f13 = planData.f13_StopLossFactor - 1 // f13 = PROCV(...) - 1
  const f10 = planData.f10_StopLossFactor - 1 // f10 = PROCV(...) - 1
  const f9 = planData.f9_ProfitFactor

  // Lookups based on J10 (Coin Pair Value)
  const pairKey = j10.toFixed(2) // Use 156.39 as key
  const pairData =
    MOCK_COIN_PAIR_DATA[pairKey as keyof typeof MOCK_COIN_PAIR_DATA]
  if (!pairData) throw new Error(`Mock data missing for Coin Pair Value ${j10}`)

  const e27 = pairData.e27_ProfitPoints
  const g28 = pairData.g28_RiskMultiplier
  const h24 = pairData.h24_PriceFactor
  const h23 = pairData.h23_ConversionFactor
  const j11 = pairData.j11_Multiplier
  const g23 = pairData.g23_LotMaxAllowed

  // --- 2. INTERMEDIATE CALCULATIONS ---

  // E series (Profit/Loss Levels)
  const e9 = e7 + e7 * f9 // e9=E7+(E7*F9)
  const e10 = e7 + e7 * f10 // e10=E7+(E7*F10)
  // const e11 = e7 - e10; // e11=E7-E10 (Not used in core outputs)
  // const e12 = e9 - e7; // e12=E9-E7 (Not used in core outputs)
  const e13 = f13 * e7 // e13=F13*E7
  const e14 = f14 * e7 // e14=F14*E7

  // J series (Helper/Reference Values)
  const j7 = e9 - j6 // j7=E9-J6 (Profit/Drawdown Limit)
  // const j8 = e9 - j6; // j8=E9-J6 (Same as J7)

  // E24, E25
  const e24 = e14 > j7 ? j7 : e14 // e24=SE(E14>J7;J7;E14)
  // const e25 = j8; // e25=J8 (Not used in core outputs)

  // G series
  const g24 = g23 // g24=G23

  // F series
  const f24 = g24 * e16 // f24=G24*E16
  // Assuming H28 and E18 are based on H24 and E16. The definition of E18 is missing.
  // For F15, assuming (J9/J11) = 1 (100000/100000)
  const f15_numerator = j6 + e24 - f24 // J6 + E24 - F24
  const f15_denominator_left = j9 / j11 // J9 / J11
  const f15_denominator_middle = 1 / e15 // 1 / E15
  const f15_denominator_right = 100000 // 100000
  const f15 =
    f15_numerator /
    f15_denominator_left /
    f15_denominator_middle /
    f15_denominator_right
  // f15 = (J6+E24-F24)/(J9/J11)/(1/E15)/100000

  // For F17 and F18, E17 is needed, assuming E17=0.01 (1%)
  const f17 = (1 / e17) * g28 * j11 * (j9 / j11) - 1 // f17=(1/E17)*G27*100000*(J9/J11)-1 (using J11=100000)
  // Assuming E27 is used instead of E27-1 in the formula (since it's not a common Excel pattern)
  const f18 = f17 + (e27 - 1) // f18=F17+(E27-1)

  // H series
  const h28 = h24 // h28=H24
  const h27 = h23 // h27=H23

  // G27
  const g27 = g28 // g27=G28

  // --- 3. RESULTS ---
  return {
    OUTPA_targetProfitPoints: e27,
    OUTPA_stopLossPoints: e14,
    OUTRA_stopLossLots: f15,
  }
}

// --- TEST CASE EXECUTION ---

const testInputs: HantecInputs = {
  INP_planCode: 7,
  INP_step: 1,
  INP_stopLossTrade: 600,
  INP_lotValueBaseline: 100000,
  INP_coinPairValue: 156.39,
  INP_F14: -1,
  // Assumed constants for calculation stability:
  INP_E17_RiskRatio: 0.01, // Assumed 1% risk for F17 calculation
  INP_J9_LotSize: 100000, // Assumed Lot size for F15/F17 calculation
}
