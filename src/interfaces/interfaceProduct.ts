// Define la estructura básica de un producto que proviene de la API externa
export interface Product {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
    rating: {
        rate: number;
        count: number;
    };
}

// Extiende la interfaz Product añadiendo quantity, que es específico para los productos que están en el carrito.
// Esta herencia permite que un CartProduct contenga toda la información de un Product, más cualquier información adicional necesaria para la lógica del carrito.
export interface CartProduct extends Product {
    quantity: number;// Solo para los productos en el carrito
}


// Define la estructura de los datos que provienen de la base de datos.  
// La interfaz Row ayuda a mapear los datos correctamente en la función fetchProductsFromCart.
export interface Row {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating_rate: number; 
    rating_count: number; 
}
