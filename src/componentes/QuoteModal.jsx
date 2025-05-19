import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const QuoteModal = ({ showModal, handleClose, mode = 'add', quoteData, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    link: '',
    presupuesto: '',
    tamano: '',
    DescripcionCliente: '',
    tipo: ''
  });

  useEffect(() => {
    if (mode === 'edit' && quoteData) {
      setForm({
        nombre: quoteData.nombre || '',
        link: quoteData.link || '',
        presupuesto: quoteData.presupuesto ? String(quoteData.presupuesto) : '',
        tamano: quoteData.tamano || '',
        DescripcionCliente: quoteData.DescripcionCliente || '',
        tipo: quoteData.tipo || ''
      });
    } else if (mode === 'add') {
      setForm({ nombre: '', link: '', presupuesto: '', tamano: '', DescripcionCliente: '', tipo: '' });
    }
  }, [mode, quoteData, showModal]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (mode === 'add') {
      await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else if (mode === 'edit' && quoteData?.id) {
      await fetch(`/api/cotizaciones/${quoteData.id}`, {
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
            {mode === 'add' ? 'Agregar Cotización' : 'Editar Cotización'}
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
            <label style={{ textAlign: 'left', display: 'block' }}>Link: </label>
            <input
              className="form-control"
              name="link"
              value={form.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Presupuesto: </label>
            <input
              className="form-control"
              name="presupuesto"
              value={form.presupuesto}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Tamaño: </label>
            <input
              className="form-control"
              name="tamano"
              value={form.tamano}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Descripción Cliente: </label>
            <textarea
              className="form-control"
              name="DescripcionCliente"
              value={form.DescripcionCliente}
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

export default QuoteModal;
