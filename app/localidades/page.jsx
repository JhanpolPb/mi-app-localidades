'use client';
import { useState, useEffect } from 'react';
import s from '../shared.module.css';

export default function LocalidadesPage() {
  const [datos, setDatos]           = useState([]);
  const [nombre, setNombre]         = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [valorEdit, setValorEdit]   = useState('');
  const [confirmId, setConfirmId]   = useState(null);
  const [msg, setMsg]               = useState({ texto: '', tipo: '' });
  const [cargando, setCargando]     = useState(true);
  const [filtro, setFiltro]         = useState('');

  const cargar = () => {
    setCargando(true);
    fetch('/api/localidades')
      .then((r) => r.json())
      .then((d) => { setDatos(Array.isArray(d) ? d : []); setCargando(false); })
      .catch(() => { mostrarMsg('Error al conectar con la base de datos', 'error'); setCargando(false); });
  };

  const mostrarMsg = (texto, tipo) => {
    setMsg({ texto, tipo });
    setTimeout(() => setMsg({ texto: '', tipo: '' }), 3000);
  };

  useEffect(() => { cargar(); }, []);

  // CREATE
  const agregar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return mostrarMsg('El nombre no puede estar vacío', 'error');
    const res = await fetch('/api/localidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NOMBRE_LOCALIDAD: nombre }),
    });
    if (res.ok) {
      mostrarMsg('Localidad creada con éxito ✓', 'success');
      setNombre('');
      cargar();
    } else {
      mostrarMsg('Error al crear la localidad', 'error');
    }
  };

  // UPDATE
  const iniciarEdicion = (item) => {
    setEditandoId(item.ID_LOCALIDAD);
    setValorEdit(item.NOMBRE_LOCALIDAD);
    setConfirmId(null);
  };

  const cancelarEdicion = () => { setEditandoId(null); setValorEdit(''); };

  const guardar = async (id) => {
    if (!valorEdit.trim()) return mostrarMsg('El nombre no puede estar vacío', 'error');
    const res = await fetch(`/api/localidades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NOMBRE_LOCALIDAD: valorEdit }),
    });
    if (res.ok) {
      mostrarMsg('Localidad actualizada con éxito ✓', 'success');
      setEditandoId(null);
      cargar();
    } else {
      mostrarMsg('Error al actualizar', 'error');
    }
  };

  // DELETE
  const borrar = async (id) => {
    const res = await fetch(`/api/localidades/${id}`, { method: 'DELETE' });
    setConfirmId(null);
    if (res.ok) {
      mostrarMsg('Localidad eliminada ✓', 'success');
      cargar();
    } else {
      mostrarMsg('No se pudo eliminar. Puede estar en uso por beneficiarios.', 'error');
    }
  };

  const filtrados = datos.filter((d) =>
    d.NOMBRE_LOCALIDAD.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Localidades</h1>
        <span className={s.badge}>CRUD Completo</span>
        <span className={s.qty}>{filtrados.length} registros</span>
      </div>

      {msg.texto && (
        <div className={`${s.msg} ${msg.tipo === 'success' ? s.msgSuccess : s.msgError}`}>
          {msg.texto}
        </div>
      )}

      {/* Formulario para agregar */}
      <form onSubmit={agregar} className={s.form}>
        <input
          className={s.input}
          placeholder="Nombre de la localidad (Ej: Usaquén)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit" className={`${s.btn} ${s.btnPrimary}`}>
          + Agregar Localidad
        </button>
      </form>

      {/* Buscador */}
      <input
        className={s.search}
        placeholder="  Buscar localidad..."
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
                <th style={{ width: 80 }}>ID</th>
                <th>Nombre de la Localidad</th>
                <th style={{ width: 240 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 ? (
                <tr><td colSpan={3} className={s.empty}>Sin resultados</td></tr>
              ) : (
                filtrados.map((item) => (
                  <tr key={item.ID_LOCALIDAD}>
                    <td>{item.ID_LOCALIDAD}</td>
                    <td>
                      {editandoId === item.ID_LOCALIDAD ? (
                        <input
                          className={s.input}
                          value={valorEdit}
                          onChange={(e) => setValorEdit(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        item.NOMBRE_LOCALIDAD
                      )}
                    </td>
                    <td>
                      <div className={s.actions}>
                        {editandoId === item.ID_LOCALIDAD ? (
                          <>
                            <button className={`${s.btn} ${s.btnSuccess}`} onClick={() => guardar(item.ID_LOCALIDAD)}>
                              Guardar
                            </button>
                            <button className={`${s.btn} ${s.btnSecondary}`} onClick={cancelarEdicion}>
                              Cancelar
                            </button>
                          </>
                        ) : confirmId === item.ID_LOCALIDAD ? (
                          <>
                            <span style={{ fontSize: '0.82rem', color: '#c92a2a' }}>¿Confirmar?</span>
                            <button className={`${s.btn} ${s.btnDanger}`} onClick={() => borrar(item.ID_LOCALIDAD)}>
                              Sí
                            </button>
                            <button className={`${s.btn} ${s.btnSecondary}`} onClick={() => setConfirmId(null)}>
                              No
                            </button>
                          </>
                        ) : (
                          <>
                            <button className={`${s.btn} ${s.btnWarning}`} onClick={() => iniciarEdicion(item)}>
                               Editar
                            </button>
                            <button className={`${s.btn} ${s.btnDanger}`} onClick={() => setConfirmId(item.ID_LOCALIDAD)}>
                               Borrar
                            </button>
                          </>
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
