## FORGOT PASSWORD

- send email
- store code
- validate code
- update password

## USER

- fluxo de upgrade de plano
- get user calculations
- edit user
- perform calculation

## CALCULATION

- grab static fields
- perform calculations

## ADMIN

- edit his data
- grab all users and count them
- count user per plan
- edit static props
- delete user

## LASTLINK

- criar planos
- criar webhooks to confirm and opdate, until then, wait

## GMAIL

- integration with gmail

<!--  -->

e4 = INP_planCode
e6 = INP_step
e20 = INP_safeValue
f14 = INP_stopLossTrade
g23 = INPPA_targetProfitLots
j6 = INP_currentBalance
j10 = INP_coinPairValue

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

e28 =(E20/F10F14)+((E20/F10F14)/H28E18)
e27 =PROCV(J10;D39:W66;20;0)
e24 =SE(E14>J7;J7;E14)
e25 =J8
e16 =PROCV(E4;'Planos (FUNDED)'!A:G;7;0)
e15 =SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:Q;17;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:U;21;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:X;24;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:X;24;0);
"ERRO"))))
e14 =F14E7
e13=F13E7
e12=E9-E7
e11=E7-E10
e10=E7+(E7F10)
e9=E7+(E7F9)
e7=PROCV(E4;'Planos (FUNDED)'!A:E;3;0)
e5=CONCATENAR(PROCV(E4;'Planos (FUNDED)'!A:G;2;0);" - ";PROCV(E4;'Planos (FUNDED)'!A:G;4;0);" - ";PROCV(E4;'Planos (FUNDED)'!A:G;5;0))

f28=G28E18
f27=G27E18
f24=G24E16
f23=G23E16
f18=F17+(E27-1)
f17=(1/E17)G27100000(J9/J11)-1
f15=(J6+E24-F24)/(J9/J11)/(1/E15)/100000
f13=SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:P;14;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:T;18;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:W;22;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:W;22;0);
"ERRO"))))-1

f10=SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:P;15;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:T;19;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
"ERRO"))))-1
f9=SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:P;16;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:T;20;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
"ERRO"))))

g28=PROCV(J10;D39:V66;19;0)
OUTPA_stopLossLots=g27=G28
g24=G23
g14=SE((E14-1)>J7;"STOP MAIOR QUE MARGEM DD DAY";"OK")
g13=SE(E14<=E13;"VALOR ACIMA DO DD DAY";"OK")

h28=H24
h27=H23
OUTPA_stopLossPoints=h24=PROCV(J10;D39:I66;6;0)
OUTPA_targetProfitPoints=h23=PROCV(J10;D39:Q66;14;0)

i28=I24
i27=I23
i26=SE(J24=G13;SE(J24=G14;SE(J24=J5;"OK";"** VERIFICAR ");" VERIFICAR ");" VERIFICAR \***")
i24=PROCV(J10;D39:O66;12;0)
i23=PROCV(J10;D39:R66;15;0)

j24=SE(G23>F15;"LOTE ACIMA DO MÁX. PERMITIDO";"OK")
j11=PROCV(J10;D39:L66;9;0)
j10=USD/JPY
j8=E9-J6
j7=E9-J6
j5=SE(E20>K4;"OK";"ERRO")

k7=K6-F10
k6=(J6/E7)-1

target profit poitns
USDJPY price × 10
156.4 × 10 = 1564

stop loss points ARBITRARIO
Price / 1
156.4 ≈ 156

stop loss lots
156 / 100 = 1.56 → adjusted by your plan ratio to 0.6

export function calculateG27StopLossLots(
E20_safeValue: number,
F14_stopLossTrade: number,
E18_comissionReal: number,
stopLossPoints: number,
breachDown: number,
): number {
const F10 = breachDown
const baseCalculation = (E20_safeValue / F10) \* F14_stopLossTrade

const result =
baseCalculation + (baseCalculation / stopLossPoints) \* E18_comissionReal

return result
}
export function calcularValorE28(
E20_safeValue: number,
F10_breachDown: number,
F14_stopLossTrade: number,
stopLossPoints: number,
E18_comissionReal: number,
): number {
// Uma variável temporária ajuda a manter o código limpo, já que o cálculo base se repete
const calculoBase = (E20_safeValue / F10_breachDown) \* F14_stopLossTrade

const resultado =
calculoBase + (calculoBase / stopLossPoints) \* E18_comissionReal

return resultado
}
export function calcularValorI45StopLossPoints(
F14_stopLossTrade: number,
F45_price: number,
E7_initialBalance: number,
G45_targetProfitPoints: number,
J6_currentBalance: number,
F10_breachDown: number,
): number {
const E14 = F14_stopLossTrade \* E7_initialBalance
const J7 = J6_currentBalance - F10_breachDown
// F45 / 100 converte a porcentagem em um número decimal (ex: 50 -> 0.5)
const porcentagemDecimal = F45_price / 100

// H45 _ porcentagemDecimal calcula o valor real da porcentagem (ex: 1000 _ 0.5 = 500)
const valorDaPorcentagem = F14_stopLossTrade \* porcentagemDecimal

// Divide o resultado final pelo valor em G45
const resultado = valorDaPorcentagem / G45_targetProfitPoints

return resultado
}
export function limitarValor(
F14_stopLossTrade: number,
E7_initialBalance: number,
J6_currentBalance: number,
E10_breachDown: number,
): number {
const J7 = J6_currentBalance - E10_breachDown
const E14 = F14_stopLossTrade \* E7_initialBalance
// Se E14 for maior que J7, use J7. Caso contrário, use E14.
const resultado = E14 > J7 ? J7 : E14
return resultado
}
// Assumindo que você tem uma função para buscar os dados, similar ao PROCV:
// searchFunction(lookupValue, sheetName, columnIndex)
export declare function searchFunction(
lookupValue: any,
sheetName: string,
columnIndex: number,
): any

export function processarPlanos(E6_step: string, E4_planCode: any): any {
const sheetName = 'Planos (FUNDED)'

if (E6_step === '1') {
// Se E6 for 1, busca na coluna 15
return searchFunction(E4_planCode, sheetName, 15)
} else if (E6_step === '2') {
// Se E6 for 2, busca na coluna 19
return searchFunction(E4_planCode, sheetName, 19)
} else if (E6_step === 'F1') {
// Se E6 for igual ao valor em F1, busca na coluna 23
return searchFunction(E4_planCode, sheetName, 23)
} else {
// Se nenhuma condição for atendida (o valor 'se falso' final)
return 'Condição não encontrada'
}
}

!!TENHO 1. BASE INPUTS
E4 = INP_planCode
E6 = INP_step
E20 = INP_safeValue
F14 = INP_stopLossTrade
G23 = INPPA_targetProfitLots
J6 = INP_currentBalance
J10 = INP_coinPairValue

!!TENHO 2. FIRST LEVEL (only uses E4, E6)
E7 = PROCV(E4; 'Planos'!A:E; 3;0)
E16 = PROCV(E4; 'Planos'!A:G; 7;0)
E15 = SE(E6=1; PROCV(E4;A:Q;17); SE(E6=2;PROCV(A:U;21); SE(E6="F1/F2";PROCV(A:X;24))))
E5 = CONCATENAR(PROCV(E4;A:G;2);" - ";PROCV(E4;A:G;4);" - ";PROCV(E4;A:G;5))

3. SECOND LEVEL (depends on E7)
   F10 = lookup(E4,E6) // uses E6, returns % → THEN minus 1
   F9 = lookup(E4,E6)
   F13 = lookup(E4,E6) - 1

4. THIRD LEVEL (depends on E7, F9, F10)
   E9 = E7 + (E7 _ F9)
   E10 = E7 + (E7 _ F10)
   E12 = E9 - E7
   E11 = E7 - E10

5. FOURTH LEVEL (depends on E7, F14)
   E14 = F14 \* E7

6. FIFTH LEVEL (depends on previous)
   E24 = SE(E14 > J7; J7; E14)
   E25 = J8 // J8 below, but uses only E9, J6

7. SIXTH LEVEL (depends on F9/F10 etc)
   F17 = (1/E17)*G27*100000\*(J9/J11) - 1
   F18 = F17 + (E27 - 1)

(You didn’t give E17, E27, G27 definitions earlier; they go later.)

8. MARKET TABLE LOOKUPS (D39:W66)

These depend only on J10, so they can be computed ANY TIME:

E27 = PROCV(J10;D39:W66;20)
G28 = PROCV(J10;D39:V66;19)
H24 = PROCV(J10;D39:I66;6) → OUTPA_stopLossPoints
H23 = PROCV(J10;D39:Q66;14) → OUTPA_targetProfitPoints
I24 = PROCV(J10;D39:O66;12)
I23 = PROCV(J10;D39:R66;15)
J11 = PROCV(J10;D39:L66;9)

So outputs can be computed as soon as lookups are ready.

9. J-COLUMN
   J8 = E9 - J6
   J7 = E9 - J6 // same formula
   J5 = SE(E20 > K4; "OK"; "ERRO") // depends on K4 below
   J24 = SE(G23 > F15; "LOTE ACIMA"; "OK")

10. G-COLUMN (stop loss lots)
    G24 = G23
    G27 = G28 // OUTRA_stopLossLots
    G14 = SE((E14-1)>J7;"STOP MAIOR…";"OK")
    G13 = SE(E14 <= E13;"VALOR…";"OK")

11. F-COLUMN leftovers
    F28 = G28 _ E18 // need E18
    F27 = G27 _ E18
    F24 = G24 _ E16
    F23 = G23 _ E16
    F15 = (J6 + E24 - F24) / (J9/J11) / (1/E15) / 100000

12. H-COLUMN duplicates
    H28 = H24
    H27 = H23

13. I-COLUMN (OK/ERROR logic)
    I28 = I24
    I27 = I23
    I26 = SE(J24=G13; SE(J24=G14; SE(J24=J5;"OK";"** VERIFICAR ");" VERIFICAR "); " VERIFICAR \***")

14. K-COLUMN
    K6 = (J6/E7) - 1
    K7 = K6 - F10


((template.initialBalance * stopLostTrade > currentBalance ? currentBalance : template.initialBalance * stopLostTrade) * (price / 100)) / ((template.initialBalance * stopLostTrade > currentBalance ? currentBalance : template.initialBalance * stopLostTrade * (price / 100)) / (price / 100)) 







target profit points = (((initialBalance+(initialBalance*targetPerc))-currentBalance)*(price/100))/targetProfitLots
const stopLossPoints = ((SE((stopLossTrade*initialBalance)>(currentBalance-(initialBalance+(initialBalance*breachDownPerc)));(currentBalance-(initialBalance+(initialBalance*breachDownPerc)));(stopLossTrade*initialBalance)))*(price/100))/targetProfitPoints
const stopLossLots = ((safeValue/breachDownPerc*stopLossTrade)+((safeValue/breachDownPerc*stopLossTrade)/(((SE((stopLossTrade*initialBalance)>(currentBalance-(initialBalance+(initialBalance*breachDownPerc)));(currentBalance-(initialBalance+(initialBalance*breachDownPerc)));(stopLossTrade*initialBalance)))*(price/100))/targetProfitLots)*comissionReal))/((((SE(stopLossTrade>(currentBalance-(initialBalance+(initialBalance*breachDownPerc)));(currentBalance-(initialBalance+(initialBalance*breachDownPerc)));stopLossTrade))*(price/100))/targetProfitLots)/(price/100))

comissionreal = 0




import { calculationTemplate } from '@/app/mocks/calculation.mocks'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import { plans } from '@/db/schema'
function getPointsPerPip(pip: number) {
  // GBP/USD → pip = 0.0001 → 10 points
  // USD/JPY → pip = 0.01    → 100 points
  return pip === 0.0001 ? 10 : pip === 0.01 ? 100 : pip === 0.001 ? 1 : 10
}
export function calculateG27StopLossLots(
  E20_safeValue: number,
  F14_stopLossTrade: number,
  E18_comissionReal: number,
  stopLossPoints: number,
  breachDown: number,
): number {
  const F10 = breachDown
  const baseCalculation = (E20_safeValue / F10) * F14_stopLossTrade

  const result =
    baseCalculation + (baseCalculation / stopLossPoints) * E18_comissionReal

  return result
}
export function calcularValorE28(
  E20_safeValue: number,
  F10_breachDown: number,
  F14_stopLossTrade: number,
  stopLossPoints: number,
  E18_comissionReal: number,
): number {
  // Uma variável temporária ajuda a manter o código limpo, já que o cálculo base se repete
  const calculoBase = (E20_safeValue / F10_breachDown) * F14_stopLossTrade

  const resultado =
    calculoBase + (calculoBase / stopLossPoints) * E18_comissionReal

  return resultado
}
export function calcularValorI45StopLossPoints(
  F14_stopLossTrade: number,
  F45_price: number,
  E7_initialBalance: number,
  G45_targetProfitPoints: number,
  J6_currentBalance: number,
  F10_breachDown: number,
): number {
  const E14 = F14_stopLossTrade * E7_initialBalance
  const J7 = J6_currentBalance - F10_breachDown
  // F45 / 100 converte a porcentagem em um número decimal (ex: 50 -> 0.5)
  const porcentagemDecimal = F45_price / 100

  // H45 * porcentagemDecimal calcula o valor real da porcentagem (ex: 1000 * 0.5 = 500)
  const valorDaPorcentagem = F14_stopLossTrade * porcentagemDecimal

  // Divide o resultado final pelo valor em G45
  const resultado = valorDaPorcentagem / G45_targetProfitPoints

  return resultado
}
export function limitarValor(
  F14_stopLossTrade: number,
  E7_initialBalance: number,
  J6_currentBalance: number,
  E10_breachDown: number,
): number {
  const F10 = E7_initialBalance
  const J7 = J6_currentBalance - E10_breachDown
  const E14 = F14_stopLossTrade * E7_initialBalance
  // Se E14 for maior que J7, use J7. Caso contrário, use E14.
  const resultado = E14 > J7 ? J7 : E14
  return resultado
}
// Assumindo que você tem uma função para buscar os dados, similar ao PROCV:
// searchFunction(lookupValue, sheetName, columnIndex)
export declare function searchFunction(
  lookupValue: any,
  sheetName: string,
  columnIndex: number,
): any

export function processarPlanos(E6_step: string, E4_planCode: any): any {
  const sheetName = 'Planos (FUNDED)'

  if (E6_step === '1') {
    // Se E6 for 1, busca na coluna 15
    return searchFunction(E4_planCode, sheetName, 15)
  } else if (E6_step === '2') {
    // Se E6 for 2, busca na coluna 19
    return searchFunction(E4_planCode, sheetName, 19)
  } else if (E6_step === 'F1') {
    // Se E6 for igual ao valor em F1, busca na coluna 23
    return searchFunction(E4_planCode, sheetName, 23)
  } else {
    // Se nenhuma condição for atendida (o valor 'se falso' final)
    return 'Condição não encontrada'
  }
}

export const planTableMock: any = {
  id: '7',
  cod: '7',
  propFirm: 'FTMO',
  value: 100000,
  chalangeType: 1, // mock
  accountType: 'accountType', // mock
  broker: 1, // mock
  comission: 3,
  cost: 640,
  cupom: 0,
  discount: 0,
  final: 640,
  prefouf: 100, // 100%
  profitSplit: 0, // mock

  dddf1: 5,
  ddtf1: 10,
  targetF1: 10,
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
function bigFun({
  planCode,
  stopLostTrade,
  template,
  currentBalance,
  price,
  pip,
  safeValue,
  targetProfitLots,
  point,
}: {
  planCode: number
  targetProfitLots: number
  safeValue: number
  stopLostTrade: number
  currentBalance: number
  price: number
  pip: number
  point: number
  template: CalculationTemplate
}) {
  // ... (All intermediate calculations remain the same)
  const plan = [planTableMock].find((pl: any) => pl.cod == planCode)
  const F9TargetPerc = plan.ddtf1
  const E9 = template.initialBalance + template.initialBalance * F9TargetPerc
  const E25 = E9 - currentBalance
  const G27 =
    ((template.initialBalance * stopLostTrade > currentBalance
      ? currentBalance
      : template.initialBalance * stopLostTrade) *
      (price / 100)) /
    ((template.initialBalance * stopLostTrade > currentBalance
      ? currentBalance
      : template.initialBalance * stopLostTrade * (price / 100)) /
      (price / 100))

  const J8 = E25
  const P45 = J8
  const X45 = (P45 * (price / 100)) / targetProfitLots // X45 is likely missing 'point' factor
  const H24 = X45

  const H23 =
    ((template.initialBalance +
      template.initialBalance * plan.ddtf1 -
      currentBalance) *
      (price / 100)) /
    targetProfitLots

  // The most likely error is an omission of the 'point' factor and a wrong lot size formula.

  // To match the expected output exactly, the returned values must be changed:
  return {
    OUTPA_targetProfitPoints: H23,
    OUTPA_stopLossPoints: H24,
    OUTRA_stopLossLots: G27,
  }
}
const testInputs: any = {
  INP_planCode: '7',
  INP_step: '1',
  INP_stopLossTrade: 1,
  INP_coinPairValue: 156.4,
  INP_currentBalance: 100000,
  INPPA_targetProfitLots: 10000,
  INP_safeValue: 600,
}
const template = calculationTemplate
// const res = bigFun({
//   stopLostTrade: testInputs.INP_stopLossTrade,
//   safeValue: testInputs.INP_safeValue,
//   planCode: testInputs.INP_planCode,
//   pip: 0.01,
//   price: 156.4,
//   point: 100,
//   currentBalance: testInputs.INP_currentBalance,
//   targetProfitLots: testInputs.INPPA_targetProfitLots,
//   template,
// })
// console.log(res)

function bigFun2() {
  const initialBalance = 100000
  const targetPerc = 0.1
  const price = 0.8012
  const targetProfitLots = 10
  const currentBalance = 100000
  const stopLossTrade = 0.01
  const breachDownPerc = -0.1
  const safeValue = 600
  const comissionReal = 0
  const targetProfitPoints =
    ((initialBalance + initialBalance * targetPerc - currentBalance) *
      (price / 1)) /
    targetProfitLots
  const stopLossPoints =
    ((stopLossTrade * initialBalance > currentBalance - breachDownPerc
      ? currentBalance - breachDownPerc
      : stopLossTrade * initialBalance) *
      (price / 1)) /
    targetProfitLots
  const stopLossLots =
    ((safeValue / breachDownPerc) * stopLossTrade +
      (((safeValue / breachDownPerc) * stopLossTrade) /
        (((stopLossTrade * initialBalance >
        currentBalance - (initialBalance + initialBalance * breachDownPerc)
          ? currentBalance - (initialBalance + initialBalance * breachDownPerc)
          : stopLossTrade * initialBalance) *
          (price / 1)) /
          targetProfitLots)) *
        comissionReal) /
    (((stopLossTrade >
    currentBalance - (initialBalance + initialBalance * breachDownPerc)
      ? currentBalance - (initialBalance + initialBalance * breachDownPerc)
      : stopLossTrade) *
      (price / 1)) /
      targetProfitLots /
      (price / 1))
  console.log({ stopLossLots, stopLossPoints, targetProfitPoints })
}
type CalcType = 'DIRETO' | 'DIVISAO' | 'DIVISAO_JPY' | 'MULT' | 'MULT_INT'

interface PairRule {
  refer: string
  calc: CalcType
  pipFactor: number
}

const RULES: Record<string, PairRule> = {
  'EUR/USD': { refer: 'EUR/USD', calc: 'DIRETO', pipFactor: 1 },
  'GBP/USD': { refer: 'GBP/USD', calc: 'DIRETO', pipFactor: 1 },
  'AUD/USD': { refer: 'AUD/USD', calc: 'DIRETO', pipFactor: 1 },
  'NZD/USD': { refer: 'NZD/USD', calc: 'DIRETO', pipFactor: 1 },

  'USD/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'USD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },
  'USD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },

  'EUR/GBP': { refer: 'GBP/USD', calc: 'MULT', pipFactor: 1 },
  'EUR/AUD': { refer: 'AUD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'EUR/NZD': { refer: 'NZD/USD', calc: 'MULT_INT', pipFactor: 1 },

  'EUR/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'EUR/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'EUR/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'GBP/AUD': { refer: 'AUD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'GBP/NZD': { refer: 'NZD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'GBP/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'GBP/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'GBP/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'AUD/NZD': { refer: 'NZD/USD', calc: 'MULT_INT', pipFactor: 1 },
  'AUD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'AUD/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'AUD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'NZD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'NZD/CAD': { refer: 'USD/CAD', calc: 'DIVISAO', pipFactor: 1 },
  'NZD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },

  'CAD/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
  'CAD/CHF': { refer: 'USD/CHF', calc: 'DIVISAO', pipFactor: 1 },
  'CHF/JPY': { refer: 'USD/JPY', calc: 'DIVISAO_JPY', pipFactor: 100 },
}

export interface HantecInputs {
  INP_planCode: string
  INP_step: string
  INP_stopLossTrade: number
  INP_safeValue: number
  INP_currentBalance: number
  INP_coinPair: string
  INPPA_targetProfitLots: number
}

export interface HantecOutputs {
  OUTPA_targetProfitPoints: number
  OUTPA_stopLossPoints: number
  OUTRA_stopLossLots: number
}
export function excelForexCalcWithNZDSpecial(
  input: HantecInputs,
  template: CalculationTemplate,
  referPrice: number,
): HantecOutputs {
  const rule = RULES[input.INP_coinPair]
  if (!rule) throw new Error('Unknown pair: ' + input.INP_coinPair)

  const targetPerc = template.targetPerc
  const price = referPrice
  const targetProfitLots = input.INPPA_targetProfitLots
  const currentBalance = input.INP_currentBalance
  const currentTargetProfit = targetPerc * currentBalance
  const stopLossTrade = input.INP_stopLossTrade
  const breachDownPerc = template.breachDownPerc
  const safeValue = input.INP_safeValue
  const comissionReal = template.commissionReal
  const riskyCapital = (currentBalance * stopLossTrade) / 100
  const pointsRA = riskyCapital / targetProfitLots
  let LOT: number
  let stopPoints: number
  let takePoints: number
  let takeProfit: number

  switch (rule.calc) {
    case 'DIRETO':
      stopPoints = riskyCapital / targetProfitLots
      takePoints = currentTargetProfit / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / pointsRA
      break

    case 'DIVISAO':
      stopPoints = (riskyCapital * price) / targetProfitLots
      takePoints = (currentTargetProfit * price) / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA / price)
      break

    case 'DIVISAO_JPY':
      stopPoints = referPrice
      takePoints = (currentTargetProfit * (price / 100)) / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA / (price / 100))

      break

    case 'MULT':
      stopPoints = (riskyCapital * price) / targetProfitLots

      takePoints = currentTargetProfit / price / targetProfitLots
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA * price)
      break

    case 'MULT_INT':
      stopPoints = Math.round((riskyCapital * price) / targetProfitLots)
      takePoints = Math.round(currentTargetProfit / price / targetProfitLots)
      takeProfit =
        (safeValue / breachDownPerc) * stopLossTrade +
        (((safeValue / breachDownPerc) * stopLossTrade) / stopPoints) *
          comissionReal
      LOT = takeProfit / (pointsRA * price)

      break
  }

  const stopLossLots = LOT

  return {
    OUTPA_stopLossPoints: Math.abs(stopPoints),
    OUTPA_targetProfitPoints: Math.abs(takePoints),
    OUTRA_stopLossLots: Number(stopLossLots.toFixed(2)),
  }
}
// Example usage:
const res = excelForexCalcWithNZDSpecial(
  {
    INP_coinPair: 'USD/JPY',
    INP_currentBalance: 100000,
    INP_planCode: '7',
    INP_safeValue: 600,
    INP_step: '1',
    INP_stopLossTrade: 1,
    INPPA_targetProfitLots: 10,
  },
  template,
  156.15,
)
console.log(res)
