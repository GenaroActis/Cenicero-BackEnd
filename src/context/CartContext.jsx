import React, { createContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

const CartProvider = ({children}) =>{

    // toastify
    const notify2 = () => toast.error('Limite Stock!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });
    const notify1 = () => toast.success('Agregado!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });
    
    // funcion cambio agregar a agregado en boton
    function agregado() {
        const botonAgregar = document.querySelector("#botonAgregar")
        botonAgregar.textContent = "agregado";
        botonAgregar.style.backgroundColor = "#da8a0d";
        botonAgregar.style.color = "white";
            setTimeout(function() {
                botonAgregar.textContent = "agregar";
                botonAgregar.style.backgroundColor = "white";
                botonAgregar.style.color = "#0d6efd";
            }, 3000);
    };

    // llamamos a el array del localStorage si existe
    let initialProductosElegidos = [];

    initialProductosElegidos = window.localStorage.getItem('productosElegidos')
    ? (JSON.parse(window.localStorage.getItem('productosElegidos'))) : (initialProductosElegidos = []);

    let [productosElegidos, setProductosElegidos] = useState(initialProductosElegidos)

    // verificamos si existe en el carrito
    const itemEnCarrito = (prodId) => {
        return productosElegidos.find((product) => product.id === prodId) || null;
    };

    

    const agregarProducto = (product) => {
        const itemParaActualizar = itemEnCarrito(product.id);
        
            // si el elemento si existe actualizamos cantidad elegida y precio subtotal
            if (itemParaActualizar){
                // si la cantidad elegida es igual al limite de stock que ....
                if (itemParaActualizar.elegidos === itemParaActualizar.stock){
                    notify2()
                } else {
                let precioParaActualizar = itemParaActualizar.precio;
                itemParaActualizar.elegidos = itemParaActualizar.elegidos + 1;
                itemParaActualizar.precioSubTotal = itemParaActualizar.elegidos * precioParaActualizar;
                setProductosElegidos([...productosElegidos]);
                notify1()
                }
            }
            // si el elemento no existe ya en el array productosElegidos que....
            else{
                    productosElegidos.push({
                        id : product.id,
                        talle : product.talle,
                        nombre : product.nombre,
                        precio : product.precio,
                        img1 : product.img1,
                        img2 : product.img2,
                        precioSubTotal : product.precio,
                        elegidos : 1,
                        stock : product.stock
                    })
                    notify1()
                    
                    setProductosElegidos([...productosElegidos]);
            }
    };

    const limpiarCarrito = () => {
        productosElegidos = [];
        window.sessionStorage.clear();
        setProductosElegidos([...productosElegidos]);
        guardarLocalStorage();
    };

    const eliminarItem = (prodId) => {
        let itemParaActualizar = itemEnCarrito(prodId);
        // si la cantidad es menos a dos limpiamos el producto
        if (itemParaActualizar.elegidos < 2 ){
            productosElegidos = productosElegidos.filter((product) => product.id !== prodId);
            itemParaActualizar.elegidos = 0;
        }
        // sino descontamos uno a cantidad elegida
        else {
            itemParaActualizar.elegidos = itemParaActualizar.elegidos - 1;
            let precioParaActualizar = itemParaActualizar.precio;
            itemParaActualizar.precioSubTotal = itemParaActualizar.elegidos * precioParaActualizar;
        };
        setProductosElegidos([...productosElegidos]);
        guardarLocalStorage();
    };

    // elimina un item con sus cantidades desde el carrito
    const limpiarItem = (prodId) => {
        productosElegidos = productosElegidos.filter((product) => product.id !== prodId);
        setProductosElegidos([...productosElegidos]);
        guardarLocalStorage();
    }

    // funcion calcular el total del precio
    let [totalPrecio, setTotalPrecio] = useState(0);

    const totalPrecioFunctions = () => {
        if(productosElegidos.length > 0) {
            totalPrecio = productosElegidos.reduce((acumulador, product) => acumulador + product.precioSubTotal, 0);
            setTotalPrecio(totalPrecio);
        }
    }
    const guardarLocalStorage = () => {
        // convertimos los objetos en json
        const JsonProductos = JSON.stringify(productosElegidos);
        // almacenamos en localStorage
        if (window.localStorage) {
            window.localStorage.setItem("productosElegidos", JsonProductos);
        }
    };

    // usamos el useEffect para actualizar el localStorage y el totalPrecio
    useEffect(() => {
        guardarLocalStorage();
        totalPrecioFunctions();
    }, [productosElegidos]);
    

    return(
        <CartContext.Provider value={{limpiarItem, agregado, totalPrecioFunctions, totalPrecio, productosElegidos, initialProductosElegidos, guardarLocalStorage, limpiarCarrito, itemEnCarrito,  eliminarItem, agregarProducto, localStorage}}>
        {children}
        </CartContext.Provider>
    )
}



export default CartProvider;       