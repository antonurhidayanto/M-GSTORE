import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {IoCart,IoHeart} from 'react-icons/io5'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const userSelector = useSelector((state) => state.user)
    const counterSelector = useSelector((state) => state.counter)


    const handleLogout = () => {
        //1. remove user from local storage
        localStorage.removeItem("current-user")

        //2. remove user from redux
        dispatch({
            type: "USER_LOGOUT"
        })
        
    }



  return (
    <header className='h-16 border-b flex justify-between items-center px-8'>
        {/* brand */}
        <a href ="/" className='text-xl font-bold hover:cursor-pointer'>M & G Store</a>
        {/* search Bar */}
        <Input className='max-w-[600px]' placeholder='Search...'></Input>
        {/* user menu */}
        <div className='flex space-x-4 h-5 items-center'>
            <div className='flex space-x-2'>
                <Link to={'/cart'}>
                    <Button size='icon' variant='ghost'>
                        <IoCart className='w-6 h-6'/>
                    </Button>
                </Link>
                <Button size='icon' variant='ghost'>
                   <IoHeart className='w-6 h-6'/>
                </Button>
            </div>
            <Separator orientation='vertical' className='h-full' />
            <div className='flex space-x-2'>
                
                {
                    userSelector.id ? (
                        <>
                            <p className='flex font-semibold items-center justify-center '>Hello, {userSelector.username}({userSelector.role})</p>
                            <Button onClick={handleLogout} variant='destructive'>Logout</Button>
                        </>
                    ):(
                    <>
                        <Link to={'/login'}>
                        <Button >Login</Button> 
                        </Link>
                        <Link to={'/register'}>
                        <Button variant='outline'>Sign up</Button>
                        </Link>
                    </>
                    )
                }
                
            </div>
        </div>
    </header>
  )
}

export default Header