import { Row } from "@libsql/client";
import client from "../data_base/db"; 

export const getProductsFromCart = async () => {
    const query = `
        SELECT * FROM cart;
    `;

    try {
        const result = await client.execute({
            sql: query,
            args: [] 
        });

        if (result.rows) {
            return result.rows;
        } else {
            return []; 
        }
    } catch (error: any) {
        throw new Error('Error al obtener productos del carrito: ' + error.message);
    }
};

export const insertProductCart = async (product: {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating_rate: number;
    rating_count: number;
}) => {
    const query = `
        INSERT INTO cart (title, price, description, category, image, rating_rate, rating_count)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    try {
        await client.execute({
            sql: query,
            args: [
                product.title,
                product.price,
                product.description,
                product.category,
                product.image,
                product.rating_rate,
                product.rating_count,
            ],
        });
        console.log('Producto insertado en el carrito exitosamente');
    } catch (error: any) {
        throw new Error('Error al insertar producto en el carrito: ' + error.message);
    }
};

export const removeProduct = async (productTitle: string): Promise<void> => {
    const query = `
        DELETE FROM cart
        WHERE title = ?;
    `;

    try {
        const result = await client.execute({
            sql: query,
            args: [productTitle], 
        });

        if (result.rowsAffected === 0) {
            throw new Error(`Producto con título "${productTitle}" no encontrado`);
        }

        console.log(`Producto con título "${productTitle}" eliminado del carrito exitosamente`);
    } catch (error: any) {
        throw new Error('Error al eliminar producto del carrito: ' + error.message);
    }
};


export const findProductByTitle = async (title: string): Promise<Row | null> => {
    const query = `
        SELECT * FROM cart WHERE title = ?;
    `;

    try {
        const result = await client.execute({
            sql: query,
            args: [title],
        });

        if (result.rows && result.rows.length > 0) {
            return result.rows[0]; 
        } else {
            return null; 
        }
    } catch (error: any) {
        console.error("Error al buscar el producto:", error);
        return null;
    }
};