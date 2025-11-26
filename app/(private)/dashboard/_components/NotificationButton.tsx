'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Bell, BellDot } from 'lucide-react'
interface Props {
  notifications: any[]
}
export default function NotificationButton({ notifications }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {notifications.length == 0 ? <Bell /> : <BellDot />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {notifications.map((notification) => (
          <DropdownMenuItem className="px-0">
            <DropdownMenuLabel className="w-full">
              {notification.title}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
