import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../interfaces/interfaceProduct'


interface purchases {
    makePurchase: Product[]
    total: number
    purchase_date: string,
    user_id: number
}

const initialState: purchases = {
    makePurchase: [],
    total: 0,
    purchase_date: "",
    user_id:0,
}

const purchasesSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        addPurchases(state, action) {
            state.makePurchase = action.payload
            state.total = action.payload.total;
            state.purchase_date = action.payload.date;
            state.user_id = action.payload.user_id; 
        },
        clearCart(state) {
            state.makePurchase = [];
            state.total = 0;
            state.purchase_date = "";
            state.user_id = 0;
        },
    }
})

export const { addPurchases, clearCart } = purchasesSlice.actions;
export default purchasesSlice.reducer;