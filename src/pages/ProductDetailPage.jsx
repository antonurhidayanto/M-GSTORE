import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { axiosInstance } from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { IoHeartOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'



const ProductDetailPage = () => {

    let {productId} = useParams()
    
    // const [products, setProducts] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState({
        title: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        id: 0
    })
    const [isAdded, setIsAdded] = useState(false)

    const fetchProduct = async () => {
        try{
                setIsLoading(true)
                const response = await axiosInstance.get("/products")
                
                setProducts(response.data.find((data) => data.id == productId))
            }catch(error){
                console.log(error)
            }finally{
                setIsLoading(false)
            }
    }

        //fetch product data to get Id Product
    useEffect(() => {
        fetchProduct()
    }, [])

  return (
   <main className='min-h-screen max-w-screen-lg mx-auto px-4 mt-8'>
        <div className='grid grid-cols-2 gap-8'>
            {
                isLoading ? <Skeleton className={"w-[350px] h-[400px]"} /> :
                <img src={products.imageUrl} alt="" className='w-full'/>
            }
            <div className='flex flex-col justify-center gap-1'>
                {
                    isLoading ? <Skeleton className={"w-[300px] h-[32px]"}/> :
                    <h1 className='text-xl'>{products.title}</h1>
                }
                {
                    isLoading ? <Skeleton className={"w-[300px] h-[32px]"}/> :
                    <h3 className='text-3xl'>Rp {products.price.toLocaleString('id-ID')}</h3>
                }
                {
                    isLoading ? <Skeleton className={"w-[300px] h-[32px]"}/> :
                    <p className='text-lg'>Stock: {products.stock}</p>
                }
                {
                    isLoading ? <Skeleton className={"w-[300px] h-[150px]"}/> :
                    <p className='text-sm text-muted-foreground mt-4'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente debitis voluptatem in et deleniti eius, asperiores, maxime non ducimus neque animi. Optio odit id possimus nemo itaque molestias iure voluptatem deleniti eligendi beatae quo, ut consectetur inventore deserunt eum amet vel veritatis vero expedita modi quam impedit, natus enim. Sunt.
                    </p>
                }
                <div className='flex items-center gap-8 mt-6'>
                    <Button size='icon' variant='ghost'>
                        <IoIosRemove className='h-6 w-6'/>
                    </Button>
                    <p className='text-lg font-bold'>
                        0
                    </p>
                    <Button size='icon' variant='ghost'>
                        <IoIosAdd className='h-6 w-6'/>
                    </Button>
                </div>
                <div className='flex items-center gap-4 mt-4'>
                        <Button className='w-full' size='lg' variant='default'>Add to Cart</Button>
                        <Button size='icon' variant='ghost'>
                            <IoHeartOutline className='h-6 w-6'/>
                        </Button>
                </div>
            </div>
        </div>
   </main>
  )
}

export default ProductDetailPage