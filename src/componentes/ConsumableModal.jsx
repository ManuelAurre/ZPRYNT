import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const ConsumableModal = ({ showModal, handleClose, mode = 'add', consumableData, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    cantidad: '',
    cantidadActual: '',
    tipo: '',
    material: '',
    costoDeCompra: '',
    costoDeVenta: ''
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && consumableData) {
      setForm({
        nombre: consumableData.nombre || '',
        cantidad: consumableData.cantidad ? String(consumableData.cantidad) : '',
        cantidadActual: consumableData.cantidadActual ? String(consumableData.cantidadActual) : '',
        tipo: consumableData.tipo || '',
        material: consumableData.material || '',
        costoDeCompra: consumableData.costoDeCompra || '',
        costoDeVenta: consumableData.costoDeVenta || ''
      });
      if (consumableData.imagen) {
        setImagenPreview(`data:image/*;base64,${consumableData.imagen}`);
      } else {
        setImagenPreview('');
      }
      setImagenFile(null);
    } else if (mode === 'add') {
      setForm({ nombre: '', cantidad: '', cantidadActual: '', tipo: '', material: '', costoDeCompra: '', costoDeVenta: '' });
      setImagenPreview('');
      setImagenFile(null);
    }
  }, [mode, consumableData, showModal]);

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
    formData.append('cantidad', form.cantidad);
    formData.append('cantidadActual', form.cantidadActual);
    formData.append('tipo', form.tipo);
    formData.append('material', form.material);
    formData.append('costoDeCompra', form.costoDeCompra);
    formData.append('costoDeVenta', form.costoDeVenta);
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }

    if (mode === 'add') {
      await fetch('/api/utilizables', {
        method: 'POST',
        body: formData
      });
    } else if (mode === 'edit' && consumableData?.id) {
      await fetch(`/api/utilizables/${consumableData.id}`, {
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
          {/* Cantidad y Cantidad Actual en la misma línea */}
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
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
            <div style={{ flex: 1 }}>
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
          </div>
          {/* Tipo y Material en la misma línea */}
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Tipo: </label>
              <input
                className="form-control"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Material: </label>
              <input
                className="form-control"
                name="material"
                value={form.material}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Costo de Compra y Costo de Venta en la misma línea */}
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Costo de Compra: </label>
              <input
                className="form-control"
                name="costoDeCompra"
                value={form.costoDeCompra}
                onChange={handleChange}
                type="number"
                min="0"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Costo de Venta: </label>
              <input
                className="form-control"
                name="costoDeVenta"
                value={form.costoDeVenta}
                onChange={handleChange}
                type="number"
                min="0"
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

export default ConsumableModal;
