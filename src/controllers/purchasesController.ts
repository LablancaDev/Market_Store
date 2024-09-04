import { Purchase } from "../interfaces/interfaceProduct";
import { insertPurchase } from "../models/purchasesModel";


export const insertPurchases = async (purchase: Purchase) => {
    try {
        await insertPurchase(purchase);
    } catch (error) {
        console.error("Error al insertar la compra:", error);
    }
};
