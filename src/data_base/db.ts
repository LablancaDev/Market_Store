import { createClient } from '@libsql/client';

const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL, 
  authToken: import.meta.env.VITE_AUTH_TOKEN, 
});

async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `;

  await client.execute(query);
}

createUsersTable()
  .then(() => {
    console.log('Tabla de usuarios creada con éxito');
  })
  .catch((error) => {
    console.error('Error al crear la tabla de usuarios:', error);
  });

//exportación ES6 modules.
export default client;
// module.exports: Utilizado en CommonJS, forma tradicional de exportar en Node.js.