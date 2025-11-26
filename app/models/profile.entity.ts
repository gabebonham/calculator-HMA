import { UUID } from 'crypto'
import { Plan } from './plan.entity'
import { Calculation } from './calculation.entity'

export class Profile {
  id: UUID
  userId: UUID
  name: string
  email: string
  calculations: Calculation[]
  plan: Plan
  planId: UUID
  createdAt: Date
  constructor(
    id: UUID,
    userId: UUID,
    name: string,
    planId: UUID,
    email: string,
    calculations: Calculation[] = [],
    createdAt: Date,
    plan: Plan,
  ) {
    this.id = id
    this.userId = userId
    this.name = name
    this.email = email
    this.calculations = calculations
    this.plan = plan
    this.planId = planId
    this.createdAt = createdAt
  }
}
