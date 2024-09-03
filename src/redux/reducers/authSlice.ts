
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define la interfaz `AuthState` que representa el estado de autenticación.
interface AuthState {
    user: null | { id: number; name: string; password: string; email: string };
    loading: boolean; 
    error: string | null; 
}

// Estado inicial del slice de autenticación.
const initialState: AuthState = {
    user: null, 
    loading: false, 
    error: null, 
};

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
    
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload; 
        },
       
        setUser(state, action: PayloadAction<{ id: number; name: string; password: string; email: string }>) {
            state.user = action.payload; 
            state.error = null;
        },
      
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload; 
        },
     
        logout(state) {
            state.user = null; 
        },
    },
});


export const { setLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;
