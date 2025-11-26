'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChartNoAxesCombined, Eye, EyeClosed } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { register } from '../../_actions/auth.actions'
import { createRouteLoader } from 'next/dist/client/route-loader'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { RegisterSchema } from '@/lib/zod.config'
import ErrorDisplay from '@/components/shared/ErrorDisplay'

export default function RegisterPageComponent() {
  const router = useRouter()
  const [eyeVisible, setEyeVisible] = useState<boolean>(true)
  const [eyeVisibleConfirm, setEyeVisibleConfirm] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>()
  const emailRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordConfRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const handleToast = () => {
    toast.promise(toastRegisterWrapper(), {
      loading: 'Cadastrando...',
      success: () => {
        router.push('/login')
        return `Usuário cadastrado.`
      },
      error: 'Erro ao cadastrar usuário.',
    })
  }
  const toastRegisterWrapper = async () => {
    const result = await registerHandler()

    if (!result) {
      throw new Error(result || 'Erro ao cadastrar usuário')
    }

    return result
  }

  const registerHandler = async () => {
    const emailValue = emailRef.current?.value ?? undefined
    const usernameValue = usernameRef.current?.value ?? undefined
    const passwordValue = passwordRef.current?.value ?? undefined
    const passwordConfValue = passwordConfRef.current?.value ?? undefined
    const zodRes = RegisterSchema.safeParse({
      email: emailValue,
      password: passwordValue,
      passwordConfirm: passwordConfValue,
      username: usernameValue,
    })
    if (!zodRes.success) {
      setError(zodRes.error.issues.map((iss) => iss.message).join(' | '))
      return false
    }

    const res = await register(emailValue!, passwordValue!, usernameValue!)
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

      <div>
        <div>
          <h1 className="text-2xl font-bold">Bem vindo(a) de volta!</h1>
        </div>
        <div className="text-muted-foreground">Faça seu Cadastro</div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            onKeyDown={keyDownHandler}
            ref={emailRef}
            className="h-12 bg-white border-primary focus-visible:ring-primary/30"
          />
        </div>
        <div className="space-y-2">
          <Label>Nome</Label>
          <Input
            onKeyDown={keyDownHandler}
            ref={usernameRef}
            className="h-12 bg-white border-primary focus-visible:ring-primary/30"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Senha</Label>
          </div>
          <div
            className="border-primary flex items-center bg-white rounded-lg border border-input transition
                focus-within:border-ring focus-within:ring-primary/30 focus-within:ring-[2px]
                pr-2 h-12"
          >
            <Input
              onKeyDown={keyDownHandler}
              type={eyeVisible ? 'text' : 'password'}
              ref={passwordRef}
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
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Confrimar Senha</Label>
          </div>
          <div
            className="border-primary flex items-center bg-white rounded-lg border border-input transition
                focus-within:border-ring focus-within:ring-primary/30 focus-within:ring-[2px]
                pr-2 h-12"
          >
            <Input
              onKeyDown={keyDownHandler}
              type={eyeVisibleConfirm ? 'text' : 'password'}
              ref={passwordConfRef}
              className="border-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
            />
            {eyeVisibleConfirm ? (
              <Eye
                className="text-muted-foreground"
                onClick={() => setEyeVisibleConfirm(!eyeVisibleConfirm)}
              />
            ) : (
              <EyeClosed
                className="text-muted-foreground"
                onClick={() => setEyeVisibleConfirm(!eyeVisibleConfirm)}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <Button onClick={handleToast} className="h-12 w-full font-bold">
          Cadastrar
        </Button>
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
