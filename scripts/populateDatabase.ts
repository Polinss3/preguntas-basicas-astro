import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = axios.create({
  baseURL: process.env.DATABASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.DATABASE_AUTH}`
  }
});

const elementos = [
  { nombre: 'Elemento 1', descripcion: 'Descripción del elemento 1' },
  { nombre: 'Elemento 2', descripcion: 'Descripción del elemento 2' },
  // Añade más elementos según sea necesario
];

async function addElement(element: { nombre: string, descripcion: string }) {
  try {
    const insertQuery = `
      INSERT INTO elementos (nombre, descripcion)
      VALUES ($1, $2)
    `;
    await client.post('/query', {
      query: insertQuery,
      parameters: [element.nombre, element.descripcion]
    });
    console.log('Elemento añadido:', element);
  } catch (error) {
    console.error('Error al añadir el elemento:', error);
  }
}

async function populateDatabase() {
  for (const element of elementos) {
    await addElement(element);
  }
  console.log('Población de la base de datos completa.');
}

populateDatabase();
