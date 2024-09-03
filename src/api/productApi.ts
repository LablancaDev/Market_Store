// Archivo que se encarga de realizar la llamada a la API externa y obtener los Productos

import { Product } from '../interfaces/interfaceProduct'; // interfaz Product para tipar los datos

const API_URL = "https://fakestoreapi.com/products";


export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }
    return await response.json() as Product[]; 

};



