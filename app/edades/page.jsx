'use client';
import { useState, useEffect } from 'react';
import s from '../shared.module.css';

export default function EdadesPage() {
  const [datos, setDatos]         = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [msg, setMsg]             = useState({ texto: '', tipo: '' });
  const [cargando, setCargando]   = useState(true);

  const cargar = () => {
    setCargando(true);
    fetch('/api/edades')
      .then((r) => r.json())
      .then((d) => { setDatos(Array.isArray(d) ? d : []); setCargando(false); })
      .catch(() => { mostrarMsg('Error al cargar datos', 'error'); setCargando(false); });
  };

  const mostrarMsg = (texto, tipo) => {
    setMsg({ texto, tipo });
    setTimeout(() => setMsg({ texto: '', tipo: '' }), 3500);
  };

  useEffect(() => { cargar(); }, []);

  const borrar = async (id) => {
    const res = await fetch(`/api/edades/${id}`, { method: 'DELETE' });
    setConfirmId(null);
    if (res.ok) {
      mostrarMsg('Rango de edad eliminado con éxito ✓', 'success');
      cargar();
    } else {
      mostrarMsg('No se pudo eliminar. Puede estar en uso por beneficiarios.', 'error');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Rangos de Edad</h1>
        <span className={`${s.badge} ${s.badgeRed}`}>Eliminar</span>
        <span className={s.qty}>{datos.length} registros</span>
      </div>

      {msg.texto && (
        <div className={`${s.msg} ${msg.tipo === 'success' ? s.msgSuccess : s.msgError}`}>
          {msg.texto}
        </div>
      )}

      {cargando ? (
        <div className={`${s.msg} ${s.msgInfo}`}>Cargando datos...</div>
      ) : (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Rango de Edad</th>
                <th style={{ width: 220 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.length === 0 ? (
                <tr><td colSpan={3} className={s.empty}>Sin registros</td></tr>
              ) : (
                datos.map((item) => (
                  <tr key={item.ID_EDAD}>
                    <td>{item.ID_EDAD}</td>
                    <td>{item.NOMBRE_EDAD}</td>
                    <td>
                      {confirmId === item.ID_EDAD ? (
                        <div className={s.actions}>
                          <span style={{ fontSize: '0.85rem', color: '#c92a2a', marginRight: 4 }}>
                            ¿Confirmar?
                          </span>
                          <button className={`${s.btn} ${s.btnDanger}`} onClick={() => borrar(item.ID_EDAD)}>
                            Sí, borrar
                          </button>
                          <button className={`${s.btn} ${s.btnSecondary}`} onClick={() => setConfirmId(null)}>
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button className={`${s.btn} ${s.btnDanger}`} onClick={() => setConfirmId(item.ID_EDAD)}>
                           Eliminar
                        </button>
                      )}
                    </td>
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
