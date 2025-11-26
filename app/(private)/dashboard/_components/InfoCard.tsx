'use client'
import { Card } from '@/components/ui/card'
import { LucideProps } from 'lucide-react'
import React from 'react'

interface Props {
  label: string
  icon: React.ComponentType<LucideProps>
  w: string
  value: number
  monthlyPercentage: number
  color?: string
}
export default function InfoCard({
  label,
  icon: Icon,
  value,
  w,
  monthlyPercentage,
  color,
}: Props) {
  const getPercentageSignal = () => {
    if (monthlyPercentage > 0) return '+'
    else return ''
  }
  const getPercentageColor = () => {
    if (monthlyPercentage > 0) return 'text-green-500'
    else if (monthlyPercentage < 0) return 'text-red-400'
    else return ''
  }
  return (
    <Card className={`px-5 text-start gap-y-3 ${w}`}>
      <div
        className={`w-full flex items-center justify-between ${color && color}`}
      >
        <h1 className="text-xl font-medium">{label}</h1>
        <div>
          <Icon color="currentColor" />
        </div>
      </div>
      <div className="space-y-4 ">
        <h1 className="text-3xl font-bold">{value}</h1>
        <p className={`${getPercentageColor()}`}>
          {getPercentageSignal() + monthlyPercentage}% este mês
        </p>
      </div>
    </Card>
  )
}
