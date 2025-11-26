'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, X, XCircle } from 'lucide-react'
import { useRef } from 'react'
interface Props {
  section: string | undefined
  email: string | undefined
  error: string | undefined
  setEmail: (value: string | undefined) => void
  setCode: (value: string | undefined) => void
  setPassword: (value: string | undefined) => void
}
export default function SectionsComponent({
  section,
  setEmail,
  setCode,
  setPassword,
  error,
  email,
}: Props) {
  const emailRef = useRef<HTMLInputElement>(null)
  const codeRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  if (section == 'enter-email')
    return (
      <div className="space-y-4">
        <div className="text-muted-foreground">
          Informe o email abaixo para enviarmos o codigo de recuperação de
          senha.
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            key={section}
            ref={emailRef}
            className="h-12 bg-white border-primary focus-visible:ring-primary/30"
          />
        </div>
        <div>
          <Button
            onClick={() => setEmail(emailRef.current?.value ?? undefined)}
            className="h-12 w-full font-bold"
          >
            Enviar Código
          </Button>
        </div>
      </div>
    )
  else if (section == 'enter-code')
    return (
      <div className="space-y-4">
        <div className="text-muted-foreground">
          Enviamos um código para {email}, informe ele abaixo.
        </div>
        <div className="space-y-2">
          <Label>Código</Label>
          <Input
            key={section}
            ref={codeRef}
            className="h-12 bg-white border-primary focus-visible:ring-primary/30"
          />
        </div>
        <div>
          <Button
            onClick={() => setCode(codeRef.current?.value ?? undefined)}
            className="h-12 w-full font-bold"
          >
            Validar Código
          </Button>
        </div>
      </div>
    )
  else if (section == 'update-password')
    return (
      <div className="space-y-4">
        <div className="text-muted-foreground">
          Informe a nova senha abaixo.
        </div>
        <div className="space-y-2">
          <Label>Senha</Label>
          <Input
            key={section}
            ref={passwordRef}
            className="h-12 bg-white border-primary focus-visible:ring-primary/30"
          />
        </div>
        <div>
          <Button
            onClick={() => setPassword(passwordRef.current?.value ?? undefined)}
            className="h-12 w-full font-bold"
          >
            Atualizar Senha
          </Button>
        </div>
      </div>
    )
  else if (section == 'success')
    return (
      <div className="text-center space-y-4">
        <div>Senha atualizada com sucesso.</div>
        <div className="place-items-center">
          <Check className="size-8 text-green-400" />
        </div>
      </div>
    )
  else if (section == 'failure')
    return (
      <div className="text-center space-y-4">
        <div>Erro ao atualizar senha.</div>
        <div className="place-items-center">
          <XCircle className="size-8 text-red-400" />
        </div>
      </div>
    )
  else return <></>
}
