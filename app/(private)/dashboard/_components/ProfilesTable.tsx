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
interface Props {
  profiles: Profile[]
}
export default function ProfilesTable({ profiles }: Props) {
  return (
    <div className="border-1 border-muted-foreground rounded-2xl px-3 py-1 max-h-96 overflow-y-auto">
      <Table>
        <TableCaption>Lista de seus usuários.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
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
                <TableCell className="font-medium">{profile.id}</TableCell>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(profile.createdAt),
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {profile.plan ? profile.plan.name : 'Sem Plano'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant={'destructive'}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
