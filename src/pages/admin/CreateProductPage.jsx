import AdminLayout from '@/layouts/AdminLayout'
import { axiosInstance } from '@/lib/axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductForm } from '@/components/forms/ProductForm'


const CreateProductPage = () => {

    const navigate = useNavigate()

    const handleCreateProduct = async (values) => {
       try{
            await axiosInstance.post("/products", values)
            alert("Product created successfully")
            navigate("/admin/product")
       }catch(err){
           console.log(err)
       }
    }

  return (
    <AdminLayout title="Create Product Page" desc="Add new product">
        <ProductForm onSubmit={handleCreateProduct} cardTitle="Add Create Product" buttonTitle="Add Product" />
    </AdminLayout>
  )
}

export default CreateProductPage