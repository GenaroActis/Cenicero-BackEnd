import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {CartContext} from '../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import Spinner from 'react-bootstrap/Spinner';
    

const FinalizarCompra = () => {

    // toastify
    const notify1 = () => toast.error('Completar Datos!', {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    );

    const notify2 = () => toast.error(`error al enviar la compra! Intenta de nuevo mas tarde`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    );

    const notify3 = () => toast.success('Compra Realizada con exito!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    );


    const [user_name, setName] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_phone, setPhone] = useState('');

    
    const spinner = document.getElementById('spinner')

    // const sendEmail = (event) => {
    //     event.preventDefault();

    //     if(user_email === '' || user_name === ''){
    //         notify1();
    //     } else{
    //         spinner.classList.add("container-fluid");
    //             setTimeout(()=>{
    //                 spinner.classList.remove("container-fluid")
    //                 spinner.classList.add("container-fluid-hidden");
    //             }, 3000)
    //         // enviamos la orden a la base de datos
    //         const order = {
    //             buyer: {
    //                 name: user_name,
    //                 phone: user_phone,
    //                 email: user_email
    //             },
    //             items: addedProducts,
    //             total: totalPrice
    //         }
    //         addDoc(ordersCollection, order)
    //         .then (() =>{
    //         // hacemos uso de emailjs
    //         emailjs.sendForm("service_hk938ah","template_nv80xgt", event.target, 'rjRJ6bGSxalv96eIB')
    //         .then(() => {
    //             notify3()
    //             setTimeout(()=>{
    //                 window.location.href = "/cenicero-backend";
    //                 cleanCart();
    //             },2500)
    //         }, (error) => {
    //             console.log(error.text);
    //             notify2();
    //         });
    //         }).catch(() => {
    //             notify2();
    //         });
    //     }
    // }



    return (
    <>
        {/* <div className='container-fluid-hidden' id='spinner'>
            <h1>Procesando Compra...</h1>
            <Spinner className='spinner' animation="border"/>
        </div>
        <form id="form" className='m-5' onSubmit={sendEmail}>
            <div className="form-group mt-5">
                <label htmlFor="cliente" className="col-12 col-md-2 col-form-label h2">Cliente :</label>
                    <div className="col-12 col-md-10">
                        <input type="text" name="user_name" className="form-control" id="persona" placeholder="Nombre y Apellido"  onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-12 col-md-2 col-form-label h2">Correo :</label>
                    <div className="col-12 col-md-10">
                        <input type="email" name="user_email" className="form-control" id="email" placeholder="Correo Electronico" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="col-12 col-md-2 col-form-label h2">Celular :</label>
                    <div className="col-12 col-md-10">
                        <input type="tel" name="user_phone" className="form-control" id="phone" placeholder="Numero" onChange={(event) => setPhone(event.target.value)}/>
                    </div>
                </div>
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
                    {addedProducts.map(product =>                  
                    <tbody key={product.id}>
                        <tr>
                            <td>{product.nombre}</td>
                            <td>${product.precio}</td>
                            <td>{product.elegidos}</td>
                            <td>${product.precioSubTotal}</td>
                        </tr>
                    </tbody>
                    )}
                    <tbody>
                        <tr>
                            <th colSpan="4" scope="col" className="text-right">
                                <h2>total precio ${totalPrice}</h2>
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
        <ToastContainer/> */}
    </>
    )
}

export default FinalizarCompra