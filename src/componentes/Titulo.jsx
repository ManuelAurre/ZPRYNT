import React from 'react';
import '../styles/Titulo.css';

const Titulo = ({ onSalir }) => (
  <div className="titulo-morado">
    <div className="titulo-logo-texto">
      <img src={require('../Img/Logo.jpg')} alt="Logo ZPRYNT" className="titulo-logo" />
      <span className="titulo-texto">ZPRYNT</span>
    </div>
    <button className="titulo-boton-salir" onClick={onSalir}>
      Salir
    </button>
  </div>
);

export default Titulo;
