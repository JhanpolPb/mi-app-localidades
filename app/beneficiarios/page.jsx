'use client';
import { useState, useEffect } from 'react';
import s from '../shared.module.css';

export default function BeneficiariosPage() {
  const [datos, setDatos]       = useState([]);
  const [filtro, setFiltro]     = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch('/api/beneficiarios')
      .then((r) => r.json())
      .then((d) => { setDatos(Array.isArray(d) ? d : []); setCargando(false); })
      .catch(() => { setError('Error al conectar con la base de datos.'); setCargando(false); });
  }, []);

  const filtrados = datos.filter((b) =>
    Object.values(b).some((v) =>
      String(v).toLowerCase().includes(filtro.toLowerCase())
    )
  );

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Beneficiarios</h1>
        <span className={`${s.badge} ${s.badgeGreen}`}>Vista de Consulta</span>
        <span className={s.qty}>{filtrados.length} registros</span>
      </div>

      {error && <div className={`${s.msg} ${s.msgError}`}>{error}</div>}

      <input
        className={s.search}
        placeholder=" Buscar en cualquier campo..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {cargando ? (
        <div className={`${s.msg} ${s.msgInfo}`}>Cargando datos...</div>
      ) : (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Convocatoria</th>
                <th>Localidad</th>
                <th>Institución</th>
                <th>Programa</th>
                <th>Sexo</th>
                <th>Edad</th>
                <th>Grupo Étnico</th>
                <th>Discapacidad</th>
                <th>Sisben</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 ? (
                <tr><td colSpan={11} className={s.empty}>Sin resultados</td></tr>
              ) : (
                filtrados.map((b) => (
                  <tr key={b.ID_BENEFICIARIO}>
                    <td>{b.ID_BENEFICIARIO}</td>
                    <td>{b.NOMBRE_CONVOCATORIA}</td>
                    <td>{b.LOCALIDAD}</td>
                    <td>{b.NOMBRE_INSTITUCION}</td>
                    <td>{b.NOMBRE_PROGRAMA}</td>
                    <td>{b.NOMBRE_SEXO}</td>
                    <td>{b.NOMBRE_EDAD}</td>
                    <td>{b.NOMBRE_GRUPO_ETNICO}</td>
                    <td>{b.NOMBRE_DISCAPACIDAD}</td>
                    <td>{b.NOMBRE_SISBEN}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{b.CANTIDAD}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
