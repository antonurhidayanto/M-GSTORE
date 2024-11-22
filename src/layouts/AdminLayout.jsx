import { AdminPage } from '@/components/guard/AdminPage'
import { Button } from '@/components/ui/button'
import React from 'react'
import { IoAdd, IoCart, IoPerson, IoPricetag } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SidebarItem = (props) => {
    const {children} = props

    return (
        <Button variant='ghost' size='lg' className='w-full rounded-none justify-start'>
        {children}
    </Button>
    )
}
const AdminLayout = (props) => {

  const {title, desc, rightSection, children} = props
  

  const userSelector = useSelector((state) => state.user)

  return (
    <AdminPage>
        <div className='flex'>
            <aside className='w-72 border-r h-screen'>
                <div className='h-16 flex-col flex items-center justify-center border-b'>
                    <h1 className='font-semibold text-3xl'>Admin Dashboard</h1>
                </div>
                <div className='flex flex-col space-y-0 py-4'>
                    <Link to='/admin/product'>
                        <SidebarItem variant='ghost' size='lg' className='w-full rounded-none justify-start'>
                            <IoPricetag className='w-6 h-6 mr-4'/>
                            Products Management
                        </SidebarItem>
                    </Link>
                    <SidebarItem variant='ghost' size='lg' className='w-full rounded-none justify-start'>
                        <IoCart className='w-6 h-6 mr-4'/>
                        Orders Management
                    </SidebarItem>
                </div>
            </aside>
            <div className='flex-1'>
                <header className='h-16 border-b w-full flex justify-end items-center px-8'>
                    <div className='flex gap-2 items-center'>
                        <p>Hello, {userSelector.username}</p>
                        <Button className='rounded-full' size='icon'>
                            <IoPerson className='w-6 h-6'/>
                        </Button>
                    </div>
                </header>
                <main className='flex flex-col p-4'>
                    <div className='flex justify-between items-center pb-4 border-b mb-8'>
                        <div>
                            <h1 className='text-4xl font-bold'>{title}</h1>
                            <p className='text-muted-foreground'>{desc}</p>
                        </div> 
                        {rightSection} 
                    </div>
                    {children}  
                </main>
            </div>
        </div>
    </AdminPage>
  )
}

export default AdminLayout