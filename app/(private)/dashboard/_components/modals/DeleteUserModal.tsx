'use client'
import { deleteUserAction } from '@/actions/admin/users-actions'
import { deleteUser } from '@/app/actions/users.actions'
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

export default function DeleteUserModal({ id }: { id: any }) {
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
                deleteUser(id)
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
