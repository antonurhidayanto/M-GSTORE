
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AdminLayout from '@/layouts/AdminLayout'
import { axiosInstance } from '@/lib/axios'
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoAdd, IoTrashBin } from 'react-icons/io5'
import { Link, useSearchParams } from 'react-router-dom'








const ProductManagmentPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [nextPage,setNextPage] = useState(true)
    const [products,setProducts] = useState([])
    const [searchProduct,setSearchProduct] = useState("")

    const [selectedImage, setSelectedImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState([]);

    const handleImageClick = (image,id) => {
        console.log(id)
        setSelectedImage(image);
        setShowPreview(true);
      };
      
      const handleClosePreview = () => {
        setShowPreview(false);
      };

    const handleNextPage = () => {

         /* ini cara sederhananya */
        // setSearchParams({
        //     _page: Number(searchParams.get("_page")) + 1
        // })

        searchParams.set("_page", Number(searchParams.get("_page")) + 1)
        setSearchParams(searchParams)
    }

    const handlePrevPage = () => {
        if(Number(searchParams.get("_page")) <= 1) {
            return
        }
        searchParams.set("_page", Number(searchParams.get("_page")) - 1)
        setSearchParams(searchParams)
    }
    const fetchProduct = async () => {
        try{
                const response = await axiosInstance.get("/products",{
                    params: {
                        _per_page: 5,
                        _page: Number(searchParams.get("_page")),
                        title: searchParams.get('_search'),
                    }
                })
                console.log(response.data)
                setNextPage(Boolean(response.data.next))
                setProducts(response.data.data.products)
            }catch(error){
                console.log(error)
            }
    }
    
    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            searchProducts()
        }
    }
    const searchProducts = (e) => {
        if(!searchProduct) {
            searchParams.delete("_search")
            setSearchParams(searchParams)
            return
        }else{
            searchParams.set("_search", searchProduct)
            setSearchParams(searchParams)
        }
    }

    const handleDeleteProduct = async () => {
        const shouldDelete = confirm(`Are you sure want to delete ${selectedProductId.length} product ?`)
        if(!shouldDelete) {
            return
        }
        // try{
        //     await axiosInstance.delete(`/products/${productId}`)
        //     alert("Product Deleted")
        //     fetchProduct()
        // }catch(error){
        //     console.log(error)
        // }
        const deletePromises = selectedProductId.map((productId) => axiosInstance.delete(`/products/${productId}`))

        try{
            await Promise.all(deletePromises)
            alert(`${selectedProductId.length} Product has been Successfully Deleted !`)
            searchParams.set("_page", 1)
            setSearchParams(searchParams)
            setSelectedProductId([])
        }catch(error){
            console.log(error)
        }
    }

    const handleOnCheckedProduct = (productId,checked) => {
        if(checked) {
            const prevSelectedProductId = [...selectedProductId]
            prevSelectedProductId.push(productId)
            setSelectedProductId(prevSelectedProductId)
        }else{
            const productIdIndex = selectedProductId.findIndex((id) => id === productId)
            const prevSelectedProductId = [...selectedProductId]
            prevSelectedProductId.splice(productIdIndex,1)
            setSelectedProductId(prevSelectedProductId)
        }
    }

    useEffect(() => {
        if(searchParams.get("_page")) {
        fetchProduct()
        }
    }, [searchParams.get("_page"),searchParams.get("_search")])


    useEffect(() => {
        if(!searchParams.get("_page") && searchParams.get("_page") < 1) {
            searchParams.set("_page", 1)
            setSearchParams(searchParams)
        }
    }, [])


  return (
    <AdminLayout title="Products Management" desc="Managing Our Products" rightSection={
            <div className='flex gap-2'>
                <Link to='/admin/product/create'>
                    <Button>
                        <IoAdd className='w-6 h-6 mr-2'/>
                        Add Product
                    </Button>
                </Link>
                {
                    selectedProductId.length > 0 ? (
                    <Button variant="destructive" onClick={() => handleDeleteProduct(selectedProductId)}>
                        Delete {selectedProductId.length} Product
                    </Button>
                    ) : null
                }
            </div>

        }>
            <div className='mb-8'>
                <label>Search Product Name</label>
                <div className='flex gap-4'>
                    <Input 
                    onKeyPress={handleKeyPress}
                    value={searchProduct} 
                    onChange= {(e) => setSearchProduct(e.target.value)} 
                    className='max-w-[300px]' type="text" placeholder='Search Product Name'/>
                    <Button onClick={searchProducts}> Search</Button>
                </div>
            </div>
           <Table className='p-4 border rounded-md'>
               <TableHeader>
                   <TableRow>
                       <TableHead></TableHead>
                       <TableHead>ID</TableHead>
                       <TableHead>Title</TableHead>
                       <TableHead>Price</TableHead>
                       <TableHead>Stock</TableHead>
                       <TableHead>Image</TableHead>
                       <TableHead></TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                {products.map((product) => {
                    return (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Checkbox onCheckedChange={(checked) => handleOnCheckedProduct(product.id,checked)}
                                checked={selectedProductId.includes(product.id)}
                                />
                            </TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            {/* <TableCell>
                                 <img src={product.imageUrl} alt={product.title} className='w-14 h-14 object-cover cursor-pointer' onClick={() => handleImageClick(product.imageUrl,product.id)}/>
                            
                                {showPreview && selectedImage === product.imageUrl && (
                                        <div
                                        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'
                                        onClick={handleClosePreview}
                                        >
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            className='max-w-md max-h-md'
                                        />
                                        </div>
                                    )}
                            </TableCell> */}
                            <TableCell>
                                {(() => {
                                    const imageSrc = product.thumbnail || product.images?.[0] || "https://via.placeholder.com/150";

                                    return (
                                    <>
                                        <img
                                        src={imageSrc}
                                        alt={product.title}
                                        className="w-14 h-14 object-cover cursor-pointer"
                                        onClick={() => handleImageClick(imageSrc, product.id)}
                                        />

                                        {showPreview && selectedImage === imageSrc && (
                                        <div
                                            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                                            onClick={handleClosePreview}
                                        >
                                            <img
                                            src={imageSrc}
                                            alt={product.title}
                                            className="max-w-md max-h-md"
                                            />
                                        </div>
                                        )}
                                    </>
                                    );
                                })()}
                            </TableCell>
                            <TableCell>
                                <div className='flex gap-4'>
                                    <Link to={`/admin/product/edit/${product.id}`}>
                                        <Button variant='ghost' size='icon'>
                                            <Edit className='w-6 h-6 cursor-pointer'/>
                                        </Button>
                                    </Link>
                                        {/* <Button onClick={() => handleDeleteProduct(product.id)} variant='destructive' size='icon'>
                                            <Trash className='w-6 h-6 cursor-pointer'/>
                                        </Button> */}
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}
               </TableBody>
           </Table>
           <Pagination>
               <PaginationContent>
                    <PaginationItem>
                        <Button onClick={handlePrevPage} disabled={Number(searchParams.get("_page")) <= 1} variant="ghost">
                            <ChevronLeft className='w-6 h-6 mr-2'/> Previous
                        </Button>
                    </PaginationItem>
                    <PaginationItem className='mx-8 font-semibold'>
                        Page {searchParams.get("_page")}
                    </PaginationItem>
                    <PaginationItem>
                        <Button onClick={handleNextPage} disabled={!nextPage} variant="ghost">
                            Next<ChevronRight className='w-6 h-6 ml-2'/>
                        </Button>
                    </PaginationItem>
               </PaginationContent>
           </Pagination>
    </AdminLayout>
  )
}

export default ProductManagmentPage