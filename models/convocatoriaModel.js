// models/convocatoriaModel.js
import pool from '../db/connection.js';

const ConvocatoriaModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM convocatoria ORDER BY ID_CONVOCATORIA');
    return rows;
  },

  update: async (id, nombre) => {
    const [result] = await pool.query(
      'UPDATE convocatoria SET NOMBRE_CONVOCATORIA = ? WHERE ID_CONVOCATORIA = ?',
      [nombre, id]
    );
    return result;
  },
};

export default ConvocatoriaModel;
