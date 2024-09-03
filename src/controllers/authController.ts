import { createUser, findUserByEmail } from '../models/authModel';

// Validación del backend en la función que interactua con el modelo para registrar al usuario
export const registerNewUser = async (userName: string, password: string, email: string) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error('El usuario ya existe');
    }
    
    if (userName === "" || password === "" || email === "") {
        throw new Error("No puede registrarse sin rellenar los campos");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new Error("El formato del email no es válido");
    }

    if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    const newUser = await createUser({ user: userName, password, email });
    return newUser;
};


export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user || user.password !== password) {
        throw new Error('Credenciales invalidas');
    }
    return user;
};


