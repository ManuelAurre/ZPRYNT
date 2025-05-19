import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const CalculadoraConfigModal = ({
  showModal,
  handleClose,
  mode = 'add',
  configData,
  onSaved,
}) => {
  const [form, setForm] = useState({
    utilizablesId: '',
    impresoraId: '',
    costoPorTiempo: '',
    costoDiseno: '',
    costoPostprocesado: '',
    costoMarketingEntrega: '',
  });

  useEffect(() => {
    if (mode === 'edit' && configData) {
      setForm({
        utilizablesId: configData.utilizablesId ? String(configData.utilizablesId) : '',
        impresoraId: configData.impresoraId ? String(configData.impresoraId) : '',
        costoPorTiempo: configData.costoPorTiempo ? String(configData.costoPorTiempo) : '',
        costoDiseno: configData.costoDiseno ? String(configData.costoDiseno) : '',
        costoPostprocesado: configData.costoPostprocesado ? String(configData.costoPostprocesado) : '',
        costoMarketingEntrega: configData.costoMarketingEntrega ? String(configData.costoMarketingEntrega) : '',
      });
    } else if (mode === 'add') {
      setForm({
        utilizablesId: '',
        impresoraId: '',
        costoPorTiempo: '',
        costoDiseno: '',
        costoPostprocesado: '',
        costoMarketingEntrega: '',
      });
    }
  }, [mode, configData, showModal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'add') {
      await fetch('/api/calculadoras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else if (mode === 'edit' && configData?.id) {
      await fetch(`/api/calculadoras/${configData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
            {mode === 'add' ? 'Agregar Configuración' : 'Editar Configuración'}
          </h4>
          <button className="boorado-modal-close" onClick={handleClose} aria-label="Cerrar">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="boorado-modal-content">
          <div className="form-group">
            <label style={{ textAlign: 'left', display: 'block' }}>ID Utilizable: </label>
            <input
              className="form-control"
              name="utilizablesId"
              value={form.utilizablesId}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>ID Impresora: </label>
            <input
              className="form-control"
              name="impresoraId"
              value={form.impresoraId}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Costo por Tiempo: </label>
            <input
              className="form-control"
              name="costoPorTiempo"
              value={form.costoPorTiempo}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Costo Diseño: </label>
            <input
              className="form-control"
              name="costoDiseno"
              value={form.costoDiseno}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Costo Postprocesado: </label>
            <input
              className="form-control"
              name="costoPostprocesado"
              value={form.costoPostprocesado}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Costo Marketing/Entrega: </label>
            <input
              className="form-control"
              name="costoMarketingEntrega"
              value={form.costoMarketingEntrega}
              onChange={handleChange}
              type="number"
              min="0"
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

export default CalculadoraConfigModal;
