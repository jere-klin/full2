import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosData } from '../data/Usuario';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Buscamos el usuario en nuestra "base de datos" de src/data/usuarios.js
    const usuarioEncontrado = usuariosData.find(
      (u) => u.user === user && u.pass === pass
    );

    if (usuarioEncontrado) {
      // Guardamos la sesión en localStorage (Requisito de la evaluación)
      localStorage.setItem('rolUsuario', usuarioEncontrado.rol);
      localStorage.setItem('nombrePersona', usuarioEncontrado.nombre);
      
      // Redirección SPA según el rol
      if (usuarioEncontrado.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <main>
      <section className="login">
        <h1>INICIAR SESIÓN</h1>
        <form onSubmit={handleLogin} id="login-form">
          <p>
            <label htmlFor="username">Usuario:</label>
            <input 
              type="text" 
              id="username" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              required 
            />
          </p>
          <p>
            <label htmlFor="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              required 
            />
          </p>
          <button type="submit">Iniciar sesión</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </section>
    </main>
  );
}