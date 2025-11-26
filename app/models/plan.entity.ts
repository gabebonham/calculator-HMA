import { UUID } from 'crypto'

type Period = 'monthly' | 'semiannual' | 'yearly' | 'lifetime'
export class Plan {
  id: UUID
  name: string
  description: string
  period: Period
  price: number
  color: string
  bgcolor: string
  createdAt: Date
  constructor(
    id: UUID,
    name: string,
    description: string,
    period: Period,
    color: string,
    bgcolor: string,
    price: number,
    createdAt: Date,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.period = period
    this.price = price
    this.color = color
    this.bgcolor = bgcolor
    this.createdAt = createdAt
  }
}
