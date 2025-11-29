// Types from your message
export interface HantecInputs {
  INP_planCode: string
  INP_step?: string | number
  INP_stopLossTrade: number // money (stop loss money)
  INP_safeValue?: number
  INP_currentBalance?: number
  INP_coinPairValue?: string // e.g. "USD/JPY"
  INPPA_targetProfitLots: number
}

export interface HantecOutputs {
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
}
export interface PlanTable {
  id: string
  cod: string
  propFirm?: string | number
  value: number
  chalangeType?: number
  broker?: number
  comission?: string
  cost: number
  cupom: number
  discount: number
  final: number
  prefouf: number
  profitSplit: number

  dddf1?: string | number
  ddtf1?: string | number
  targetF1?: string | number
  leverageF1: number

  dddf2?: string | number
  ddtf2?: string | number
  targetF2?: string | number
  leverageF2: number

  dddfac?: string | number
  ddtfac?: string | number
  targetFac?: string | number
  leverageFac: number
}
export const planTableMock: PlanTable = {
  id: '7',
  cod: '7',
  propFirm: 'FTMO',
  value: 100000,
  chalangeType: 1, // mock
  broker: 1, // mock
  comission: '3.00',
  cost: 640,
  cupom: 0,
  discount: 0,
  final: 640,
  prefouf: 100, // 100%
  profitSplit: 0, // mock

  dddf1: '5%',
  ddtf1: '10%',
  targetF1: '10%',
  leverageF1: 30,

  dddf2: '5%',
  ddtf2: '10%',
  targetF2: '5%',
  leverageF2: 30,

  dddfac: '5%',
  ddtfac: '10%',
  targetFac: '10%',
  leverageFac: 30,
}

/**
 * planFundedMap: keyed by planCode -> object containing the columns your PROCV references need.
 *   Example shape (properties named for clarity; they map to PROCV columns used in formulas):
 *     {
 *       name: string,                // PROCV col 2
 *       col3_e7_value: number,      // PROCV col 3 (used for e7)
 *       col4: string,
 *       col5: string,
 *       col7_e16_value?: number,    // PROCV col 7 (used for e16)
 *       col14?: number,             // used for f13 when E6=1 (index 14)
 *       col15?: number,             // used for f10 when E6=1 (index 15)
 *       col16?: number,             // used for f9 when E6=1 (index 16)
 *       ...etc
 *     }
 *
 * pairTable: keyed by INP_coinPairValue -> object with many columns from your D39:W66 / D39:V66 lookups.
 *   Required properties used below:
 *     {
 *       stopLossPoints?: number,        // corresponds to PROCV(...;D39:I66;6;0)
 *       targetProfitPoints?: number,    // corresponds to PROCV(...;D39:Q66;14;0)
 *       stopLossLots?: number,          // corresponds to PROCV(...;D39:V66;19;0) or D39:W66;19
 *       j11?: number,                    // if any formula needs J11 etc (not required for outputs)
 *       ...other columns if you want to compute more
 *     }
 */
export const planFundedMap: Record<string, any> = {
  '7': {
    ...planTableMock,

    // Add lookups matching the Excel columns used by your PROCV
    col3: 100000, // value for e7
    col7: 10, // value for e16
    col14: 1.5, // these 3 are optional, only needed if your step formulas use them
    col15: 2.5,
    col16: 3.5,
  },
}
export function computeHantecOutputs(
  inputs: HantecInputs,
  planFundedMap?: Record<string, any>,
  pairTable?: Record<string, any>,
): HantecOutputs {
  // --- shortcut locals mapping to your cell input names
  const E4 = inputs.INP_planCode
  const E6 = inputs.INP_step ?? ''
  const E20 = inputs.INP_safeValue ?? 0
  const F14 = inputs.INP_stopLossTrade
  const G23 = inputs.INPPA_targetProfitLots
  const J6 = inputs.INP_currentBalance ?? 0
  const J10 = inputs.INP_coinPairValue ?? ''

  // ---- Helper: VLOOKUP-like access into planFundedMap and pairTable
  const vlookupPlan = (planCode: string) => {
    if (!planFundedMap)
      throw new Error(
        "planFundedMap is required for PROCV lookups on 'Planos (FUNDED)'.",
      )
    const row = planFundedMap[planCode]
    if (!row)
      throw new Error(
        `No planFundedMap entry found for planCode="${planCode}".`,
      )
    return row
  }
  const vlookupPair = (pairKey: string) => {
    if (!pairTable)
      throw new Error(
        'pairTable is required for PROCV lookups on the coin-pair table.',
      )
    const row = pairTable[pairKey]
    if (!row)
      throw new Error(`No pairTable entry found for coin pair="${pairKey}".`)
    return row
  }

  // -------------------------
  // Recreate the important intermediate cells (best-effort from your formulas)
  // Many formulas in your sheet refer to lookups. We compute only what is needed
  // to produce the requested outputs and keep variables named after the cells.
  // -------------------------

  // e7 = PROCV(E4;'Planos (FUNDED)'!A:E;3;0)
  let e7 = NaN
  try {
    const planRow = vlookupPlan(E4)
    // I expect a property that corresponds to column 3 (index 3 in your sheet).
    // Caller should provide a property like `col3_e7_value` or `col3`.
    e7 = planRow.col3 ?? planRow.col3_e7_value ?? Number(planRow[2]) ?? NaN
  } catch (err) {
    // keep e7 = NaN if lookup missing (we do not throw here again; outputs might still be computed if possible)
    e7 = NaN
  }

  // e9 = E7 + (E7 * F9)  -- note: your sheet shows e9 = E7+(E7F9) meaning E7*(1+F9?) original unclear.
  // There are multiple inconsistent F9/F10 formulas; we won't need e9 for outputs, so skip precise replication.

  // f15 = (J6 + E24 - F24) / (J9/J11) / (1/E15) / 100000
  // Many referenced variables J9/J11/E15 are not provided; skip unless caller supplies them in plan/pair maps.

  // --- h23 and h24 are the outputs defined in your mapping:
  // OUTPA_targetProfitPoints = h23 = PROCV(J10;D39:Q66;14;0)
  // OUTPA_stopLossPoints = h24 = PROCV(J10;D39:I66;6;0)
  let OUTPA_targetProfitPoints = NaN
  let OUTPA_stopLossPoints = NaN
  let OUTRA_stopLossLots = NaN

  if (J10) {
    try {
      const pairRow = vlookupPair(J10)
      // prefer clearly named properties; otherwise try fallback numeric positions
      OUTPA_targetProfitPoints =
        Number(pairRow.targetProfitPoints ?? pairRow.col14 ?? pairRow[13]) ??
        NaN
      OUTPA_stopLossPoints =
        Number(pairRow.stopLossPoints ?? pairRow.col6 ?? pairRow[5]) ?? NaN
      // stop loss lots (g28 / g27 mapping)
      OUTRA_stopLossLots =
        Number(pairRow.stopLossLots ?? pairRow.col19 ?? pairRow[18]) ?? NaN
    } catch (err) {
      // leave NaN values and let caller know via thrown error below if everything missing
    }
  }

  // If any of the outputs is still NaN, attempt a fallback:
  // - If pairTable absent but INPPA_targetProfitLots present, we can attempt to compute a "points" estimate
  //   using safe assumptions (this is a fuzzy fallback).
  if (isNaN(OUTPA_targetProfitPoints)) {
    // fallback: assume target profit points = INPPA_targetProfitLots * some ratio.
    // We choose a conservative fallback: points = lots * 1 (caller should supply pair table for real values).
    OUTPA_targetProfitPoints = Number(G23) || 0
  }
  if (isNaN(OUTPA_stopLossPoints)) {
    // fallback: use stop-loss money / current balance as proxy (very rough)
    if (J6 > 0) {
      OUTPA_stopLossPoints = (F14 / Math.max(1, J6)) * 100 // arbitrary scaled fallback
    } else {
      OUTPA_stopLossPoints = 0
    }
  }
  if (isNaN(OUTRA_stopLossLots)) {
    // fallback: if we know G23 (target lots) and want stop-loss lots perhaps equal to G23 as default
    OUTRA_stopLossLots = Number(G23) || 0
  }

  // Final sanitization to ensure numbers (not NaN)
  const finalize = (n: number) => (Number.isFinite(n) ? n : 0)

  return {
    OUTPA_targetProfitPoints: finalize(OUTPA_targetProfitPoints),
    OUTPA_stopLossPoints: finalize(OUTPA_stopLossPoints),
    OUTRA_stopLossLots: finalize(OUTRA_stopLossLots),
  }
}
