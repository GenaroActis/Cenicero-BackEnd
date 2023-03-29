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
    function added() {
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
    let inAddedProducts = [];

    inAddedProducts = window.localStorage.getItem('addedProducts')
    ? (JSON.parse(window.localStorage.getItem('addedProducts'))) : (inAddedProducts = []);

    let [addedProducts, setAddedProducts] = useState(inAddedProducts)

    // verificamos si existe en el carrito
    const itemExists = (prodId) => {
        return addedProducts.find((product) => product.id === prodId) || null;
    };

    

    const addProduct = (product) => {
        const itemUpdate =  itemExists(product.id);
        
            // si el elemento si existe actualizamos cantidad elegida y precio subtotal
            if (itemUpdate){
                // si la cantidad elegida es igual al limite de stock que ....
                if (itemUpdate.elegidos === itemUpdate.stock){
                    notify2()
                } else {
                let priceUpdate = itemUpdate.precio;
                itemUpdate.elegidos = itemUpdate.elegidos + 1;
                itemUpdate.precioSubTotal = itemUpdate.elegidos * priceUpdate;
                setAddedProducts([...addedProducts]);
                notify1()
                }
            }
            // si el elemento no existe ya en el array productosElegidos que....
            else{
                    addedProducts.push({
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
                    setAddedProducts([...addedProducts]);
            }
    };

    const cleanCart = () => {
        addedProducts = [];
        window.sessionStorage.clear();
        setAddedProducts([...addedProducts]);
        saveLocalStorage();
    };

    const deleteItem = (prodId) => {
        let  itemUpdate = itemExists(prodId);
        // si la cantidad es menos a dos limpiamos el producto
        if ( itemUpdate.elegidos < 2 ){
            addedProducts = addedProducts.filter((product) => product.id !== prodId);
            itemUpdate.elegidos = 0;
        }
        // sino descontamos uno a cantidad elegida
        else {
            itemUpdate.elegidos =  itemUpdate.elegidos - 1;
            let priceUpdate = itemUpdate.precio;
            itemUpdate.precioSubTotal = itemUpdate.elegidos * priceUpdate;
        };
        setAddedProducts([...addedProducts]);
        saveLocalStorage();
    };

    // elimina un item con sus cantidades desde el carrito
    const cleanItem = (prodId) => {
        addedProducts = addedProducts.filter((product) => product.id !== prodId);
        setAddedProducts([...addedProducts]);
        saveLocalStorage();
    }

    // funcion calcular el total del precio
    let [totalPrice, setTotalPrice] = useState(0);

    const totalPriceFunction = () => {
        if(addedProducts.length > 0) {
            totalPrice = addedProducts.reduce((accumulator, product) => accumulator + product.precioSubTotal, 0);
            setTotalPrice(totalPrice);
        }
    }
    const saveLocalStorage = () => {
        // convertimos los objetos en json
        const JsonProducts = JSON.stringify(addedProducts);
        // almacenamos en localStorage
        if (window.localStorage) {
            window.localStorage.setItem("addedProducts", JsonProducts);
        }
    };

    // usamos el useEffect para actualizar el localStorage y el totalPrecio
    useEffect(() => {
        saveLocalStorage();
        totalPriceFunction();
    }, [addedProducts]);
    

    return(
        <CartContext.Provider value={{cleanItem, added, totalPrice, totalPriceFunction, addedProducts, inAddedProducts, saveLocalStorage, cleanCart, itemExists,  deleteItem, addProduct, localStorage}}>
        {children}
        </CartContext.Provider>
    )
}



export default CartProvider;       