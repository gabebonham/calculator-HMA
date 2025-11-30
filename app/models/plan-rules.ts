export interface PlanRules {
  id: string
  pair: string
  refer: string
  calc: 'DIRETO' | 'DIVISAO' | 'DIVISAO_JPY' | 'MULT' | 'MULT_INT'
  pipFactor: number
  createdAt: Date
  updatedAt: Date
}
