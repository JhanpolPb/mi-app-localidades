'use client';
import { useState, useEffect } from 'react';
import s from '../shared.module.css';

export default function ProgramasPage() {
  const [datos, setDatos]       = useState([]);
  const [filtro, setFiltro]     = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch('/api/programas')
      .then((r) => r.json())
      .then((d) => { setDatos(Array.isArray(d) ? d : []); setCargando(false); })
      .catch(() => { setError('Error al conectar con la base de datos.'); setCargando(false); });
  }, []);

  const filtrados = datos.filter(
    (p) =>
      p.NOMBRE_PROGRAMA.toLowerCase().includes(filtro.toLowerCase()) ||
      p.NOMBRE_INSTITUCION.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Programas Académicos</h1>
        <span className={`${s.badge} ${s.badgeGreen}`}>Vista de Consulta</span>
        <span className={s.qty}>{filtrados.length} registros</span>
      </div>

      {error && <div className={`${s.msg} ${s.msgError}`}>{error}</div>}

      <input
        className={s.search}
        placeholder="Buscar programa o institución..."
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
                <th>ID</th>
                <th>Nombre del Programa</th>
                <th>Institución</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 ? (
                <tr><td colSpan={3} className={s.empty}>Sin resultados</td></tr>
              ) : (
                filtrados.map((p) => (
                  <tr key={p.ID_PROGRAMA}>
                    <td>{p.ID_PROGRAMA}</td>
                    <td>{p.NOMBRE_PROGRAMA}</td>
                    <td>{p.NOMBRE_INSTITUCION}</td>
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
