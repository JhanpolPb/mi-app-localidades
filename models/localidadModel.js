// models/localidadModel.js
import pool from '../db/connection.js';

const LocalidadModel = {
  // READ: Obtener todas las localidades ordenadas por ID
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM localidad ORDER BY ID_LOCALIDAD');
    return rows;
  },

  // CREATE: Insertar una nueva localidad
  create: async (nombre) => {
    const [result] = await pool.query(
      'INSERT INTO localidad (NOMBRE_LOCALIDAD) VALUES (?)',
      [nombre]
    );
    return result;
  },

  // UPDATE: Modificar una localidad existente
  update: async (id, nombre) => {
    const [result] = await pool.query(
      'UPDATE localidad SET NOMBRE_LOCALIDAD = ? WHERE ID_LOCALIDAD = ?',
      [nombre, id]
    );
    return result;
  },

  // DELETE: Eliminar una localidad
  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM localidad WHERE ID_LOCALIDAD = ?',
      [id]
    );
    return result;
  },
};

export default LocalidadModel;
