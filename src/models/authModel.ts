import client from '../data_base/db'; 
import { Row } from '@libsql/client';

interface User {
    id?: number; // Cambiado a number para que coincida con AUTOINCREMENT
    user: string;
    password: string;
    email: string;
}

export const createUser = async (user: User): Promise<User> => {
    try {
        const query = `
            INSERT INTO users (user, password, email)
            VALUES (?, ?, ?);
        `;
        const result = await client.execute({
            sql: query,
            args: [user.user, user.password, user.email]
        });

        console.log('Insert result Ok:', result); 

        return user;
    } catch (error: any) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Busca un usuario por correo electrónico en la base de datos
export const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const query = `
            SELECT * FROM users
            WHERE email = ?;
        `;
        const result = await client.execute({
            sql: query,
            args: [email]
        });

        if (result.rows.length > 0) {
            const foundUser = result.rows[0] as any;
            return {
                id: foundUser.id,
                user: foundUser.user,
                password: foundUser.password,
                email: foundUser.email
            } as User;
        }

        return null;
    } catch (error: any) {
        throw new Error('Error finding user: ' + error.message);
    }
};
 