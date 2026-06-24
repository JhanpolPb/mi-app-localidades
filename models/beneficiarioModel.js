// models/beneficiarioModel.js
import pool from '../db/connection.js';

const BeneficiarioModel = {
  // READ: Todos los beneficiarios con JOINs descriptivos
  getAll: async () => {
    const query = `
      SELECT
        b.ID_BENEFICIARIO,
        c.NOMBRE_CONVOCATORIA,
        l.NOMBRE_LOCALIDAD  AS LOCALIDAD,
        i.NOMBRE_INSTITUCION,
        p.NOMBRE_PROGRAMA,
        s.NOMBRE_SEXO,
        e.NOMBRE_EDAD,
        ge.NOMBRE_GRUPO_ETNICO,
        d.NOMBRE_DISCAPACIDAD,
        si.NOMBRE_SISBEN,
        b.CANTIDAD
      FROM beneficiario b
      JOIN convocatoria          c  ON b.ID_CONVOCATORIA         = c.ID_CONVOCATORIA
      JOIN localidad             l  ON b.ID_LOCALIDAD            = l.ID_LOCALIDAD
      JOIN institucion           i  ON b.ID_INSTITUCION          = i.ID_INSTITUCION
      JOIN programa              p  ON b.ID_PROGRAMA             = p.ID_PROGRAMA
      JOIN sexo                  s  ON b.ID_SEXO                 = s.ID_SEXO
      JOIN edad                  e  ON b.ID_EDAD                 = e.ID_EDAD
      JOIN grupo_etnico          ge ON b.ID_GRUPO_ETNICO         = ge.ID_GRUPO_ETNICO
      JOIN discapacidad          d  ON b.ID_DISCAPACIDAD         = d.ID_DISCAPACIDAD
      JOIN sisben                si ON b.ID_SISBEN               = si.ID_SISBEN
      ORDER BY b.ID_BENEFICIARIO
      LIMIT 200
    `;
    const [rows] = await pool.query(query);
    return rows;
  },
};

export default BeneficiarioModel;
