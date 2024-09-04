import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { RootState } from '../redux/store'; 
import { setProducts, setLoading, setError } from '../redux/reducers/productSlice'; 
import { Product } from '../interfaces/interfaceProduct'; 
import { fetchProducts } from '../api/productApi'; 
import { addToCart } from '../redux/reducers/cartSlice';
import { insertProduct } from '../controllers/cartController';

const Home_Productos: React.FC = () => {
    const dispatch = useDispatch();

    const products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);
    const error = useSelector((state: RootState) => state.products.error); 

    useEffect(() => {
        const loadProducts = async () => {
            dispatch(setLoading(true)); 

            try {
                const data = await fetchProducts(); 
                dispatch(setProducts(data)); 
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setError(error.message)); 
                } else {
                    dispatch(setError('Error desconocido')); 
                }
            } finally {
                dispatch(setLoading(false)); 
            }
        };

        loadProducts(); 
    }, [dispatch]); 

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    
    const buyProduct = async (product: Product) => {
        console.log(product)

        const modifiedProduct = {
            ...product,
            rating_rate: product.rating.rate,
            rating_count: product.rating.count,
        };

        try {
            await insertProduct(modifiedProduct);  // Inserta el producto en la base de datos
            dispatch(addToCart(product));  // Añade el producto al carrito en el estado global
        } catch (error) {
            console.error("Error al comprar el producto:", error);
        }
    }

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    {products.map((product: Product) => (
                        <div className="col-sm-6 col-md-3 col-lg-2 mb-4" key={product.title}>
                            <div className="card h-100 p-3 card-hover text-light">
                                <img src={product.image} className="card-img-top" alt={product.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title truncate">{product.title}</h5>
                                    <p className="card-text fw-bold text-danger">{product.price} €</p>
                                    <button onClick={() => buyProduct(product)} className="btn btn-primary mt-auto">Añadir al Carrito</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home_Productos;
