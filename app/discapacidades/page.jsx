'use client';
import { useState, useEffect } from 'react';
import s from '../shared.module.css';

export default function DiscapacidadesPage() {
  const [datos, setDatos]           = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [valorEdit, setValorEdit]   = useState('');
  const [msg, setMsg]               = useState({ texto: '', tipo: '' });
  const [cargando, setCargando]     = useState(true);

  const cargar = () => {
    setCargando(true);
    fetch('/api/discapacidades')
      .then((r) => r.json())
      .then((d) => { setDatos(Array.isArray(d) ? d : []); setCargando(false); })
      .catch(() => { mostrarMsg('Error al cargar datos', 'error'); setCargando(false); });
  };

  const mostrarMsg = (texto, tipo) => {
    setMsg({ texto, tipo });
    setTimeout(() => setMsg({ texto: '', tipo: '' }), 3000);
  };

  useEffect(() => { cargar(); }, []);

  const iniciarEdicion = (item) => {
    setEditandoId(item.ID_DISCAPACIDAD);
    setValorEdit(item.NOMBRE_DISCAPACIDAD);
  };

  const cancelar = () => { setEditandoId(null); setValorEdit(''); };

  const guardar = async (id) => {
    if (!valorEdit.trim()) return mostrarMsg('El nombre no puede estar vacío', 'error');
    const res = await fetch(`/api/discapacidades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NOMBRE_DISCAPACIDAD: valorEdit }),
    });
    if (res.ok) {
      mostrarMsg('Discapacidad actualizada con éxito ✓', 'success');
      setEditandoId(null);
      cargar();
    } else {
      mostrarMsg('Error al actualizar', 'error');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Discapacidades</h1>
        <span className={`${s.badge} ${s.badgeOrange}`}>Actualizar</span>
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
                <th>Nombre Discapacidad</th>
                <th style={{ width: 180 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.length === 0 ? (
                <tr><td colSpan={3} className={s.empty}>Sin registros</td></tr>
              ) : (
                datos.map((item) => (
                  <tr key={item.ID_DISCAPACIDAD}>
                    <td>{item.ID_DISCAPACIDAD}</td>
                    <td>
                      {editandoId === item.ID_DISCAPACIDAD ? (
                        <input
                          className={s.input}
                          value={valorEdit}
                          onChange={(e) => setValorEdit(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        item.NOMBRE_DISCAPACIDAD
                      )}
                    </td>
                    <td>
                      <div className={s.actions}>
                        {editandoId === item.ID_DISCAPACIDAD ? (
                          <>
                            <button className={`${s.btn} ${s.btnSuccess}`} onClick={() => guardar(item.ID_DISCAPACIDAD)}>
                              Guardar
                            </button>
                            <button className={`${s.btn} ${s.btnSecondary}`} onClick={cancelar}>
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <button className={`${s.btn} ${s.btnWarning}`} onClick={() => iniciarEdicion(item)}>
                            Editar
                          </button>
                        )}
                      </div>
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
