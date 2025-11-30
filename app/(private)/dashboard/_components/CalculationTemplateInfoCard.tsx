'use client'
import { updateCalculationTemplate } from '@/app/actions/calculations.actions'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Divide } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  label: string
  w: string
  calculationTemplate: CalculationTemplate
  color?: string
}
export default function CalculationTemplateInfoCard({
  label,
  w,
  calculationTemplate,
  color,
}: Props) {
  function formatFieldLabel(key: string): string {
    let label = key.replace(/_/g, ' ')

    label = label.replace(/([a-z])([A-Z])/g, '$1 $2')

    label = label.replace(/\b\w/g, (c) => c.toUpperCase())

    return label
  }
  const getValue = () => {
    return (
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 ">
        {Object.entries(calculationTemplate)
          .filter((e) => e[0] != 'id' && e[0] != 'createdAt')
          .map((e, i) => {
            const key = e[0]
            const value = e[1]
            let finalValue
            if (typeof value == 'string') {
              finalValue = value
            } else if (typeof value == 'number') {
              finalValue = value.toString()
            } else {
              finalValue = new Intl.DateTimeFormat('pt-BR').format(
                new Date(value),
              )
            }
            return (
              <div key={i} className="text-start space-y-1">
                <Label className="text-muted-foreground">
                  {formatFieldLabel(key)}
                </Label>
                <Input className="" placeholder={finalValue} name={key} />
                <Input
                  className=""
                  placeholder={finalValue}
                  name={key + 'v'}
                  value={value}
                  hidden
                />
              </div>
            )
          })}
        <div className="text-start space-y-1 ">
          <Label className="text-muted-foreground h-3.5" />
          <Button form="edit-template-form" className="w-full">
            Atualizar
          </Button>
        </div>
      </div>
    )
  }
  const updateHanlder = async (formData: FormData) => {
    const breachDown =
      formData.get('breachDown')?.valueOf() ||
      formData.get('breachDownv')?.valueOf()
    const breachDownPerc =
      formData.get('breachDownPerc')?.valueOf() ||
      formData.get('breachDownPercv')?.valueOf()
    const commissionFunded =
      formData.get('commissionFunded')?.valueOf() ||
      formData.get('commissionFundedv')?.valueOf()
    const commissionReal =
      formData.get('breaccommissionRealhDown')?.valueOf() ||
      formData.get('commissionRealv')?.valueOf()
    const ddDay =
      formData.get('ddDay')?.valueOf() || formData.get('ddDayv')?.valueOf()
    const initialBalance =
      formData.get('initialBalance')?.valueOf()?.valueOf() ||
      formData.get('initialBalancev')
    const leverageFunded =
      formData.get('leverageFunded')?.valueOf() ||
      formData.get('leverageFundedv')?.valueOf()
    const leverageReal =
      formData.get('leverageReal')?.valueOf() ||
      formData.get('leverageRealv')?.valueOf()
    const margemDD =
      formData.get('margemDD')?.valueOf() ||
      formData.get('breamargemDDvchDown')?.valueOf()
    const planDescription =
      formData.get('planDescription')?.valueOf() ||
      formData.get('planDescriptionv')?.valueOf()
    const propFirmAccountNumber =
      formData.get('propFirmAccountNumber')?.valueOf() ||
      formData.get('propFirmAccountNumberv')?.valueOf()
    const stopLossPA =
      formData.get('stopLossPA')?.valueOf() ||
      formData.get('stopLossPAv')?.valueOf()
    const stopLossRA =
      formData.get('stopLossRA')?.valueOf() ||
      formData.get('stopLossRAv')?.valueOf()
    const takeRA =
      formData.get('takeRA')?.valueOf() || formData.get('takeRAv')?.valueOf()
    const target =
      formData.get('target')?.valueOf() || formData.get('targetv')?.valueOf()
    const targetPerc =
      formData.get('targetPerc')?.valueOf() ||
      formData.get('targetPercv')?.valueOf()
    const targetProfit =
      formData.get('targetProfit')?.valueOf() ||
      formData.get('targetProfitv')?.valueOf()
    const targetProfitPA =
      formData.get('targetProfitPA')?.valueOf() ||
      formData.get('targetProfitPAv')?.valueOf()
    const totalGasto =
      formData.get('totalGasto')?.valueOf() ||
      formData.get('totalGastov')?.valueOf()
    if (
      !breachDown ||
      !margemDD ||
      !leverageReal ||
      !breachDownPerc ||
      !leverageFunded ||
      !initialBalance ||
      !ddDay ||
      !planDescription ||
      !commissionFunded ||
      !propFirmAccountNumber ||
      !commissionReal ||
      !stopLossPA ||
      !stopLossRA ||
      !takeRA ||
      !target ||
      !targetPerc ||
      !targetProfit ||
      !targetProfitPA ||
      !totalGasto
    ) {
      toast('Campos faltando.')
      return
    }
    const res = await updateCalculationTemplate({
      breachDown: Number(breachDown),
      margemDD: Number(margemDD),
      leverageReal: Number(leverageReal),
      breachDownPerc: Number(breachDownPerc),
      leverageFunded: Number(leverageFunded),
      initialBalance: Number(initialBalance),
      ddDay: Number(ddDay),
      planDescription: planDescription as string,
      commissionFunded: Number(commissionFunded),
      propFirmAccountNumber: propFirmAccountNumber as string,
      commissionReal: Number(commissionReal),
      stopLossPA: Number(stopLossPA),
      stopLossRA: Number(stopLossRA),
      takeRA: Number(takeRA),
      target: Number(target),
      targetPerc: Number(targetPerc),
      targetProfit: Number(targetProfit),
      targetProfitPA: Number(targetProfitPA),
      totalGasto: totalGasto as string,
    })
    if (res.success) {
      toast('Atualizado com sucesso')
    } else {
      toast('Erro na atualização')
    }
  }
  return (
    <Card className={`px-5 text-start gap-y-3 ${w} h-full`}>
      <div
        className={`w-full flex items-start justify-start ${color && color}`}
      >
        <h1 className="text-xl font-medium">{label}</h1>
      </div>
      <form id="edit-template-form" className="" action={updateHanlder}>
        <div className="grid grid-cols-1">{getValue()}</div>
      </form>
    </Card>
  )
}
