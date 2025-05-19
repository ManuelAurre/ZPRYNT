import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const ConsumableModal = ({ showModal, handleClose, mode = 'add', consumableData, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    cantidad: '',
    cantidadActual: '',
    tipo: '',
    material: '',
    costoDeCompra: ''
  });

  useEffect(() => {
    if (mode === 'edit' && consumableData) {
      setForm({
        nombre: consumableData.nombre || '',
        cantidad: consumableData.cantidad ? String(consumableData.cantidad) : '',
        cantidadActual: consumableData.cantidadActual ? String(consumableData.cantidadActual) : '',
        tipo: consumableData.tipo || '',
        material: consumableData.material || '',
        costoDeCompra: consumableData.costoDeCompra || ''
      });
    } else if (mode === 'add') {
      setForm({ nombre: '', cantidad: '', cantidadActual: '', tipo: '', material: '', costoDeCompra: '' });
    }
  }, [mode, consumableData, showModal]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (mode === 'add') {
      await fetch('/api/utilizables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else if (mode === 'edit' && consumableData?.id) {
      await fetch(`/api/utilizables/${consumableData.id}`, {
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
            {mode === 'add' ? 'Agregar Consumible' : 'Editar Consumible'}
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
            <label style={{ textAlign: 'left', display: 'block' }}>Cantidad: </label>
            <input
              className="form-control"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Cantidad Actual: </label>
            <input
              className="form-control"
              name="cantidadActual"
              value={form.cantidadActual}
              onChange={handleChange}
              type="number"
              min="0"
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
            <label style={{ textAlign: 'left', display: 'block' }}>Material: </label>
            <input
              className="form-control"
              name="material"
              value={form.material}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Costo de Compra: </label>
            <input
              className="form-control"
              name="costoDeCompra"
              value={form.costoDeCompra}
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

export default ConsumableModal;
