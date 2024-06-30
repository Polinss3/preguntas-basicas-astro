import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = axios.create({
  baseURL: process.env.DATABASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.DATABASE_AUTH}`
  }
});

async function setupDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS elementos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT
      );
    `;
    await client.post('/query', { query: createTableQuery });
    console.log('La tabla se ha creado o ya existía.');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
}

setupDatabase();
