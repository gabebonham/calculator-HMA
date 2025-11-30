'use client'
import { createRulePlans } from '@/app/actions/plan-rules.actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
export default function CreatePlanModal() {
  const calcs = ['DIRETO', 'DIVISAO', 'DIVISAO_JPY', 'MULT', 'MULT_INT']
  const [calc, setCalc] = useState<string>()
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<string>()
  const createHandler = async (formData: FormData) => {
    const pair = formData.get('pair')?.valueOf()
    const refer = formData.get('refer')?.valueOf()
    const pipFactor = formData.get('pipFactor')?.valueOf()
    if (!pair || !refer || !calc || !pipFactor) {
      setError('Preencha todos os campos.')
      return
    }
    await createRulePlans({ pair, refer, calc, pipFactor })
    setOpen(false)
  }
  return (
    <Dialog onOpenChange={(val) => setOpen(val)} open={open}>
      <DialogTrigger>
        <Button className="w-32">Criar Plano</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Plano</DialogTitle>
          <DialogDescription>
            <form className="space-y-4" action={createHandler}>
              <p className="text-red-500"> {error && error}</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <Label>Pár</Label>
                  <Input name="pair" />
                </div>
                <div>
                  <Label>Refer</Label>
                  <Input name="refer" />
                </div>

                <div>
                  <Label>Cálculo</Label>
                  <Select onValueChange={setCalc}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {calcs.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pip</Label>
                  <Input name="pipFactor" />
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Criar
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
