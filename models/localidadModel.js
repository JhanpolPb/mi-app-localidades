// models/localidadModel.js
import pool from '../db/connection.js'; // Importamos nuestra conexión a Railway


const LocalidadModel = {
  // 1. LEER (READ): Obtener todas las localidades
  getAll: async () => {
    // Ejecutamos la consulta SQL
    const [rows] = await pool.query('SELECT * FROM Localidad');
    return rows; // Retornamos los datos
  },


  // 2. CREAR (CREATE): Insertar una nueva localidad
  create: async (Cod_Localidad, Localidad) => {
    const query = 'INSERT INTO Localidad (Cod_Localidad, Localidad) VALUES (?, ?)';
    // Los signos de interrogación (?) son medidas de seguridad contra inyecciones SQL
    const [result] = await pool.query(query, [Cod_Localidad, Localidad]);
    return result;
  },


// 3. ACTUALIZAR (UPDATE): Modificar una localidad existente
update: async (Id_Localidad, Cod_Localidad, Localidad) => {
    // Usamos los signos de interrogación (?) por seguridad contra inyecciones SQL
    const query = 'UPDATE Localidad SET Cod_Localidad = ?, Localidad = ? WHERE Id_Localidad = ?';
    const [result] = await pool.query(query, [Cod_Localidad, Localidad, Id_Localidad]);
    return result;
  },


  // 4. BORRAR (DELETE): Eliminar una localidad
  delete: async (Id_Localidad) => {
    const query = 'DELETE FROM Localidad WHERE Id_Localidad = ?';
    const [result] = await pool.query(query, [Id_Localidad]);
    return result;
  }
};


export default LocalidadModel;
