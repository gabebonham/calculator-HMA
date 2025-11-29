export interface HantecInputs {
  INP_planCode: string
  INP_step: string
  INP_stopLossTrade: number // Assumido como Percentual de SL (e.g., -0.01)
  INP_safeValue: number
  INP_currentBalance: number
  INP_coinPairValue: number // Assumido como Preço de Referência (J9)
  INPPA_targetProfitLots: number
}

export interface HantecOutputs {
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
}

// 1. DADOS EXTRAÍDOS DA ABA 'Planos (FUNDED)'
// Mapeamento dinâmico para os resultados das fórmulas VLOOKUP/IF (E7, F9, F10, etc.)
export const PLANOS_DATA = [
  // COD (A) | VALUE (E) | DD T F1 (O) | TARGET F1 (P) | DD T F2 (S) | TARGET F2 (T) | DD T F AC (V) | TARGET F AC (W)
  {
    id: '1',
    initialBalance: 10000,
    dd_f1: 0.1,
    target_f1: 0.1,
    dd_f2: 0.1,
    target_f2: 0.05,
    dd_fac: 0.1,
    target_fac: 0.05,
  },
  {
    id: '2',
    initialBalance: 10000,
    dd_f1: 0.2,
    target_f1: 0.1,
    dd_f2: 0.2,
    target_f2: 0.05,
    dd_fac: 0.2,
    target_fac: 0.05,
  },
  {
    id: '3',
    initialBalance: 25000,
    dd_f1: 0.1,
    target_f1: 0.1,
    dd_f2: 0.1,
    target_f2: 0.05,
    dd_fac: 0.1,
    target_fac: 0.05,
  },
  {
    id: '4',
    initialBalance: 25000,
    dd_f1: 0.2,
    target_f1: 0.1,
    dd_f2: 0.2,
    target_f2: 0.05,
    dd_fac: 0.2,
    target_fac: 0.05,
  },
  {
    id: '5',
    initialBalance: 50000,
    dd_f1: 0.1,
    target_f1: 0.1,
    dd_f2: 0.1,
    target_f2: 0.05,
    dd_fac: 0.1,
    target_fac: 0.05,
  },
  {
    id: '6',
    initialBalance: 50000,
    dd_f1: 0.2,
    target_f1: 0.1,
    dd_f2: 0.2,
    target_f2: 0.05,
    dd_fac: 0.2,
    target_fac: 0.05,
  },
  {
    id: '7',
    initialBalance: 100000,
    dd_f1: 0.1,
    target_f1: 0.1,
    dd_f2: 0.1,
    target_f2: 0.05,
    dd_fac: 0.1,
    target_fac: 0.05,
  },
] as any

// 2. DADOS EXTRAÍDOS DA TABELA DE MOEDAS (D39:Q66)
// Assumimos que a chave de lookup (J10) é um 'CoinPairCode'.
// V_LOT_COST_FACTOR é o resultado da VLOOKUP em H24 (coluna 6 do VLOOKUP, index 5)
const COIN_PAIR_DATA: { [code: string]: { lotCostFactor: number } } = {
  // Para simplificar, usamos um código 'EXEMPLO'
  EXEMPLO_COIN: { lotCostFactor: 10 }, // Valor de H24 (assumido)
  // Os dados da planilha D39:I66 não têm um código claro no primeiro campo,
  // então o lookup do VLOOKUP em H24 e H23 precisará ser tratado externamente
  // ou o INP_coinPairValue precisa ser ajustado.
}

export function calculateHantecGemini(inputs: HantecInputs): HantecOutputs {
  const plan = PLANOS_DATA[inputs.INP_planCode]
  if (!plan) {
    throw new Error(
      `Plan Code ${inputs.INP_planCode} não encontrado no mapa de planos.`,
    )
  }

  // --- Lógica IF/VLOOKUP (Tradução das Fórmulas em F9, F10) ---

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

  // VLOOKUP Plan Constants
  const V_INITIAL_BALANCE = plan.initialBalance

  // VLOOKUP Coin Pair Constant (Assume 'EXEMPLO_COIN' é a chave para J10)
  const coinData = COIN_PAIR_DATA['EXEMPLO_COIN']
  const V_LOT_COST_FACTOR = coinData.lotCostFactor

  // --- Variáveis Intermediárias (Cálculos da Planilha) ---

  // 1. Stop Loss em Moeda (E14)
  const stopLossCurrency: number = inputs.INP_stopLossTrade * V_INITIAL_BALANCE

  // 2. Limite de Saque/Breach Down em Moeda (E10)
  const breachDownLimit: number =
    V_INITIAL_BALANCE * (1 - V_BREACH_DOWN_PERCENT)

  // 3. Drawdown Margin em Moeda (J7) - Máximo que o trade pode perder antes de atingir o limite DD.
  const drawdownMarginCurrency: number =
    inputs.INP_currentBalance - breachDownLimit

  // 4. Stop Loss Ajustado (E24) - Min(SL Desejado, Margem DD)
  // E24 = IF(E14 > J7, J7, E14) -> O valor em E24 é negativo se for o E14 (SL desejado).
  // Usamos o valor absoluto do mínimo permitido para a fórmula de pontos.
  const adjustedStopLoss: number = Math.min(
    Math.abs(stopLossCurrency),
    drawdownMarginCurrency,
  )

  // 5. Target Profit em Moeda (E23)
  const targetProfitCurrency: number =
    V_INITIAL_BALANCE * (1 + V_TARGET_PERCENT) - inputs.INP_currentBalance

  // --- Saídas (Cálculos de Pontos) ---

  // Fator de Pip/Ponto por Lote (currencyPerLotPerPoint)
  // Baseado na lógica padrão e no uso de V_LOT_COST_FACTOR (H24) e INP_coinPairValue (J9)
  const currencyPerLotPerPoint: number =
    V_LOT_COST_FACTOR / inputs.INP_coinPairValue

  // OUTRA_stopLossLots (Lotes de Stop Loss) -> G24 = G23
  const OUTRA_stopLossLots: number = inputs.INPPA_targetProfitLots

  // OUTPA_targetProfitPoints: Pontos de Lucro
  const OUTPA_targetProfitPoints: number =
    targetProfitCurrency /
    (inputs.INPPA_targetProfitLots * currencyPerLotPerPoint)

  // OUTPA_stopLossPoints: Pontos de Stop Loss
  const OUTPA_stopLossPoints: number =
    adjustedStopLoss / (inputs.INPPA_targetProfitLots * currencyPerLotPerPoint)

  return {
    OUTPA_targetProfitPoints: OUTPA_targetProfitPoints,
    OUTPA_stopLossPoints: OUTPA_stopLossPoints,
    OUTRA_stopLossLots: OUTRA_stopLossLots,
  }
}
