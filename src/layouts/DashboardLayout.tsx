import { Outlet } from "react-router-dom"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="w-full overflow-hidden">
          <Header />
          <div className="flex-1 py-10 lg:px-16 px-4">
            <Outlet />
            {/*  This will render pages like Employees, Admins, etc. */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
