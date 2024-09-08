import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../interfaces/interfaceProduct';
import { addToCart, removeFromCart, decreaseQuantity, increaseQuantity } from '../redux/reducers/cartSlice';
import { fetchProductsFromCart, removeProductCart } from '../controllers/cartController';
import { useEffect, useState } from 'react';
import { addPurchases, clearCart } from '../redux/reducers/purchasesSlice';
// import { useNavigate } from 'react-router-dom';
import { insertPurchases } from '../controllers/purchasesController';

function Cart() {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.cart.items);
    const total = useSelector((state: RootState) => state.cart.total);
    const myPurchases = useSelector((state: RootState) => state.purchase.makePurchase)
    // const date = useSelector((state: RootState) => state.purchase.purchase_date)
    const userId = useSelector((state: RootState) => state.auth.user)


    const [message, setMessage] = useState(false)

    // Usar useEffect para cargar productos del carrito desde la base de datos
    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Llamada para obtener productos del carrito desde la base de datos.
                const productsFromDb = await fetchProductsFromCart();

                if (Array.isArray(productsFromDb)) {
                    productsFromDb.forEach(product => {
                        // Comprobar si el producto ya existe en el estado
                        const productInState = products.find(p => p.title === product.title);
                        if (!productInState) {
                            // Añadir el producto al estado de Redux solo si no está presente
                            dispatch(addToCart(product));
                            console.log("Producto cargado desde la base de datos:", product);
                        }
                    });
                }
            } catch (error) {
                console.error("Error al cargar los productos del carrito:", error);
            }
        };

        loadProducts();
    }, [dispatch, products]); // Agregar productos en la lista de dependencias


    const removeProduct = (productTitle: string) => {
        removeProductCart(productTitle);
        dispatch(removeFromCart(productTitle));
    };

    const increaseQuantityProduct = (productTitle: Product) => {
        dispatch(increaseQuantity(productTitle));
    };

    const decreaseQuantityProduct = (productTitle: Product) => {
        dispatch(decreaseQuantity(productTitle));
    };


    const handlePurchase = async () => {
        // Cconstruccion de objeto con los datos enviados
        try {
            const purchase = {
                makePurchase: products,
                total: total,
                purchase_date: new Date().toISOString(),
                user_id:userId?.id || 0
            }

            if (!purchase.user_id) {
                console.error("user_id no está definido, Inicia Sesión primero!!!");
                alert("Inicia Sesión antes de realizar una compra")
                return; // Deten la ejecución si no hay user_id
            }

            // Actualizar estado global con las compras realizadas 
            dispatch(addPurchases(purchase))
            if (purchase) {
                setMessage(true)
            }
            setTimeout(() => {
                setMessage(false)
            }, 2000);
            // dispatch(addPurchases(products))
            
            
            // navigate("/homeproducts")
            
            // Backend: añadir el total de productos al objeto y a la Base de datos (quantity), 
            // DESPUÉS CREAR UNA PÁGINA DONDE EL USUARIO PUEDA VISUALIZAR EL HISTORIAL DE LAS COMPRAS RALIZADAS Y DESCARGAR SU FACTURA PDF.
            await insertPurchases(purchase)
            
            dispatch(clearCart()); // arreglar...

            console.log("Compra realizada con éxito");
        } catch (error) {
            console.error("Error al realizar la compra:", error);
        }
    }



    console.log("Compras Finalizadas: ", myPurchases)

    return (
        <>
            <div className="container-fluid mb-5">
                <h2 className='text-center my-4 text-light'>Carrito de Compras</h2>
                <div className='border rounded w-50 m-auto d-flex flex-column justify-content-evenly align-items-center p-4 mb-3 card-hover'>
                    <div className='d-flex justify-content-evenly align-items-center gap-5'>
                        <img src="../src/assets/imgs/cart.png" alt="" />
                        <h3 className='text-light text-center'><i className="bi bi-cart3"></i> Total: <span className='text-danger'>{total.toFixed(2)} €</span></h3>
                    </div>
                    <div className='d-flex flex-column'>
                        <h3 className=''>Total de Productos en el carrito: {products.reduce((acc, product) => acc + product.quantity, 0)}</h3>
                        <button onClick={handlePurchase} className='btn btn-success w-50 m-auto'>Realizar compra</button>
                        {message && <h4 className='text-center text-success bg-light rounded p-1 mt-2'>Compra relizada con éxito!!!</h4>}
                    </div>
                </div>
                {products.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    <div className="row">
                        {products.map(product => (
                            <div className="col-sm-6 col-md-3 col-lg-2 mb-5" key={product.title}>
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
