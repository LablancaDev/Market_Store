import { findProductByTitle, getProductsFromCart, insertProductCart, removeProduct } from "../models/cartModel";
import { CartProduct, Product } from "../interfaces/interfaceProduct";
import { Row } from "@libsql/client";


// Esta función obtendrá los productos del carrito de forma asincrónica
export const fetchProductsFromCart = async (): Promise<CartProduct[]> => {
    try {
        // transforma los datos del formato Row al formato CartProduct, y devuelve un array de CartProduct[].
        const products: Row[] = await getProductsFromCart();
        // Después de obtener los productos, fetchProductsFromCart utiliza el método map para transformar cada objeto Row en un objeto CartProduct.
        return products.map(row => ({
            title: row.title,
            price: row.price,
            description: row.description,
            category: row.category,
            image: row.image,
            rating: {
                rate: row.rating_rate,  
                count: row.rating_count   
            },
            quantity: 1, 

        })) as CartProduct[]; 
      
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        return []; 
    }
};

export const insertProduct = async (product: Product) => {

    const productToInsert = {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating_rate: product.rating.rate, 
        rating_count: product.rating.count 
    };

    try {
      
        const existingProduct = await findProductByTitle(product.title);

        if (existingProduct) {
            console.log("El producto ya existe");
        } else {
            await insertProductCart(productToInsert); 
            console.log('Producto insertado en el carrito exitosamente');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error al insertar producto: ' + error.message);
        } else {
            throw new Error('Error desconocido al insertar producto');
        }
    }
};

export const removeProductCart = async (productTitle: string): Promise<void> => {
    try {
        await removeProduct(productTitle);
        console.log(`Producto con título "${productTitle}" eliminado del carrito`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error al eliminar producto: ' + error.message);
        } else {
            console.error('Error desconocido al eliminar producto');
        }
    }
};


