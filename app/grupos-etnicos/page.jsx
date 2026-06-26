'use client';
import { useState, useEffect } from 'react';
import s from '../shared.module.css';

export default function GruposEtnicosPage() {
  const [datos, setDatos]   = useState([]);
  const [nombre, setNombre] = useState('');
  const [msg, setMsg]       = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(true);

  const cargar = () => {
    setCargando(true);
    fetch('/api/grupos-etnicos')
      .then((r) => r.json())
      .then((d) => { setDatos(Array.isArray(d) ? d : []); setCargando(false); })
      .catch(() => { mostrarMsg('Error al cargar datos', 'error'); setCargando(false); });
  };

  const mostrarMsg = (texto, tipo) => {
    setMsg({ texto, tipo });
    setTimeout(() => setMsg({ texto: '', tipo: '' }), 3000);
  };

  useEffect(() => { cargar(); }, []);

  const agregar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return mostrarMsg('El nombre no puede estar vacío', 'error');
    const res = await fetch('/api/grupos-etnicos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NOMBRE_GRUPO_ETNICO: nombre }),
    });
    if (res.ok) {
      mostrarMsg('Grupo étnico agregado con éxito ✓', 'success');
      setNombre('');
      cargar();
    } else {
      mostrarMsg('Error al agregar el registro', 'error');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Grupos Étnicos</h1>
        <span className={`${s.badge} ${s.badgeGreen}`}>Insertar</span>
        <span className={s.qty}>{datos.length} registros</span>
      </div>

      {msg.texto && (
        <div className={`${s.msg} ${msg.tipo === 'success' ? s.msgSuccess : s.msgError}`}>
          {msg.texto}
        </div>
      )}

      <form onSubmit={agregar} className={s.form}>
        <input
          className={s.input}
          placeholder="Nombre del grupo étnico (Ej: Afrocolombiano)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit" className={`${s.btn} ${s.btnSuccess}`}>
          + Agregar Grupo Étnico
        </button>
      </form>

      {cargando ? (
        <div className={`${s.msg} ${s.msgInfo}`}>Cargando datos...</div>
      ) : (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Grupo Étnico</th>
              </tr>
            </thead>
            <tbody>
              {datos.length === 0 ? (
                <tr><td colSpan={2} className={s.empty}>Sin registros</td></tr>
              ) : (
                datos.map((item) => (
                  <tr key={item.ID_GRUPO_ETNICO}>
                    <td>{item.ID_GRUPO_ETNICO}</td>
                    <td>{item.NOMBRE_GRUPO_ETNICO}</td>
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
