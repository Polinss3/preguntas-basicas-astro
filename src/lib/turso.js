import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log("Database URL:", url);
console.log("Auth Token:", authToken);

const turso = createClient({
  url,
  authToken
});

console.log("Turso client:", turso);

// Prueba de consulta simple
async function testConnection() {
  try {
    const result = await turso.execute("SELECT * FROM questionsTable");
    console.log("Test query result:", result);
  } catch (error) {
    console.error("Error executing test query:", error);
  }
}

testConnection();

export default turso;
