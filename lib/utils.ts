import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
