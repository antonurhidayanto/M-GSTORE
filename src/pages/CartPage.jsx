
import { CartItem } from '@/components/CartItem'
import { SignPage } from '@/components/guard/SignPage'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const CartPage = () => {
  return (
    <SignPage>
      <main className='min-h-screen max-w-screen-lg mx-auto px-4 mt-8'>
          <h1 className='text-3xl font-bold'>My Cart</h1>
          <div className='mt-10'>
              <Separator />
              <div className='grid grid-cols-12 gap-8 my-8'>
                  <div className='col-span-7 gap-6 flex flex-col'>
                      <CartItem 
                      name="Dark Jeans Jacket" 
                      price={100000} 
                      imageUrl="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                      />
                  </div>
              </div>
          </div>
      </main>
    </SignPage>
  )
}

export default CartPage