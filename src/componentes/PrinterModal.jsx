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
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && printerData) {
      setForm({
        nombre: printerData.nombre || '',
        tipo: printerData.tipo || '',
        imagen: '', // No se usa el nombre, sino el base64
        velocidad: printerData.velocidad ? String(printerData.velocidad) : '',
        costoPorHora: printerData.costoPorHora ? String(printerData.costoPorHora) : '',
        dimensiones: printerData.dimensiones || ''
      });
      if (printerData.imagen) {
        setImagenPreview(`data:image/*;base64,${printerData.imagen}`);
      } else {
        setImagenPreview('');
      }
      setImagenFile(null);
    } else if (mode === 'add') {
      setForm({ nombre: '', tipo: '', imagen: '', velocidad: '', costoPorHora: '', dimensiones: '' });
      setImagenPreview('');
      setImagenFile(null);
    }
  }, [mode, printerData, showModal]);

  useEffect(() => {
    if (showModal) setVisible(true);
    else if (visible) setTimeout(() => setVisible(false), 250);
  }, [showModal]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagenChange = e => {
    const file = e.target.files[0];
    setImagenFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagenPreview('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('tipo', form.tipo);
    formData.append('velocidad', form.velocidad);
    formData.append('costoPorHora', form.costoPorHora);
    formData.append('dimensiones', form.dimensiones);
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }

    if (mode === 'add') {
      await fetch('/api/impresoras', {
        method: 'POST',
        body: formData
      });
    } else if (mode === 'edit' && printerData?.id) {
      await fetch(`/api/impresoras/${printerData.id}`, {
        method: 'PUT',
        body: formData
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
          {/* Velocidad, Costo Por Hora y Dimensiones en la misma línea */}
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
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
            <div style={{ flex: 1 }}>
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
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Dimensiones: </label>
              <input
                className="form-control"
                name="dimensiones"
                value={form.dimensiones}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Campo de imagen al final */}
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Imagen: </label>
            <input
              className="form-control"
              name="imagen"
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
            />
          </div>
          {imagenPreview && (
            <div className="form-group mt-2" style={{ textAlign: 'center' }}>
              <img
                src={imagenPreview}
                alt="Vista previa"
                style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>
          )}
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
