'use client'; // Indica que este código corre en el navegador del usuario


import { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Importamos el CSS exclusivo de esta vista


export default function LocalidadesCrud() {
  // Variables de estado para guardar la información en la pantalla
  const [localidades, setLocalidades] = useState([]);
  const [codLocalidad, setCodLocalidad] = useState('');
  const [nombreLocalidad, setNombreLocalidad] = useState('');


  //  variables de estado
  const [editandoId, setEditandoId] = useState(null); // Guarda el ID del registro que estamos editando


  // Esta función se ejecuta sola al abrir la página y pide los datos (READ)
  const fetchLocalidades = async () => {
    const res = await fetch('/api/localidades'); // Llama al Controlador GET
    const data = await res.json();
    setLocalidades(data);
  };


  // useEffect hace que fetchLocalidades se ejecute al iniciar la Vista
  useEffect(() => {
    fetchLocalidades();
  }, []);


  // Función para borrar (DELETE)
  const borrarLocalidad = async (id) => {
    await fetch(`/api/localidades/${id}`, { method: 'DELETE' }); // Controlador DELETE
    fetchLocalidades(); // Recarga la lista
  };


  // Función para preparar el formulario cuando se hace clic en "Editar"
  const prepararEdicion = (loc) => {
    setCodLocalidad(loc.Cod_Localidad);
    setNombreLocalidad(loc.Localidad);
    setEditandoId(loc.Id_Localidad);
  };


  // Función modificada para Guardar (Sirve para CREAR y ACTUALIZAR)
  const guardarLocalidad = async (e) => {
    e.preventDefault();
   
    if (editandoId) {
      // SI HAY UN ID: Hacemos una petición PUT para ACTUALIZAR
      await fetch(`/api/localidades/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Cod_localidad: codLocalidad, Localidad: nombreLocalidad })
      });
      setEditandoId(null); // Salimos del modo edición
    } else {
      // SI NO HAY ID: Hacemos la petición POST original para CREAR
      await fetch('/api/localidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Cod_localidad: codLocalidad, Localidad: nombreLocalidad })
      });
    }


    // Limpiamos el formulario y recargamos la lista
    setCodLocalidad('');
    setNombreLocalidad('');
    fetchLocalidades();
  };


  return (
    <div className={styles.container}>
      <h1>Gestión de Localidades (CRUD)</h1>
     
      {/* Formulario para crear un nuevo registro */}
      <form onSubmit={guardarLocalidad} className={styles.form}>
        <input
          className={styles.input} type="text" placeholder="Código (Ej. 01)"
          value={codLocalidad} onChange={(e) => setCodLocalidad(e.target.value)} required
        />
        <input
          className={styles.input} type="text" placeholder="Nombre (Ej. Usaquén)"
          value={nombreLocalidad} onChange={(e) => setNombreLocalidad(e.target.value)} required
        />
        <button type="submit" className={styles.button}>
           {editandoId ? 'Actualizar Localidad' : 'Crear Localidad'}
        </button>
      </form>


    {/* Lista donde se dibujan los registros leídos de la BD */}
    <div>
        {/* Validamos que 'localidades' sea realmente un arreglo antes de mapear */}
        {Array.isArray(localidades) ? (
          localidades.map((loc) => (
            <div key={loc.Id_Localidad} className={styles.card}>
              <strong>Código: {loc.Cod_Localidad}</strong> - {loc.Localidad}
              <button
              className={styles.button}
              onClick={() => prepararEdicion(loc)}
            >
              Editar
            </button>
              <button
                className={`${styles.button} ${styles.buttonDelete}`}
                onClick={() => borrarLocalidad(loc.Id_Localidad)}
              >
                Borrar
              </button>
            </div>
          ))
        ) : (
          /* Si no es un arreglo (ej. un error del backend), mostramos un mensaje */
          <p>Cargando datos o hubo un error de conexión con la base de datos...</p>
        )}
      </div>
    </div>
  );
}


