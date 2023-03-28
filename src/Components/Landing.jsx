import React, { useContext, useState } from 'react'

import Header from './Header/Header'
import Footer from './Footer/Footer'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nosotros from './pages/Nosotros'
import ProductoDetalles from './pages/ProductoDetalles'
import Inicio from './Inicio/Inicio'
import FinalizarCompra from './pages/FinalizarCompra'
import CartProvider from '../context/CartContext'
import Category from './pages/Category'

import '../scss/modal.css'
import '../scss/detalleProductos.css'
import  '../scss/reset.css'
import  '../scss/Header&Footer.css'
import  '../scss/body.css'
import  '../scss/Inicio.css'
import 'react-toastify/dist/ReactToastify.css';



const Landing = () => {

    return (
    <div id='landing'>
        <React.StrictMode>
            <CartProvider>
                <BrowserRouter>
                    <Header/>
                    
                    <Routes>
                        <Route exact path="/cenicero-backend" element={<Inicio/>}/>
                        <Route exact path="/Nosotros" element={<Nosotros/>}/>
                        <Route exact path="/Producto/:id" element={<ProductoDetalles/>}/>
                        <Route exact path="/FinalizarCompra" element={<FinalizarCompra/>}/>
                        <Route exact path="/Category/:CategoryId" element={<Category/>}/>
                    </Routes>

                    <Footer/>
                </BrowserRouter>
            </CartProvider>
        </React.StrictMode>
    </div>
    )
}
export default Landing