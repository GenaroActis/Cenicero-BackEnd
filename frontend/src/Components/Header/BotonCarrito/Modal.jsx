import React, { useState, useEffect, useContext  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import ContadorCarrito from './ContadorCarrito'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../context/CartContext';
import Spinner from 'react-bootstrap/Spinner';

function ModalCart(children) {
    const [show, setShow] = useState(false);
    const { getCart, totalPriceFunction, addProductToCart, deleteProductToCart, deleteAllProductsToCart } = useContext(CartContext)
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice]= useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
        const data = await getCart();
        const price = await totalPriceFunction();
        setTotalPrice(price);
        setCartProducts(data);
        setLoading(false);
        } catch (error) {
            console.error(error);
        };
    };

    const handleClose = () => setShow(false);
    const handleShow = () => {
        fetchData()
        setShow(true)
    };

    const handleAddToCart = async (productId) => {
        try {
            await addProductToCart(productId);
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteToCart = async (productId) => {
        try {
            await deleteProductToCart(productId);
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleCleanCart = async () => {
        try {
            await deleteAllProductsToCart();
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    };

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
                
                {   cartProducts.length === 0 ? (
                    <div className='display-3 shadow-lg text-danger p-3 mb-5 bg-white rounded'>¡Tu carrito esta vacio!</div>
                ) : (
                cartProducts.map(product=>
                    <div key={product._id._id} className='card shadow-lg text-dark mt-5'>
                    {/* <img src={product.img1} className='card-img-top mt-2 img-fluid' alt="" srcSet="" /> */}
                    <div className='card-body'>
                        <h1 className='card-title'>{product._id.title}</h1>
                        <h2>Talle {product._id.size}</h2>
                        <div className='d-flex flex-row justify-content-center align-items-center'>
                            <button className='btn btn-outline-dark mr-3' onClick={()=>{
                                handleAddToCart(product._id._id)
                            }}>+</button>
                            <h3 className='mb-0 m-1'>Cantidad {product.quantity}</h3>
                            <button className='btn btn-outline-dark pr-3' onClick={()=>{
                                handleDeleteToCart(product._id._id)
                            }}>-</button>
                        </div>
                        <button className='btn btn-danger mt-2 mb-2' onClick={()=>{
                                }}>Eliminar Producto</button>
                        <h1 className='card-text shadow-lg p-3 bg-white rounded'>${product._id.price} </h1>
                    </div>
                </div>
                ))
                }
            </Modal.Body>
                <Modal.Footer>
                    {(cartProducts.length === 0) ? 
                        <Button variant="danger" onClick={handleClose}>
                            Cerrar
                        </Button>
                    :
                    <>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="danger" onClick={handleCleanCart}>
                        vaciar carrito
                    </Button>
                    <Link className="nav-link" aria-current="page" to={'/FinalizarCompra'}>
                        <Button variant="primary" onClick={handleClose}>
                            Comprar
                        </Button>
                    </Link>
                    <h1 className='card-text shadow-lg p-3 bg-white rounded'>Total ${totalPrice}</h1>
                    </>
                    }
                </Modal.Footer>
            </Modal>
            {/* <ContadorCarrito/> */}
        </>
    );
}

export default ModalCart