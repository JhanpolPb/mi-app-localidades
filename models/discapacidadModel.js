// models/discapacidadModel.js
import pool from '../db/connection.js';

const DiscapacidadModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM discapacidad ORDER BY ID_DISCAPACIDAD');
    return rows;
  },

  update: async (id, nombre) => {
    const [result] = await pool.query(
      'UPDATE discapacidad SET NOMBRE_DISCAPACIDAD = ? WHERE ID_DISCAPACIDAD = ?',
      [nombre, id]
    );
    return result;
  },
};

export default DiscapacidadModel;
