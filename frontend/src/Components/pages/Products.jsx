import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer} from 'react-toastify';
import { ProductContext } from '../../context/ProductContext'

const Category = () => {
    const { getProducts } = useContext(ProductContext)
    const [cardsProducts, setCardsProducts] = useState([]);
    const [pagData, setPagData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState('todos');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await getProducts();
            setCardsProducts(data.results);
            setPagData(data.info);
            console.log(data.info)
            setLoading(false);
            } catch (error) {
            console.error('Error:', error);
            }
        };
        fetchData();
    }, [getProducts]);

    const clickCategoria = (nuevaCategoria) => {
        setCategoria(nuevaCategoria);
        navigate (`/Category/${nuevaCategoria}`)
    };

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando {categoria}...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    } else {
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
                {cardsProducts.map((product) => (
                    <Link key={product._id} className="nav-link" aria-current="page" to={`/Producto/${product.id}`}>
                        <div className="card text-dark mt-5">
                            {/* <img src={product.img1} className="card-img-top mt-2 img-fluid" alt="" srcSet="" />
                            <img src={product.img2} className="card-img img-fluid" id="img2" alt="" srcSet="" /> */}
                            <div className="card-body">
                                <h1 className="card-title">{product.title}</h1>
                                <h2>Talle {product.size}</h2>
                                <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.price}</h1>
                            </div>
                        </div>
                    </Link>
                ))}
            <ToastContainer/>
            </div>
        </div>
        {/* <div className="d-flex justify-content-center m-5">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><Link className="page-link" to={`/Producto/${}`}>Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to={`/Producto/${}`}>1</Link></li>
                    <li className="page-item"><Link className="page-link" to={`/Producto/${}`}>2</Link></li>
                    <li className="page-item"><Link className="page-link" to={`/Producto/${}`}>3</Link></li>
                    <li className="page-item"><Link className="page-link" to={`/Producto/${}`}>4</Link></li>
                    <li className="page-item"><Link className="page-link" to={`/Producto/${}`}>Next</Link></li>
                </ul>
            </nav>
        </div> */}
        </>
        )
    }
}

export default Category