import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistema Beneficiarios",
  description: "Gestión de la base de datos Beneficiarios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, background: '#f4f6fb' }}>
        <nav style={{
          background: '#1a1a2e',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          height: 52,
          gap: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.2px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
             Inicio
          </Link>
          <span style={{ color: '#4a5270', fontSize: '1.1rem' }}>|</span>
          <Link href="/beneficiarios" style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.88rem' }}>Beneficiarios</Link>
          <Link href="/programas"     style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.88rem' }}>Programas</Link>
          <Link href="/instituciones" style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.88rem' }}>Instituciones</Link>
          <Link href="/localidades"   style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.88rem' }}>Localidades</Link>
          <Link href="/convocatorias" style={{ color: '#ffd43b', textDecoration: 'none', fontSize: '0.88rem' }}>Convocatorias</Link>
          <Link href="/discapacidades" style={{ color: '#ffd43b', textDecoration: 'none', fontSize: '0.88rem' }}>Discapacidades</Link>
          <Link href="/grupos-etnicos" style={{ color: '#69db7c', textDecoration: 'none', fontSize: '0.88rem' }}>Grupos Étnicos</Link>
          <Link href="/sexos"         style={{ color: '#69db7c', textDecoration: 'none', fontSize: '0.88rem' }}>Géneros</Link>
          <Link href="/sisben"        style={{ color: '#ff8787', textDecoration: 'none', fontSize: '0.88rem' }}>Sisben</Link>
          <Link href="/edades"        style={{ color: '#ff8787', textDecoration: 'none', fontSize: '0.88rem' }}>Edades</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
