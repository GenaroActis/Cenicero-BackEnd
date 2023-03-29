import React, { useState, useEffect, Fragment, useContext} from 'react'
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CartContext} from '../../context/CartContext';
import {doc, getDoc, getDocs, getFirestore, collection} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';



const  Producto = () => {
    const {addProduct, added} = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    
    const [product, setProduct] = useState({})
    const { id } = useParams();
    
    // fetch al link del json
    useEffect(() => {
        const db = getFirestore()
        const cardsProductsRef = doc(db, "items", id)
        getDoc(cardsProductsRef).then((snapshot)=>{
            if(snapshot.exists()){
                setProduct({id: snapshot.id, ...snapshot.data()})
            }
        })
        .finally(() => setLoading(false));
    }, []);
    // si esta cargando mostramos un spinner
    if (loading === true){
        return (
        
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    }
    return (
        <div key={id} id='detalleProducto'>
            <>
                <React.Fragment key={product.id}>
                    <div id='carousel'>
                        <Carousel variant="dark rounded">
                            <Carousel.Item>
                                <img
                                className="d-block w-100 img-fluid rounded"
                                src={product.img1}
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 rounded"
                                src={product.img2}
                                alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 rounded"
                                src={product.img3}
                                alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    {/* generamos la card con los detalles del producto */}
                    <div id='cardDetalles'>
                        <Card>
                            <Card.Body className='text-center'>
                                <Card.Title id='nombre' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">{product.nombre}</Card.Title>
                                <Card.Text id='medidas' className="display-3 shadow-lg p-3 mb-5 bg-white rounded">
                                Talle {product.talle} <br />
                                {product.medidas} 
                                </Card.Text>
                                <Card.Text id='precio' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">
                                ${product.precio}
                                </Card.Text>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                <button id='botonAgregar' onClick={()=>{
                                    // funcion agregado en boton
                                    added()
                                    // llamamos la funcion de agregar producto y guardar en el LocalStorage
                                        addProduct(product);
                                }} type="button" className='btn btn-lg btn-outline-primary'>agregar</button>
                                </div>
                                <ToastContainer/>
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            </>
        </div>
    )
};



export default Producto