import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { DashboardSideBar } from './dashboard/_components/DashboardSideBar'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <SidebarProvider className="">
    //   <DashboardSideBar />
    //   <SidebarInset className="bg-white">
    //     <SidebarTrigger /> <main className="">{children}</main>
    //   </SidebarInset>
    // </SidebarProvider>
    <main className="">{children}</main>
  )
}
