import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Product } from '../interfaces/interfaceProduct'
import { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } from '../redux/reducers/cartSlice';
import { fetchProductsFromCart, insertProduct, removeProductCart } from '../controllers/cartController';
import { useEffect } from 'react';

function Cart() {

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.cart.items)
    const total = useSelector((state: RootState) => state.cart.total)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Llamada para obtener productos del carrito desde la base de datos.
                const productsFromDb = await fetchProductsFromCart();
              
                if (Array.isArray(productsFromDb)) {
                    productsFromDb.forEach(product => {
                        dispatch(addToCart(product)); 
                        console.log("Productos en el carrito: ", product);
                    });
                }
            } catch (error) {
                console.error("Error al cargar los productos del carrito:", error);
            }
        };

        loadProducts();
    }, [dispatch]);


    const buyProduct = async (product: Product) => {
        console.log(product)

        const modifiedProduct = {
            ...product, 
            rating_rate: product.rating.rate,  
            rating_count: product.rating.count, 
        };
        try {
            await insertProduct(modifiedProduct); 
        } catch (error) {
            console.error("Error al comprar el producto:", error);
        }
    }


    const removeProduct = (productTitle: string) => {
        removeProductCart(productTitle)
        dispatch(removeFromCart(productTitle));
    };

    const increaseQuantityProduct = (productTitle: Product) => {
        dispatch(increaseQuantity(productTitle));
    };

    const decreaseQuantityProduct = (productTitle: Product) => {
        dispatch(decreaseQuantity(productTitle));
    };

    const clearTotalCart = () => {
        dispatch(clearCart());
    };

    return (
        <>
            <div className="container-fluid">
                <h2 className='text-center my-4'>Carrito de Compras</h2>
                <div className='border rounded w-50 m-auto d-flex justify-content-evenly align-items-center'>
                    <img src="../src/assets/imgs/cart.png" alt="" />
                    <h3 className='text-light text-center'><i className="bi bi-cart3"></i> Total: {total.toFixed(2)} €</h3>
                </div>
                <button onClick={clearTotalCart} className='btn btn-secondary mb-3'>Vaciar Carrito</button>
                {products.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    <div className="row">
                      
                        {products.map(product => (
                            <div className="col-sm-6 col-md-3 col-lg-2 mb-4" key={product.title}> 
                                <div className="card h-100 p-3 card-hover text-light">
                                    <p className='text-center'>
                                        <button onClick={() => increaseQuantityProduct(product)} className="btn btn-warning mt-auto w-25">+</button>
                                        <span className='text-danger mx-2'>{product.quantity}</span>
                                        <button onClick={() => decreaseQuantityProduct(product)} className="btn btn-warning mt-auto w-25">-</button>
                                    </p>
                                    <img src={product.image} className="card-img-top" alt={product.title} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text fw-bold text-danger">{product.price} €</p>
                                        <div className='d-flex justify-content-center gap-1 h-100'>
                                            <button onClick={() => buyProduct(product)} className="btn btn-success mt-auto">Comprar</button>
                                            <button onClick={() => removeProduct(product.title)} className="btn btn-danger mt-auto">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;