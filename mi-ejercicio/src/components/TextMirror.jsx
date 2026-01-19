import React, { useState } from 'react';

export default function TextMirror() {
  // Buenas prácticas: inicializar el estado como string vacío para evitar warnings
  const [text, setText] = useState('');
  const [updated, setUpdated] = useState('');

  const handleChange = (e) => setText(e.target.value);
  const handleUpdate = () => setUpdated(text);
  const handleReset = () => {
    setText('');
    setUpdated('');
  };

  const handleKeyDown = (e) => {
    // Permitir actualizar con Enter
    if (e.key === 'Enter') handleUpdate();
  };

  const isEmpty = text.trim().length === 0;

  return (
    <div style={{ maxWidth: 480, margin: '1rem auto', textAlign: 'left' }}>
      <label htmlFor="texto" style={{ display: 'block', marginBottom: 8 }}>
        Ingresa texto MI SANGRE
      </label>
      <input
        id="texto"
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Escribe aquí AMIGO..."
        style={{ width: '100%', padding: '8px', marginBottom: 8 }}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={handleUpdate} disabled={isEmpty}>
          Actualizar
        </button>
        <button onClick={handleReset} disabled={isEmpty && updated === ''}>
          Limpiar
        </button>
      </div>

      <p><strong>Texto input:</strong> {text}</p>
      <p><strong>Texto actualizado:</strong> {updated}</p>
      <small>Caracteres: {text.length}</small>
    </div>
  );
}
