import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getPurchases } from '../controllers/purchasesController'

const MyPurchases = () => {

    interface PurchaseItem {
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
    }

    interface Purchase {
        id: number;
        purchase_date: string;
        items: PurchaseItem[];
        total: number;
    }
    
 
    const id_user = useSelector((state: RootState) => state.auth.user?.id)     

    const [my_purchases, setPurchases] = useState<Purchase[]>([])

    useEffect(() => {
        const fetchPurchasesFromUser = async () => {
            if (typeof id_user === 'undefined'){
                alert('id no encontrado, inicia sesión...')
                return;  // Manejar el caso cuando id_user es undefined
            } 
                

            try {
                const response = await getPurchases(id_user)
                if (response) {
                    setPurchases(response)
                }
            } catch (error) {
                console.log("Error al obtener las compras:", error);
            }
        }
        fetchPurchasesFromUser()
    }, [id_user])
    

    return (
        <div className='container-fluid mt-5'>
            {my_purchases.map(purchase => (
                <div key={purchase.id}>
                    <h3 className='text-light'>
                        Compra del {new Date(purchase.purchase_date).toLocaleDateString()}:
                    </h3>
                    <div className="d-flex flex-wrap justify-content-start gap-3 py-4">
                        {purchase.items.map(item => (
                            <div className="card p-3 card-hover text-light" key={item.title} style={{ width: '200px' }}>
                                <img src={item.image} alt={item.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <h5 className="text-center text-danger">{item.price} €</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyPurchases;
