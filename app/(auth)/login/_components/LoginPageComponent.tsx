'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChartNoAxesCombined, Eye, EyeClosed } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { login } from '../../_actions/auth.actions'
import { LoginSchema } from '@/lib/zod.config'
import { email } from 'zod'
import ErrorDisplay from '@/components/shared/ErrorDisplay'

export default function LoginPageComponent() {
  const router = useRouter()
  const [eyeVisible, setEyeVisible] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const handleToast = () => {
    toast.promise(toastLoginWrapper(), {
      loading: 'Cadastrando...',
      success: () => {
        // router.push('/dashboard')
        return `Usuário logado.`
      },
      error: 'Erro ao logar usuário.',
    })
  }
  const toastLoginWrapper = async () => {
    const result = await handleLogin()

    if (!result) {
      throw new Error(result || 'Erro ao logar usuário')
    }

    return result
  }
  const handleLogin = async () => {
    const emailValue = emailRef.current?.value ?? undefined
    const passwordValue = passwordRef.current?.value ?? undefined
    const zodRes = LoginSchema.safeParse({
      email: emailValue,
      password: passwordValue,
    })
    if (!zodRes.success) {
      setError(zodRes.error.issues.map((iss) => iss.message).join(' | '))
      return false
    }

    const res = await login(emailValue!, passwordValue!)
    if (res.success) {
      return true
    } else {
      setError(res.error!)
      return false
    }
  }
  const keyDownHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleToast()
    }
  }
  return (
    <div className="flex flex-col justify-center h-full gap-y-6  ">
      <div className="flex items-center gap-x-2 ">
        <div>
          <ChartNoAxesCombined className="box-content bg-primary text-white rounded-lg p-2" />
        </div>
        <div>
          <h1 className="text-xl">Calculator HMA</h1>
        </div>
      </div>
      <div className="text-red-400">
        <ErrorDisplay error={error} />
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Bem vindo(a) de volta!</h1>
        </div>
        <div className="text-muted-foreground">Faça seu Login</div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            ref={emailRef}
            onKeyDown={keyDownHandler}
            className="h-12 bg-white border-primary focus-visible:ring-primary/30"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Senha</Label>
            <Link href={'/forgot-password'} className="underline text-primary">
              Esqueceu a senha?
            </Link>
          </div>
          <div
            className="border-primary flex items-center bg-white rounded-lg border border-input transition
                focus-within:border-ring focus-within:ring-primary/30 focus-within:ring-[2px]
                pr-2 h-12"
          >
            <Input
              ref={passwordRef}
              onKeyDown={keyDownHandler}
              type={eyeVisible ? 'text' : 'password'}
              className="border-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
            />
            {eyeVisible ? (
              <Eye
                className="text-muted-foreground"
                onClick={() => setEyeVisible(!eyeVisible)}
              />
            ) : (
              <EyeClosed
                className="text-muted-foreground"
                onClick={() => setEyeVisible(!eyeVisible)}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => handleToast()} className="h-12 w-full font-bold">
          Login
        </Button>
      </div>
      <div className="text-muted-foreground text-center">
        Não possui um conta?{' '}
        <Link href={'/register'} className="text-primary">
          Cadastre-se
        </Link>
      </div>
    </div>
  )
}
