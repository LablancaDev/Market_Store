import client from "../data_base/db";

export const insertPurchase = async (purchase: {
    makePurchase: Array<{
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
    }>;
    total: number;
    purchase_date: string;
    user_id: number;
}) => {
    const queryPurchase = `
        INSERT INTO purchases (total, purchase_date, user_id)
        VALUES (?, ?, ?);
    `;

    const queryPurchasedItems = `
        INSERT INTO purchased_items (purchase_id, title, price, description, category, image)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    try {
        // Insertar la compra y obtener el ID
        const purchaseResult = await client.execute({
            sql: queryPurchase,
            args: [purchase.total, purchase.purchase_date, purchase.user_id],
        });

        const purchaseId: bigint | undefined = purchaseResult.lastInsertRowid; // Obtener el ID de la compra insertada

        if (purchaseId === undefined) {
            throw new Error("No se pudo obtener el ID de la compra.");
        }

        // Insertar los artículos comprados
        for (const item of purchase.makePurchase) {
            await client.execute({
                sql: queryPurchasedItems,
                args: [
                    purchaseId,
                    item.title,
                    item.price,
                    item.description,
                    item.category,
                    item.image,
                ],
            });
        }

        console.log("Compra y productos insertados con éxito");
    } catch (error) {
        console.error("Error al insertar la compra:", error);
    }
};
