// app/page.js
import Link from 'next/link';
import styles from './page.module.css';

const secciones = [
  {
    titulo: ' Consultas',
    color: '#2f9e44',
    bg: '#d3f9d8',
    items: [
      { label: 'Beneficiarios', href: '/beneficiarios', desc: 'Listado completo de los beneficiarios' },
      { label: 'Programas Académicos', href: '/programas', desc: 'Programas y sus instituciones relacionadas' },
      { label: 'Instituciones', href: '/instituciones', desc: 'Catálogo de instituciones de educación superior' },
      { label: 'Localidades', href: '/localidades', desc: 'Gestión completa CRUD de localidades' },
    ],
  },
  {
    titulo: ' Actualizar',
    color: '#e67700',
    bg: '#fff3bf',
    items: [
      { label: 'Convocatorias', href: '/convocatorias', desc: 'Editar nombres de convocatorias existentes' },
      { label: 'Discapacidades', href: '/discapacidades', desc: 'Editar categorías de discapacidad' },
    ],
  },
  {
    titulo: 'Insertar',
    color: '#1971c2',
    bg: '#e8f0fe',
    items: [
      { label: 'Grupos Étnicos', href: '/grupos-etnicos', desc: 'Agregar nuevos grupos étnicos al catálogo' },
      { label: 'Géneros / Sexo', href: '/sexos', desc: 'Agregar nuevas categorías de género' },
    ],
  },
  {
    titulo: ' Eliminar',
    color: '#c92a2a',
    bg: '#ffe3e3',
    items: [
      { label: 'Niveles SISBEN', href: '/sisben', desc: 'Eliminar niveles SISBEN del sistema' },
      { label: 'Rangos de Edad', href: '/edades', desc: 'Eliminar rangos de edad del catálogo' },
    ],
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Sistema de Gestión Beneficiarios</h1>
        <p className={styles.subtitle}>Base de Datos Beneficiarios — Selecciona una sección para comenzar</p>
      </div>

      <div className={styles.grid}>
        {secciones.map((sec) => (
          <div key={sec.titulo} className={styles.section}>
            <div
              className={styles.sectionHeader}
              style={{ background: sec.bg, borderLeft: `4px solid ${sec.color}` }}
            >
              <span style={{ color: sec.color, fontWeight: 700, fontSize: '1.05rem' }}>
                {sec.titulo}
              </span>
            </div>
            {sec.items.map((item) => (
              <Link key={item.href} href={item.href} className={styles.card}>
                <span className={styles.cardLabel}>{item.label}</span>
                <span className={styles.cardDesc}>{item.desc}</span>
                <span className={styles.arrow} style={{ color: sec.color }}>→</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
