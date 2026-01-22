import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearCuenta() {
  const navigate = useNavigate();
  
  // Estados para capturar los inputs
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setMensaje({ texto: '❌ Las contraseñas no coinciden.', color: 'red' });
      return;
    }

    // 2. Simulación de persistencia (Requerimiento 2 de la evaluación)
    localStorage.setItem('usuarioRegistrado', formData.email); 
    localStorage.setItem('passwordRegistrada', formData.password);
    localStorage.setItem('nombrePersona', formData.nombre);
    localStorage.setItem('rolUsuario', 'cliente'); // Rol por defecto solicitado

    setMensaje({ texto: '✅ ¡Cuenta creada con éxito! Redirigiendo...', color: 'green' });

    // Redirección SPA sin recargar página
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <main>
      <section className="cuenta">
        <h1>CREAR CUENTA</h1>
        <form onSubmit={handleSubmit} id="signup-form">
          <p>
            <label htmlFor="nombre">Nombre de Usuario:</label>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
            />
          </p>
          <p>
            <label htmlFor="email">Correo Electrónico:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </p>
          <p>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </p>
          <p>
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </p>
          <button type="submit" className="submit">Crear Cuenta de Usuario</button>
        </form>
        
        {mensaje.texto && (
          <div style={{ marginTop: '10px', color: mensaje.color, fontWeight: 'bold' }}>
            {mensaje.texto}
          </div>
        )}
      </section>
    </main>
  );
}