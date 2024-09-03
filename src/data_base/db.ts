import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://e-commerce-lablancadev.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQ2OTI5MDUsInAiOnsicnciOnsibnMiOlsiMWYxNjhiNGMtODU2OC00ZWUyLWJmNTQtNjdkYzRmMGNmNjk5Il19fX0.bm27mgC2giYtdZent0wFMMu_0pi95Y26mbs5RUeenNX-K1Vnfmxfk_x8atCjIgf4bc1XUYu-pNl5QuDRBSMcCw', // Asegúrate de reemplazar con tu token
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

export default client;



