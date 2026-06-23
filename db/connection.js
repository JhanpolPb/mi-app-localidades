// db/connection.js
import mysql from 'mysql2/promise'; // Importamos el paquete para MySQL

// Validamos que la variable exista para blindar nuestra aplicación contra caídas [cite: 183, 196]
if (!process.env.DATABASE_URL) {
  throw new Error("Por favor, define la variable DATABASE_URL en tu archivo .env.local");
}

// Creamos un "Pool" de conexiones. Un pool maneja múltiples conexiones 
// de forma eficiente sin tener que abrir y cerrar la base de datos a cada rato.
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, // Toma la URL dinámica inyectada por Next.js
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; // Exportamos la conexión para que el Modelo pueda usarla

console.log("DATABASE_URL =", process.env.DATABASE_URL);