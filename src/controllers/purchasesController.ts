import { Purchase } from "../interfaces/interfaceProduct";
import { getProductsPurchases, insertPurchase } from "../models/purchasesModel";


export const insertPurchases = async (purchase: Purchase) => {
    try {
        await insertPurchase(purchase);
    } catch (error) {
        console.error("Error al insertar la compra:", error);
    }
};


// Obtiene las compras de un usuario por su ID
export const getPurchases = async (id_user: number) => {
    try {
        const purchases = await getProductsPurchases(id_user);
        return purchases;
    } catch (error) {
        console.error("Error al obtener las compras:", error);
        return null;
    }
};