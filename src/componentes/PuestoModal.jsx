import React, { useState, useEffect } from 'react';

const PuestoModal = ({ showModal, handleClose, mode = 'add', puestoData, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    cuotaPorHora: '',
    estatus: '',
    descripcion: '',
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && puestoData) {
      setForm({
        nombre: puestoData.nombre || '',
        cuotaPorHora: puestoData.cuotaPorHora || '',
        estatus: puestoData.estatus ? String(puestoData.estatus) : '',
        descripcion: puestoData.descripcion || '',
      });
    } else if (mode === 'add') {
      setForm({
        nombre: '',
        cuotaPorHora: '',
        estatus: '',
        descripcion: '',
      });
    }
  }, [mode, puestoData, showModal]);

  useEffect(() => {
    if (showModal) setVisible(true);
    else if (visible) setTimeout(() => setVisible(false), 250);
  }, [showModal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'add') {
      await fetch('/api/puestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else if (mode === 'edit' && puestoData?.id) {
      await fetch(`/api/puestos/${puestoData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    if (onSaved) onSaved();
    handleClose();
  };

  if (!showModal && !visible) return null;

  return (
    <div className="boorado-modal-backdrop">
      <div className={`boorado-modal ${showModal ? 'fade-in' : 'fade-out'}`}>
        <div className="boorado-modal-header">
          <h4 className="boorado-modal-header-left" style={{ margin: 0 }}>
            {mode === 'add' ? 'Agregar Puesto' : 'Editar Puesto'}
          </h4>
          <button className="boorado-modal-close" onClick={handleClose} aria-label="Cerrar">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="boorado-modal-content">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Cuota Por Hora:</label>
            <input
              className="form-control"
              name="cuotaPorHora"
              value={form.cuotaPorHora}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Estatus:</label>
            <select
              className="form-control"
              name="estatus"
              value={form.estatus}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione estatus</option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
              <option value="3">Borrado</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label>Descripción:</label>
            <textarea
              className="form-control"
              name="descripcion"
              value={form.descripcion}
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

export default PuestoModal;
