'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChartNoAxesCombined, Eye, EyeClosed } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SectionsComponent from './SectionsComponent'
import { sendCode, verifyCode } from '../../_actions/auth.actions'
import ErrorDisplay from '@/components/shared/ErrorDisplay'
import {
  sendEmail,
  updatePassword,
  validateCode,
} from '@/app/services/integration.service'

export default function PasswordPageComponent() {
  const [section, setSection] = useState<string | undefined>('enter-email')
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()
  const [code, setCode] = useState<string | undefined>()
  const [statusCode, setStatusCode] = useState<number | undefined>()
  const [error, setError] = useState<string | undefined>()
  const handleSectionTransition = async () => {
    if (!email && !password && !code) {
      setSection('enter-email')
      return
    } else if (email && !password && !code) {
      const res = await sendEmail(email!)
      if (res.success) {
        setError(undefined)
        setSection('enter-code')
      } else {
        setError(res.error as string)
      }
      return
    } else if (email && !password && code) {
      const res = await validateCode(email!, parseInt(code!))
      if (res.success) {
        setError(undefined)
        setSection('update-password')
      } else {
        setError(res.error as string)
      }
      return
    } else {
      const res = await updatePassword(email!, password!)
      if (res.success) {
        setError(undefined)
        setSection('success')
      } else {
        setError(res.error as string)
        setSection('failure')
      }
      return
    }
  }
  useEffect(() => {
    handleSectionTransition()
  }, [email, password, code])
  return (
    <div className="flex flex-col justify-center h-full gap-y-6">
      <div className="flex items-center gap-x-2">
        <div>
          <ChartNoAxesCombined className="box-content bg-primary text-white rounded-lg p-2" />
        </div>
        <div>
          <h1 className="text-xl">Calculator HMA</h1>
        </div>
      </div>
      <ErrorDisplay error={error} />

      <div className="space-y-6">
        <SectionsComponent
          error={error}
          email={email}
          section={section}
          setCode={setCode}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </div>

      <div className="text-muted-foreground text-center">
        Já possui um conta?{' '}
        <Link href={'/login'} className="text-primary">
          Faça Login
        </Link>
      </div>
    </div>
  )
}
