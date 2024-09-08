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







// Obtiene las compras de un usuario por su ID
export const getProductsPurchases = async (id_user: number) => {
    const query = `
        SELECT 
            p.id AS purchase_id,
            p.total,
            p.purchase_date,
            pi.title,
            pi.price,
            pi.description,
            pi.category,
            pi.image
        FROM purchases p
        JOIN purchased_items pi ON p.id = pi.purchase_id
        WHERE p.user_id = ?;
    `;

    try {
        const result = await client.execute({
            sql: query,
            args: [id_user],
        });

        if (result.rows && result.rows.length > 0) {
            // Agrupar por `purchase_id` para estructurar los datos
            const purchases: Record<number, any> = {};

            for (const row of result.rows) {
                const purchaseId = row.purchase_id as number;

                if (!purchases[purchaseId]) {
                    purchases[purchaseId] = {
                        id: purchaseId,
                        total: row.total,
                        purchase_date: row.purchase_date,
                        items: [],
                    };
                }

                purchases[purchaseId].items.push({
                    title: row.title,
                    price: row.price,
                    description: row.description,
                    category: row.category,
                    image: row.image,
                });
            }

            return Object.values(purchases); // Retornar el array de compras
        } else {
            return []; // No hay compras
        }
    } catch (error: any) {
        console.error("Error al obtener las compras:", error);
        return [];
    }
};
