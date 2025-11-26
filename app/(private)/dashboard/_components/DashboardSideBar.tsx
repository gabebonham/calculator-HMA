'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

export function DashboardSideBar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-primary-foreground" />
      <SidebarContent className="bg-primary-foreground ">
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-primary-foreground" />
      <SidebarRail />
    </Sidebar>
  )
}
