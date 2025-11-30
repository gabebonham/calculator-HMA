'use client'
import { deleteRulePlan } from '@/app/actions/plan-rules.actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

export default function DeletePlanModal({ id }: { id: any }) {
  const [open, setOpen] = useState<boolean>()
  return (
    <Dialog onOpenChange={(val) => setOpen(val)} open={open}>
      <DialogTrigger>
        <Button variant={'destructive'}>Deletar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar este Plano?</DialogTitle>
          <DialogDescription className="py-4">
            <Button
              className=""
              onClick={() => {
                deleteRulePlan(id)
                setOpen(false)
              }}
              variant="destructive"
            >
              Deletar
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
