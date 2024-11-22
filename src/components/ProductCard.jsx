import React, { useState,useEffect } from 'react'
import { Button } from './ui/button'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { Link } from 'react-router-dom';

export const ProductCard = (props) => {
    const {title,price,stock,imageUrl,id} = props;
    const [isAdded, setIsAdded] = useState(false)
    const [quantity, setQuantity] = useState(0)


    const addToCart = () => {
        setIsAdded(true)
    }

    const increaseQuantity = () => {
        if(quantity < stock){
            setQuantity(quantity + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 0){
            setQuantity(quantity - 1)
        }
    }

  return (
    <div className='p-4 border rounded-md md:max-w-96 flex flex-col gap-4'>
        <div className='aspect-square w-full overflow-hidden'>
           <Link to={'/product/'+id}>
                <img className='w-full' src={imageUrl} alt='product'/>
           </Link> 
        </div>
        <Link to={'/product/'+id}>
            <div>
                <p className='text-md'>{title}</p>
                <p className='text-xl font-semibold'>Rp {price.toLocaleString('id-ID')}</p>
                <p className='text-muted-foreground text-sm'>In stock: {stock}</p>
            </div>
        </Link>
        <div className='flex flex-col gap-2'>
            {/*Button quantity */}
           <div className="flex justify-between items-center">
                <Button onClick={decreaseQuantity} size='icon' variant='ghost'
                disabled={quantity <= 0}>
                    <IoIosRemove className='h-6 w-6'/>
                </Button>
                <p className='text-lg font-bold'>
                    {quantity}
                </p>
                <Button onClick={increaseQuantity} size='icon' variant='ghost'disabled={quantity >= stock}>
                    <IoIosAdd className='h-6 w-6'/>
                </Button>
           </div>
            {/* Button add to cart */}
            <Button 
                onClick={addToCart} className='w-full' 
                disabled={!stock || quantity <= 0 }>
                    {
                    stock > 0 ? "Added to cart" : "Out Of Stock"
                    }
            </Button>
        </div>
    </div>
  )
}
