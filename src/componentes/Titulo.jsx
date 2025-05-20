import React from 'react';
import '../styles/Titulo.css';

const Titulo = ({ onSalir, usuario }) => (
  <div className="titulo-morado">
    <div className="titulo-logo-texto">
      <img src={require('../Img/Logo.jpg')} alt="Logo ZPRYNT" className="titulo-logo" />
      <span className="titulo-texto">ZPRYNT</span>
      <div style={{ marginLeft: 16, fontSize: '0.9em', color: '#eee', alignSelf: 'center' }}>
        {usuario && (
          <span>
            Conectado: <span style={{ fontWeight: 500 }}>{usuario}</span>
          </span>
        )}
      </div>
    </div>
    <button className="titulo-boton-salir" onClick={onSalir}>
      Salir
    </button>
  </div>
);

export default Titulo;
