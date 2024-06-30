import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta al directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al script de Python
const scriptPath = path.join(__dirname, 'scripts', 'populate_db.py');

// Ejecutar el script de Python
exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar el script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error en el script: ${stderr}`);
        return;
    }
    console.log(`Salida del script:\n${stdout}`);
});
