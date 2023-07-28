import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {CartContext} from '../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import Spinner from 'react-bootstrap/Spinner';
import { PurchaseContext } from '../../context/PurchaseContext';

const FinalizePurchase = () => {
    const { generateTicket, finalizeTicket } = useContext(PurchaseContext)
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket ] = useState([])
    const { id } = useParams(); 
    
    useEffect(() => {
        const getTicket = async() =>{
            const ticketGenerate = await generateTicket(id)
            if( ticketGenerate ) {
                setTicket(ticketGenerate)
                setLoading(false)
            }
        };
        getTicket();
    }, []);

    const handlePostTicket = async (e) =>{
        e.preventDefault()
        ticket.purchaser.cellPhone = document.querySelector('#phone').value
        const fetchTicket = await finalizeTicket(ticket)
        console.log(ticket)
    }

    // // toastify
    // const notify1 = () => toast.error('Completar Datos!', {
    //     position: "top-right",
    //     autoClose: 700,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    // }
    // );

    // const notify2 = () => toast.error(`error al enviar la compra! Intenta de nuevo mas tarde`, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    // }
    // );

    // const notify3 = () => toast.success('Compra Realizada con exito!', {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    // }
    // )

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    } else {
        return(
                <>
                    <div className='container-fluid-hidden' id='spinner'>
                        <h1>Procesando Compra...</h1>
                        <Spinner className='spinner' animation="border"/>
                    </div>
                    <form id="form" className='m-5' onSubmit={handlePostTicket}>
                        <div className="form-group mt-5">
                            <div className="form-group">
                                <label htmlFor="phone" className="col-12 col-md-2 col-form-label h2">Phone Number :</label>
                                <div className="col-12 col-md-10">
                                    <input type="tel" className="form-control" id="phone" placeholder="Phone Number" required/>
                                </div>
                            </div>
                        </div>
                        {ticket.remainingProducts.length > 0 && (
                            <div className="mt-5">
                            <h4>Productos con stock insuficiente:</h4>
                            <ul>
                                {ticket.remainingProducts.map((product) => (
                                <li key={product._id._id}>
                                    <strong>Producto: </strong> {product._id.title}, <strong>Cantidad solicitada: </strong> {product.quantity + product._id.stock}, <strong>Stock disponible: </strong> {product._id.stock}, <strong>Cantidad Restante: </strong> {product.quantity}
                                </li>
                                ))}
                            </ul>
                            </div>
                        )}
                        <div  className="form-group table-responsive">
                            <table  className="mt-5 mb-5 table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Sub Total</th>
                                    </tr>
                                </thead>
                                {ticket.products.products.map(product =>                  
                                <tbody key={product._id.code}>
                                    <tr>
                                        <td>{product._id.title}</td>
                                        <td>${product._id.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.quantity * product._id.price}</td>
                                    </tr>
                                </tbody>
                                )}
                                <tbody>
                                    <tr>
                                        <th colSpan="4" scope="col" className="text-right">
                                            <h2>total precio ${ticket.totalPrice}</h2>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center">
                                <div className="p-2">
                                    <Link className="btn btn-warning btn-block" aria-current="page" to={'/Productos'}>Seguir Comprando</Link>
                                </div>
                                <div className="p-2">
                                    <button className="btn btn-success btn-block" id="button"> Finalizar Compra</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ToastContainer/>
                </>
        )
    }
}

export default FinalizePurchase