import React from 'react';
import '../styles/componentes.css';

const Boorado = ({ show, onAccept, onCancel }) => {
  if (!show) return null;
  return (
    <div className="boorado-modal-backdrop">
      <div className="boorado-modal">
        <div className="boorado-modal-header">
          <span className="boorado-modal-header-left">Confirmar borrado: </span>
          <button className="boorado-modal-close" onClick={onCancel} aria-label="Cerrar">&times;</button>
        </div>
        <div className="boorado-modal-content">
          <p>¿Seguro que deseas borrarlo?</p>
          <div className="boorado-modal-buttons">
            <button className="btn-morado" onClick={onAccept}>Aceptar</button>
            <button className="btn-gris" onClick={onCancel}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boorado;
