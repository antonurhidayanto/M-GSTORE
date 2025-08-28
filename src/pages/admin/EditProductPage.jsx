import { ProductForm } from '@/components/forms/ProductForm'
import AdminLayout from '@/layouts/AdminLayout'
import { axiosInstance } from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProductPage = () => {

    const Navigate = useNavigate()
    const [products, setProducts] = useState({
        title: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        id: 0
    })

    const params = useParams()

    const fetchProduct = async () => {
        try{
            const response = await axiosInstance.get("/products")    
            setProducts(response.data.products.find((data) => data.id == params.productId))
            }catch(error){
                console.log(error)
            }
    }

    const handleEditProduct = async (values) => {
            try{
                await axiosInstance.patch(`/products/${params.productId}`, values)
                alert("Product edited successfully")
                Navigate("/admin/product/")
            }catch(error){
                console.log(error)
            }
    }

    useEffect(() => {
        fetchProduct()
    }, [])


  return (
    <AdminLayout title="Edit Product Page" desc="Edit product">
        {
            products.id ? (
            <ProductForm 
            onSubmit={handleEditProduct} 
            cardTitle={'Edit Product '+ products.title}
            defaultTitle={products.title}
            defaultPrice={products.price}
            defaultStock={products.stock}
            defaultImageUrl={products.imageUrl}
            buttonTitle="update"
            />
            ) : (
                <p>Loading...</p>
            )
        }
    </AdminLayout>
  )
}

export default EditProductPage