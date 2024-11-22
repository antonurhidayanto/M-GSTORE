import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import {Routes, Route,useLocation} from 'react-router-dom'
import CartPage from './pages/CartPage'
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import NotFoundPage from './components/ui/NotFoundPage'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductManagmentPage from './pages/admin/ProductManagmentPage'
import CreateProductPage from './pages/admin/CreateProductPage'
import EditProductPage from './pages/admin/EditProductPage'
import CounterPage from './pages/CounterPage'
import RegisterPage from './pages/RegisterPage'
import { useHydration } from './Hooks/useHydration'
function App() {

  const location = useLocation()

  const {ishydrated} = useHydration()

  if(!ishydrated){
    return <div>Loading... </div>
  }
 
  return (
    <> 
    {
      location.pathname.startsWith('/admin') ? null : <Header/>
    }
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/cart' Component={CartPage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/register' Component={RegisterPage}/>
        <Route path='/product/:productId' Component={ProductDetailPage}/>
        <Route path='/counter' Component={CounterPage}/>

        <Route path='/admin'>
          <Route path='product' Component={ProductManagmentPage}/>
          <Route path ="product/create" Component={CreateProductPage}/>
          <Route path = 'product/edit/:productId' Component={EditProductPage}/>
        </Route>

        <Route path='*' Component={NotFoundPage}/>
      </Routes>
    <Footer/>
    </>
  )
}

export default App
