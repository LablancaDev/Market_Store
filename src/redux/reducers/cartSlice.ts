import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, Product } from "../../interfaces/interfaceProduct"; // Importa la interfaz Product

// Define la estructura del estado del carrito
interface CartState {
    items: Product[]; 
    total: number; 
}

const initialState: CartState = {
    items: [], 
    total: 0 
};


const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: { 
     
        addToCart(state, action: PayloadAction<CartProduct>) {
           
            const existingItem = state.items.find(item => item.title === action.payload.title);
            if (existingItem) {
               
                existingItem.quantity! += 1; 
            } else {
              
                const productWithQuantity = { ...action.payload, quantity: 1 }; 
                state.items.push(productWithQuantity); 
            }
      
            state.total += action.payload.price;
        },
        increaseQuantity(state, action: PayloadAction<CartProduct>) {
            const existingItem = state.items.find(item => item.title === action.payload.title);
            if (existingItem) {
                existingItem.quantity! += 1;
                state.total += existingItem.price;
            }
        },
        decreaseQuantity(state, action: PayloadAction<CartProduct>) { 
            
            const existingItem = state.items.find(item => item.title === action.payload.title); 
            if (existingItem && existingItem.quantity! > 1) {
                existingItem.quantity! -= 1;
                state.total -= existingItem.price;
            } 
        },
    
        removeFromCart(state, action: PayloadAction<string>) {
     
            const index = state.items.findIndex(item => item.title === action.payload);
            if (index !== -1) { 
                const item = state.items[index];
                state.total -= item.price * item.quantity!; 
                state.items.splice(index, 1); 
            }
        },

        clearCart(state) {
            state.items = []; 
            state.total = 0; 
        },
    }
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
