import { ProductCard } from "@/components/ProductCard"
import { axiosInstance } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataProducts, dataSetProducts] = useState([])

    const userSelector = useSelector((state) => state.user)
    console.log(userSelector,"ini user selector")
    const fetchProduct = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get('/products')
            dataSetProducts(response.data)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    //fetch product data when home page first mounted
    useEffect(() => {
        // fetchProduct()
        fetchProduct()
    }, [])

    const ProductsList = dataProducts.map((product) => {
        return (
            <div key={product.id}>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  stock={product.stock}
                  imageUrl={product.imageUrl}
                />
            </div>
        )
      })
      return (
        <>
            <main className='min-h-[88vh] max-w-screen-md mx-auto px-4 mt-8'>
              <div className='pb-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                    Become a trend-setter with us.
                </h1>
                <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                  Ecommerce provides you with the finest clothings and ensures your confidence throughout your days.
                </p>
              </div>
              {
                isLoading ? (<p>Loading...</p> ) : (
                <div className='grid grid-cols-2 gap-4'>
                    {ProductsList}
                </div>
                )
              }
            </main>
        </>
      )
}

export default HomePage