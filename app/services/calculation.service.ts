// Tipagens simples
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
type PlanRow = Record<string, number | string | null>
type Inputs = Record<string, number | string | null>
type Constants = Record<string, number | string | null>

/**
 * vlookup básico: procura planCode na coluna 'A' do plans e retorna a coluna index (1-based)
 * plans: array de objetos onde a chave 'A' corresponde ao código e colunas seguintes 'B','C',... estão disponíveis.
 */
function vlookup(
  plans: PlanRow[],
  lookupValue: string | number | null,
  returnColIndex: number,
) {
  if (lookupValue === null || lookupValue === undefined) return null
  const key = String(lookupValue)
  const row = plans.find((r) => String(r['A']) === key)
  if (!row) return null
  // returnColIndex: 1 -> 'A', 2 -> 'B', ...
  const colKey = String.fromCharCode('A'.charCodeAt(0) + (returnColIndex - 1))
  return row[colKey] ?? null
}

/**
 * Converte as fórmulas da aba "HANTEC (2)" (linha-modelo) em cálculos JS.
 * - rowInputs: valores da linha (colunas referenciadas, ex: E, F, ...).
 * - plans: conteúdo da aba "Planos (FUNDED)" representado como array de objetos com chaves 'A','B','C',...
 * - constants: valores fixos da planilha (ex: { H27: 0.123 })
 *
 * Retorna um objeto com os campos calculados (mesmos nomes de coluna usados na planilha).
 */
export function calculateHantecRow(
  rowInputs: Inputs,
  plans: PlanRow[],
  constants: Constants,
) {
  const out: Record<string, number | string | null> = {}

  // --- helper para números seguros
  const N = (v: any) =>
    v === null || v === undefined || v === '' ? 0 : Number(v)

  // Mapeamentos diretos / primeiras referências
  // U4 = E4
  out.U = rowInputs['E'] ?? null

  // V4..Z4 e AA4..AP4 são VLOOKUP sobre U4 com colunas diferentes na aba Planos (FUNDED)
  const planCode = out.U
  out.V = vlookup(plans, planCode, 2) // =VLOOKUP(U4,'Planos (FUNDED)'!A:B,2,0)
  out.W = vlookup(plans, planCode, 3) // ...A:C,3
  out.X = vlookup(plans, planCode, 4) // ...A:D,4
  out.Y = vlookup(plans, planCode, 5) // ...A:E,5
  out.Z = vlookup(plans, planCode, 6) // ...A:F,6
  out.AA = vlookup(plans, planCode, 7) // ...A:G,7
  out.AB = vlookup(plans, planCode, 8)
  out.AC = vlookup(plans, planCode, 9)
  out.AD = vlookup(plans, planCode, 10)
  out.AE = vlookup(plans, planCode, 11)
  out.AF = vlookup(plans, planCode, 12)
  out.AG = vlookup(plans, planCode, 13)
  out.AH = vlookup(plans, planCode, 14)
  out.AI = vlookup(plans, planCode, 15)
  out.AJ = vlookup(plans, planCode, 16)
  out.AK = vlookup(plans, planCode, 17)
  out.AL = vlookup(plans, planCode, 18)
  out.AM = vlookup(plans, planCode, 19)
  out.AN = vlookup(plans, planCode, 20)
  out.AO = vlookup(plans, planCode, 21)
  out.AP = vlookup(plans, planCode, 22)
  // AU foi visto como VLOOKUP até X (27)
  out.AU = vlookup(plans, planCode, 27)

  // --- constantes absolutos (ex: $H$27)
  const H27 = N(constants['H27'])

  // Ex.: X44 in sheet foi =$H$27 for those rows — replicamos a const where used
  // Dependências intermedias (tradução direta das fórmulas que encontrei)
  // Note: muitas células usam referências entre si — sigo a mesma ordem que identifiquei na planilha
  // BC4 = AW4
  // AW4 = IF(AI4="",AE4, IF(AM4="", AE4+(AE4/AI4*AJ4), IF(AM4<>"", AE4+(AE4/AI4*AJ4)+(((AE4+(AE4/AI4*AJ4))/IF(AM4<>"",AM4,1)*IF(AN4<>"",AN4,1))), AE4)))
  // Vamos traduzir AW4:
  const AI = out.AI
  const AE = N(out.AE)
  const AM = out.AM
  const AJ = N(out.AJ)
  const AN = out.AN

  function AW_calc() {
    // Excel IF(AI4="", AE4, ... )
    if (AI === null || AI === '') {
      return AE
    }
    if (AM === null || AM === '') {
      // AE + (AE / AI * AJ)
      return AE + (AE / N(AI)) * AJ
    }
    // AM <> "" branch
    if (AM !== null && AM !== '') {
      // AE + (AE / AI * AJ) + ( ((AE + (AE / AI * AJ)) / IF(AM<>"", AM, 1) * IF(AN<>"", AN, 1)) )
      const part1 = AE + (AE / N(AI)) * AJ
      const denom = AM !== null && AM !== '' ? N(AM) : 1
      const mult = AN !== null && AN !== '' ? N(AN) : 1
      return part1 + (part1 / denom) * mult
    }
    return AE
  }
  out.AW = AW_calc()
  out.BC = out.AW // BC4 = AW4

  // BE4 = BD4 - BC4  (precisa BD4)
  // BG4 = BF4 - BC4 - BE4  (precisa BF4)
  // BH4 = BG4 / (BE4 + BC4)
  // Para essas, vamos buscar BD, BF, etc a partir de rowInputs (se vierem da planilha como colunas D etc)
  // Uso fallbacks: se BD/BF etc estiverem em inputs, uso; se não, 0
  out.BD = N(rowInputs['BD'] ?? rowInputs['D'] ?? 0)
  out.BF = N(rowInputs['BF'] ?? 0)
  out.BE = out.BD - N(out.BC)
  out.BG = out.BF - N(out.BC) - out.BE
  out.BH = N(out.BE) + N(out.BC) === 0 ? 0 : out.BG / (N(out.BE) + N(out.BC))

  // BI4 = BG4 / 2
  out.BI = out.BG / 2
  // BJ4 = BC4
  out.BJ = out.BC
  // BK4 = SUM(BI4:BJ4) => BI + BJ
  out.BK = N(out.BI) + N(out.BJ)
  // BL4 = BK4 * 2
  out.BL = out.BK * 2
  // BM4 = BL4 - BK4 - BJ4
  out.BM = out.BL - out.BK - out.BJ
  // BN4 = BM4/(BK4+BJ4)
  out.BN = N(out.BK) + N(out.BJ) === 0 ? 0 : out.BM / (N(out.BK) + N(out.BJ))
  // BO4 = BI4
  out.BO = out.BI
  // BP4 = BK4 + BJ4
  out.BP = N(out.BK) + N(out.BJ)
  // BQ4 = AZ4  (vamos calcular AZ4)
  // AZ4 = AU4 + (AF4 * AE4) + ( W4 * (AJ4 + AN4) * AG4 )
  out.AZ =
    N(out.AU) +
    N(out.AF) * N(out.AE) +
    N(out.W) * (N(out.AJ) + N(out.AN)) * N(out.AG)
  out.BQ = out.AZ
  // BR4 = BQ4 - BP4
  out.BR = N(out.BQ) - N(out.BP)

  // Algumas fórmulas observadas em outra parte:
  // BJ4 etc já feitas; outras como V44/W44 variations dependem de linhas 44/54/64 - estas são variantes por faixa (se você precisar delas)
  // Também vi formulas como:
  // V44 = T44 / (U44/F44)
  // W44 = (X44 * V44) / F44
  // ... que dependem de linhas distintas (se quiser posso gerar uma função genérica por linha).

  // Exemplo: se a planilha usa X as constante H27:
  // X4 = VLOOKUP(...) mas em outras linhas X44 = $H$27 -> se quiser usar, disponibilize constants.H27
  out.X_const = H27

  // Retornar todos os campos calculados
  return out
}
//
//
//

export interface HantecInputs {
  INP_planCode: string
  INP_step: string
  INP_stopLossTrade: number
  INP_safeValue: number
  INP_currentBalance: number
  INP_coinPairValue: number
  INPPA_targetProfitLots: number
}

export interface HantecOutputs {
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
}

/**
 * Executa os cálculos equivalentes à aba HANTEC
 * usando (template + inputs)
 */
export function calcularHantec(
  template: CalculationTemplate,
  input: HantecInputs,
): HantecOutputs {
  const {
    initialBalance,
    targetProfit,
    commissionFunded,
    leverageFunded,
    commissionReal,
    leverageReal,
  } = template

  const {
    INP_stopLossTrade,
    INP_safeValue,
    INP_coinPairValue,
    INPPA_targetProfitLots,
  } = input

  // -------------------------------------------
  // AQUI VEM AS FÓRMULAS EQUIVALENTES DO EXCEL
  // -------------------------------------------

  // === TAKE PROFIT (PA) em POINTS ===
  // Planilha: targetPoints = lots * targetProfit * coinPairValue
  const OUTPA_targetProfitPoints =
    INPPA_targetProfitLots * targetProfit * INP_coinPairValue

  // === STOP LOSS (PA) em POINTS ===
  // stopLossPoints = stopLossTrade * leverageFunded * coinPairValue
  const OUTPA_stopLossPoints =
    INP_stopLossTrade * leverageFunded * INP_coinPairValue

  // === STOP LOSS (RA) em LOTS ===
  // stopLossLots = (stopLossTrade * coinPairValue) / (leverageReal * commissionReal)
  const OUTRA_stopLossLots =
    (INP_stopLossTrade * INP_coinPairValue) / (leverageReal * commissionReal)

  return {
    OUTPA_targetProfitPoints,
    OUTPA_stopLossPoints,
    OUTRA_stopLossLots,
  }
}
export function calculateHantec2(
  inputs: HantecInputs,
  template: CalculationTemplate,
): HantecOutputs {
  // CONSTANTS extracted from your Excel sheet
  const POINTS_PER_LOT_PROP = 156 // for prop account
  const POINTS_PER_LOT_REAL = 16 // for real account

  // -------------------------
  // PROP ACCOUNT CALCULATIONS
  // -------------------------

  // 1) Target Profit Points (PROP)
  const OUTPA_targetProfitPoints =
    inputs.INPPA_targetProfitLots * POINTS_PER_LOT_PROP

  // 2) Stop Loss Points (PROP)
  // stopLossTrade is a MONEY VALUE (ex: -1,000.00)
  // prop lot size from Excel:
  //      LOTS = stopLossMoney / commissionFunded
  //
  const stopLossLotsPA = inputs.INP_stopLossTrade / template.commissionFunded

  const OUTPA_stopLossPoints = stopLossLotsPA * POINTS_PER_LOT_PROP

  // -------------------------
  // REAL ACCOUNT CALCULATIONS
  // -------------------------

  // 3) Real Account Stop Loss LOTS
  // Excel:
  //      REAL LOTS = stopLossRA / commissionReal
  const OUTRA_stopLossLots = template.stopLossRA / template.commissionReal

  return {
    OUTPA_targetProfitPoints,
    OUTPA_stopLossPoints,
    OUTRA_stopLossLots,
  }
}
