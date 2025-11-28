'use client'

import { useSession } from 'next-auth/react'
import CalculatePageComponent from '../calculator/_component/CalculatePage'
import Header from './Header'
import { AnyAaaaRecord } from 'node:dns'
import LoadingScreen from '@/components/shared/Loading'
interface Props {
  calculationTemplate: any
}
export default function CalculatorWrapper({ calculationTemplate }: Props) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  const profile = {
    email: session?.user.email as string,
    name: session?.user.name as string,
    role: session?.user.role as string,
    plan: session?.user.plan,
    id: session?.user.id as string,
  }
  return (
    <div>
      <Header profile={profile} />
      <CalculatePageComponent calculationTemplate={calculationTemplate} />
    </div>
  )
}
