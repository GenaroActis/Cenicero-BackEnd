import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDocs, getFirestore, collection} from 'firebase/firestore'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer} from 'react-toastify';

const Category = () => {
    
    const categorias = useParams();
    const [cardsProducts, setCardsProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState('todos');


    useEffect(() => {
        const db = getFirestore()
        const cardsProductsRef = collection(db, "items")
        getDocs(cardsProductsRef).then((snapshot)=>{
            setCardsProducts(snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}) ))
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando {categoria}...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    }
    
    const clickCategoria = (nuevaCategoria) => {
        setCategoria(nuevaCategoria);
        navigate (`/Category/${nuevaCategoria}`)
    };

    const productosFiltrados = categorias.CategoryId === 'todos' ? cardsProducts : 
    cardsProducts.filter((producto) => producto.categoria === categorias.CategoryId);


    return (
        <>
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <DropdownButton id="dropdown-button-drop-down-centered" drop="down-centered" variant="warning" title="Categorias">
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('todos')} >Todos</Dropdown.Item>
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('chomba')} >Chombas</Dropdown.Item>
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('remera')} >Remeras</Dropdown.Item>
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('gorra')} >Gorras</Dropdown.Item>
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('campera')} >Camperas</Dropdown.Item>
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('bermuda')} >Bermudas</Dropdown.Item>
            <Dropdown.Item className='text-center' onClick={() => clickCategoria('camisa')} >Camisas</Dropdown.Item>
        </DropdownButton>
            <div className="row" id="productos">
            {productosFiltrados.map((product) => (
                <Link key={product.id} className="nav-link" aria-current="page" to={`/Producto/${product.id}`}>
                    <div className="card text-dark mt-5">
                        <img src={product.img1} className="card-img-top mt-2 img-fluid" alt="" srcSet="" />
                        <img src={product.img2} className="card-img img-fluid" id="img2" alt="" srcSet="" />
                        <div className="card-body">
                            <h1 className="card-title">{product.nombre}</h1>
                            <h2>Talle {product.talle}</h2>
                            <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.precio}</h1>
                        </div>
                    </div>
                </Link>
            ))}
            <ToastContainer/>
            </div>
        </div>
    </>
    )
}

export default Category