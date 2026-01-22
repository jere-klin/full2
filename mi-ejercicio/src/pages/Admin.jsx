import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosData } from '../data/Productos';

export default function Admin() {
  const navigate = useNavigate();
  const [inventario, setInventario] = useState(productosData);

  // 1. Seguridad: Verificar si es admin al cargar la página
  useEffect(() => {
    const rol = localStorage.getItem('rolUsuario');
    if (rol !== 'admin') {
      alert("Acceso denegado. Solo administradores.");
      navigate('/'); // Redirigir al inicio
    }
  }, [navigate]);

  const actualizarStock = (id, nuevoStock) => {
    const nuevoInventario = inventario.map(p => 
      p.id === id ? { ...p, stock: parseInt(nuevoStock) } : p
    );
    setInventario(nuevoInventario);
    alert(`Stock de producto ID: ${id} actualizado a ${nuevoStock}`);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('rolUsuario');
    localStorage.removeItem('nombrePersona');
    navigate('/login');
  };

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel Administrativo</h1>
        <button onClick={cerrarSesion} className="btn btn-danger">Cerrar Sesión</button>
      </div>

      <section className="card shadow-sm p-4">
        <h2 className="mb-4">Gestión de Inventario</h2>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock Actual</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>
                  <input 
                    type="number" 
                    defaultValue={p.stock} 
                    id={`stock-${p.id}`}
                    className="form-control"
                    style={{ width: '80px' }}
                  />
                </td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      const val = document.getElementById(`stock-${p.id}`).value;
                      actualizarStock(p.id, val);
                    }}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}