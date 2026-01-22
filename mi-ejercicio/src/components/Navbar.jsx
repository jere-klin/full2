import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Inicio</NavLink>
      <NavLink to="/catalogo" className={({ isActive }) => isActive ? "active-link" : ""}>Catálogo</NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Iniciar Sesión</NavLink>
      <NavLink to="/registro" className={({ isActive }) => isActive ? "active-link" : ""}>Registro</NavLink>
      
      {/* Icono de carrito estilizado */}
      <div style={{ color: 'white', cursor: 'pointer', marginLeft: '10px' }}>
        🛒 <span style={{ background: '#2ecc71', padding: '2px 7px', borderRadius: '50%', fontSize: '0.8rem' }}>0</span>
      </div>
    </nav>
  );
}