import React, { useState, useEffect, useContext  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContadorCarrito from './ContadorCarrito'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../context/CartContext';

function Example(children) {
    const [show, setShow] = useState(false);
    let {productosElegidos, limpiarItem, limpiarCarrito, totalPrecio, totalPrecioFunctions, agregarProducto, eliminarItem, itemEnCarrito} = useContext(CartContext)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    return (
    <>
        <Button id="buttonC" variant="primary" onClick={handleShow}>
            <img src="https://res.cloudinary.com/dsdicaf5h/image/upload/v1677255374/cenicero/carrito-de-compras_1_nkqp6z.png" className="imgBoton"/>
        </Button>

        <Modal id="modal" className='text-center' show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Carrito</Modal.Title>
            </Modal.Header>
        <Modal.Body id='modalBody'>
            {   productosElegidos.length === 0 ? (
                <div className='display-3 shadow-lg text-danger p-3 mb-5 bg-white rounded'>¡Tu carrito esta vacio!</div>
            ) : (
            productosElegidos.map(product=>
                <div key={product.id} className='card shadow-lg text-dark mt-5'>
                <img src={product.img1} className='card-img-top mt-2 img-fluid' alt="" srcSet="" />
                <div className='card-body'>
                    <h1 className='card-title'>{product.nombre}</h1>
                    <h2>Talle {product.talle}</h2>
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                        <button className='btn btn-outline-dark mr-3' onClick={()=>{agregarProducto(product)}}>+</button>
                    <h3 className='mb-0'>Cantidad {product.elegidos}</h3>
                        <button className='btn btn-outline-dark pr-3' onClick={()=>{
                            let prodId = product.id
                            eliminarItem(prodId)
                            }}>-</button>
                    </div>
                    <button className='btn btn-danger mt-2 mb-2' onClick={()=>{
                            let prodId = product.id
                            limpiarItem(prodId)
                            }}>Eliminar Producto</button>
                    {/* {si productos elegidos es igual a uno muestra el precio unitario sino sub total y unitario */
                    product.elegidos === 1?(
                    <h1 className='card-text shadow-lg p-3 bg-white rounded'>${product.precio} </h1>
                    ):(
                        <h2 className='card-text shadow-lg p-3 bg-white rounded'>por unidad ${product.precio} <br /> Total  ${product.precioSubTotal} </h2>
                    )}
                </div>
            </div>
            ))
            }
        </Modal.Body>
            <Modal.Footer>
                {(productosElegidos.length === 0) ? 
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                :
                <>
                <Button variant="danger" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="danger" onClick={limpiarCarrito}>
                    vaciar carrito
                </Button>
                <Link className="nav-link" aria-current="page" to={'/FinalizarCompra'}>
                    <Button variant="primary" onClick={handleClose}>
                        Comprar
                    </Button>
                </Link>
                <h1 className='card-text shadow-lg p-3 bg-white rounded'>Total ${totalPrecio}</h1>
                </>
                }
            </Modal.Footer>
        </Modal>
        <ContadorCarrito/>
    </>
    );
}

export default Example