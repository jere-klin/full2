import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Esto es clave
import Counter from './components/Counter';


function App() {
  return (
    <div className="container ">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">¡Instalación Exitosa!</h4>
        <p>Bootstrap está funcionando correctamente en tu proyecto de React.</p>
        <hr />
        <button className="btn btn-success">Este es un botón de Bootstrap</button>
      </div>
      <Counter />
    </div>
  );
}

export default App;