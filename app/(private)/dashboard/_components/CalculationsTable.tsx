'use client'

import { Calculation } from '@/app/models/calculation.entity'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
interface Props {
  calculations: Calculation[]
}
export default function CalculationsTable({ calculations }: Props) {
  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getMinutes()}:${date.getSeconds()}`
  }
  return (
    <div
      className="border-1 border-muted-foreground/50 rounded-2xl px-3 py-1 overflow-y-auto w-full max-h-96 scrollbar 
    scrollbar-thin

    scrollbar-thumb-transparent
    hover:scrollbar-thumb-gray-500

    scrollbar-track-transparent
    hover:scrollbar-track-transparent

    transition-all duration-200"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead className="text-yellow-500">Plan Code</TableHead>
            <TableHead className="text-yellow-500">Step</TableHead>
            <TableHead className="text-yellow-500">Stop Loss Trade</TableHead>
            <TableHead className="text-yellow-500">Safe Value</TableHead>
            <TableHead className="text-yellow-500">Current Balance</TableHead>
            <TableHead className="text-yellow-500">Coin Pair</TableHead>
            <TableHead className="text-yellow-500">Coin Pair Value</TableHead>
            <TableHead className="text-yellow-500">
              Target Profit Lots
            </TableHead>
            <TableHead className="">-</TableHead>
            <TableHead className="text-purple-500">
              Target Profit Points
            </TableHead>
            <TableHead className="text-purple-500">Stop Loss Points</TableHead>
            <TableHead className="text-purple-500">Stop Loss Lots</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calculations &&
            calculations.map((calculation) => (
              <TableRow key={calculation.id} className="text-muted-foreground">
                <TableCell>{formatDate(calculation.createdAt)}</TableCell>
                <TableCell>{calculation.INP_planCode}</TableCell>
                <TableCell>{calculation.INP_step}</TableCell>
                <TableCell>{calculation.INP_stopLossTrade}</TableCell>
                <TableCell>{calculation.INP_safeValue}</TableCell>
                <TableCell>{calculation.INP_currentBalance}</TableCell>
                <TableCell>{calculation.INP_coinPairValue}</TableCell>
                <TableCell>{calculation.INP_coinPair}</TableCell>
                <TableCell>{calculation.INPPA_targetProfitLots}</TableCell>
                <TableCell>|</TableCell>
                <TableCell>{calculation.OUTPA_targetProfitPoints}</TableCell>
                <TableCell>{calculation.OUTPA_stopLossPoints}</TableCell>
                <TableCell>{calculation.OUTRA_stopLossLots}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
