import React from 'react';
import { productosData } from '../data/Productos';

export default function Catalogo({ agregarAlCarrito }) {
  return (
    <main>
      <h1>Catálogo de Productos</h1>

      <div className="catalogo" id="product-list">
        {productosData.map((p) => (
          <div className="producto" key={p.id}>
            <img src={`assets/fotos/${p.img}`} alt={p.nombre} />
            <div className="producto-info">
              <h3 style={{ textTransform: 'capitalize' }}>{p.nombre}</h3>
              <p>{p.desc}</p>
              <p style={{ fontSize: '0.9em', color: '#555' }}>
                Disponibles: <span id={`stock-${p.id}`}>{p.stock}</span> {p.id === 3 ? 'unidades' : 'kg'}
              </p>
              <div className="precio">
                ${p.precio} pesos {p.id === 3 ? 'cada una' : 'el kg'}.
              </div>
              <button onClick={() => agregarAlCarrito(p)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}