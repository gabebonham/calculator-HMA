'use client'

import { Profile } from '@/app/models/profile.entity'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DeleteUserModal from './modals/DeleteUserModal'
interface Props {
  profiles: Profile[]
  plans: any[]
}
export default function ProfilesTable({ profiles, plans }: Props) {
  return (
    <div
      className="border-1 border-muted-foreground/50 rounded-2xl px-3 py-1 max-h-96 overflow-y-auto scrollbar 
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
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-center">Plano</TableHead>
            <TableHead className="text-center ">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles &&
            profiles.map((profile) => (
              <TableRow key={profile.id} className="text-muted-foreground">
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(profile.createdAt),
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {plans.map((pl: any) => pl.id).includes(profile.planId)
                    ? plans.find((pl: any) => pl.id == profile.planId).name
                    : 'Sem Plano'}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteUserModal id={profile.userId} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
