import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productSlice';
import authSlice from './reducers/authSlice';
import cartSlice from './reducers/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer, 
    auth: authSlice, 
    cart: cartSlice  
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
