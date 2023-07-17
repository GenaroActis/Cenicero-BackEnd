import React from 'react'

import Header from './Header/Header'
import Footer from './Footer/Footer'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nosotros from './pages/Nosotros'
import ProductoDetalles from './pages/ProductoDetalles'
import Inicio from './Inicio/Inicio'
import FinalizarCompra from './pages/FinalizarCompra'
import CartProvider from '../context/CartContext'
import UserProvider from '../context/UserContext'
import ProductProvider from '../context/ProductContext'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login'

import '../scss/modal.css'
import '../scss/detalleProductos.css'
import  '../scss/reset.css'
import  '../scss/Header&Footer.css'
import  '../scss/body.css'
import  '../scss/Inicio.css'
import  '../scss/user.css'
import 'react-toastify/dist/ReactToastify.css';



const Landing = () => {

    return (
    <div id='landing'>
        <React.StrictMode>
            <UserProvider>
            <CartProvider>
            <ProductProvider>
                <BrowserRouter>
                    <Header/>
                        <Routes>
                            <Route exact path="/cenicero-backend" element={<Inicio/>}/>
                            <Route exact path="/nosotros" element={<Nosotros/>}/>
                            <Route exact path="/producto/:id" element={<ProductoDetalles/>}/>
                            <Route exact path="/finalizarCompra" element={<FinalizarCompra/>}/>
                            <Route exact path="/products" element={<Products/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/" element={<Login/>}/>
                        </Routes>
                    <Footer/>
                </BrowserRouter>
            </ProductProvider>
            </CartProvider>
            </UserProvider>
        </React.StrictMode>
    </div>
    )
}
export default Landing