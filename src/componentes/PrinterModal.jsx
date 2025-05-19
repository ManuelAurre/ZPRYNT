import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const PrinterModal = ({ showModal, handleClose, mode = 'add', printerData, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    imagen: '',
    velocidad: '',
    costoPorHora: '',
    dimensiones: ''
  });

  useEffect(() => {
    if (mode === 'edit' && printerData) {
      setForm({
        nombre: printerData.nombre || '',
        tipo: printerData.tipo || '',
        imagen: printerData.imagen || '',
        velocidad: printerData.velocidad ? String(printerData.velocidad) : '',
        costoPorHora: printerData.costoPorHora ? String(printerData.costoPorHora) : '',
        dimensiones: printerData.dimensiones || ''
      });
    } else if (mode === 'add') {
      setForm({ nombre: '', tipo: '', imagen: '', velocidad: '', costoPorHora: '', dimensiones: '' });
    }
  }, [mode, printerData, showModal]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (mode === 'add') {
      await fetch('/api/impresoras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else if (mode === 'edit' && printerData?.id) {
      await fetch(`/api/impresoras/${printerData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }
    if (onSaved) onSaved();
    handleClose();
  };

  if (!showModal) return null;

  return (
    <div className="boorado-modal-backdrop">
      <div className="boorado-modal">
        <div className="boorado-modal-header">
          <h4 className="boorado-modal-header-left" style={{ margin: 0 }}>
            {mode === 'add' ? 'Agregar Impresora' : 'Editar Impresora'}
          </h4>
          <button className="boorado-modal-close" onClick={handleClose} aria-label="Cerrar">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="boorado-modal-content">
          <div className="form-group">
            <label style={{ textAlign: 'left', display: 'block' }}>Nombre: </label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Tipo: </label>
            <input
              className="form-control"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Imagen: </label>
            <input
              className="form-control"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Velocidad: </label>
            <input
              className="form-control"
              name="velocidad"
              value={form.velocidad}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Costo Por Hora: </label>
            <input
              className="form-control"
              name="costoPorHora"
              value={form.costoPorHora}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Dimensiones: </label>
            <input
              className="form-control"
              name="dimensiones"
              value={form.dimensiones}
              onChange={handleChange}
              required
            />
          </div>
          <div className="boorado-modal-buttons mt-3">
            <button type="submit" className="btn-morado">
              {mode === 'add' ? 'Agregar' : 'Guardar'}
            </button>
            <button type="button" className="btn-gris" onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrinterModal;
