import AdminHeader from '@/components/admin/AdminHeader'
import { AppSidebar } from '@/components/admin/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { UserContextProvider } from '@/context/UserContext'


import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {





  return (
    <UserContextProvider>

      <div>
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full '>
            <AdminHeader />
            <div className='p-3'>
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </UserContextProvider>
  )
}

export default AdminLayout