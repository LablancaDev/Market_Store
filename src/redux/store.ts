import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productSlice';
import authSlice from './reducers/authSlice';
import cartSlice from './reducers/cartSlice';
import purchasesSlice from './reducers/purchasesSlice';


const store = configureStore({
  reducer: {
    products: productReducer, 
    auth: authSlice, 
    cart: cartSlice,  
    purchase: purchasesSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
