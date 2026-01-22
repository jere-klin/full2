import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Sin llaves
import Home from './pages/Home';         // Sin llaves
import Admin from './pages/Admin';       // Sin llaves
import Catalogo from './pages/Catalogo'; // Sin llaves
import CrearCuenta from './pages/CrearCuenta';
import Login from './pages/Login';
import './styles/styles.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registro" element={<CrearCuenta />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;