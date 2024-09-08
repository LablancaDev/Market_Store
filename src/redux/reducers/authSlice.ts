import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define la interfaz `AuthState` que representa el estado de autenticación.
interface AuthState {
    user: null | { id: number; name: string; password: string; email: string };
    loading: boolean;
    error: string | null;
}

// Obtener el estado inicial del usuario desde `localStorage` si existe.
const userFromLocalStorage = localStorage.getItem('user');
const initialUser = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

// Estado inicial del slice de autenticación.
const initialState: AuthState = {
    user: initialUser, // Utilizamos el usuario del localStorage si está disponible
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        // Establece el estado de carga
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        // Establece el usuario en el estado y en localStorage
        setUser(state, action: PayloadAction<{ id: number; name: string; password: string; email: string }>) {
            state.user = action.payload;
            state.error = null;

            // Guardar usuario en `localStorage`
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        // Establece un error
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },

        // Cerrar sesión (elimina el usuario del estado y de `localStorage`)
        logout(state) {
            state.user = null;

            // Eliminar el usuario de `localStorage`
            localStorage.removeItem('user');
        },
    },
});

// Exportar las acciones
export const { setLoading, setUser, setError, logout } = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;
