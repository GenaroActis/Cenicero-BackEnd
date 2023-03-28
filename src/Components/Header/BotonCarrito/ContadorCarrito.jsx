import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../context/CartContext';


function ContadorCarrito() {
    let { productosElegidos, initialProductosElegidos } = useContext(CartContext);
    const [cargando, setCargando] = useState(true);

    // recuperamos la cantidad elegida
    let initialCantidad = 0;
    if (productosElegidos.length > 0 ) {
        initialCantidad = initialProductosElegidos.reduce((acumulador, product) => acumulador + product.elegidos, 0)
    } 

    const [totalCantidadNum, setTotalCantidadNum] = useState(initialCantidad);

    // actualizamos con useEffect
    useEffect(() => {
        if (cargando) {
        setCargando(false);
        }
    setTotalCantidadNum(productosElegidos.reduce((acumulador, product) => acumulador + product.elegidos, 0));
    }, [productosElegidos]);

    return (
        <div>
            <h1 id='numCarro'>{totalCantidadNum}</h1>
        </div>
    );
}

export default ContadorCarrito;






