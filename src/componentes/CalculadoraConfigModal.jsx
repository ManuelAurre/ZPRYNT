import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const CalculadoraConfigModal = ({
  showModal,
  handleClose,
  mode = 'add',
  configData,
  onSaved,
}) => {
  const [utilizables, setUtilizables] = useState([]);
  const [impresoras, setImpresoras] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [form, setForm] = useState({
    utilizablesId: '',
    impresoraId: '',
    responsableDiseno: '',
    responsablePostprocesado: '',
    responsableMarketing: '',
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUtilizables = async () => {
      const res = await fetch('/api/utilizables');
      const data = await res.json();
      setUtilizables(data);
    };
    const fetchImpresoras = async () => {
      const res = await fetch('/api/impresoras');
      const data = await res.json();
      setImpresoras(data);
    };
    const fetchUsuarios = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsuarios(data);
    };
    const fetchPuestos = async () => {
      const res = await fetch('/api/puestos');
      const data = await res.json();
      setPuestos(data);
    };
    fetchUtilizables();
    fetchImpresoras();
    fetchUsuarios();
    fetchPuestos();
  }, []);

  useEffect(() => {
    if (mode === 'edit' && configData) {
      setForm({
        utilizablesId: configData.utilizablesId ? String(configData.utilizablesId) : '',
        impresoraId: configData.impresoraId ? String(configData.impresoraId) : '',
        responsableDiseno: configData.costoDiseno ? String(configData.costoDiseno) : '',
        responsablePostprocesado: configData.costoPostprocesado ? String(configData.costoPostprocesado) : '',
        responsableMarketing: configData.costoMarketingEntrega ? String(configData.costoMarketingEntrega) : '',
      });
    } else if (mode === 'add') {
      setForm({
        utilizablesId: '',
        impresoraId: '',
        responsableDiseno: '',
        responsablePostprocesado: '',
        responsableMarketing: '',
      });
    }
  }, [mode, configData, showModal]);

  useEffect(() => {
    if (showModal) setVisible(true);
    else if (visible) setTimeout(() => setVisible(false), 250);
  }, [showModal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getUsuarioLabel = (usuario) => {
    const puesto = puestos.find(p => String(p.id) === String(usuario.tipo));
    return puesto
      ? `${usuario.name} - ${puesto.nombre} ($${puesto.cuotaPorHora})`
      : usuario.name;
  };

  // Filtrado de usuarios por nombre de puesto
  const usuariosPorPuesto = (nombrePuesto) => {
    const puesto = puestos.find(p => p.nombre.trim() === nombrePuesto.trim());
    if (!puesto) return [];
    return usuarios.filter(u => String(u.tipo) === String(puesto.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar los ids de responsables como los campos de costo
    const toSend = {
      utilizablesId: form.utilizablesId,
      impresoraId: form.impresoraId,
      costoPorTiempo: '0',
      costoDiseno: form.responsableDiseno,
      costoPostprocesado: form.responsablePostprocesado,
      costoMarketingEntrega: form.responsableMarketing,
    };
    if (mode === 'add') {
      await fetch('/api/calculadoras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSend),
      });
    } else if (mode === 'edit' && configData?.id) {
      await fetch(`/api/calculadoras/${configData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSend),
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
            {mode === 'add' ? 'Agregar Configuración' : 'Editar Configuración'}
          </h4>
          <button className="boorado-modal-close" onClick={handleClose} aria-label="Cerrar">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="boorado-modal-content">
          <div className="form-group">
            <label style={{ textAlign: 'left', display: 'block' }}>Consumible: </label>
            <select
              className="form-control"
              name="utilizablesId"
              value={form.utilizablesId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un consumible</option>
              {utilizables.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Impresora: </label>
            <select
              className="form-control"
              name="impresoraId"
              value={form.impresoraId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una impresora</option>
              {impresoras.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Responsable de Diseño: </label>
            <select
              className="form-control"
              name="responsableDiseno"
              value={form.responsableDiseno}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione usuario</option>
              {usuariosPorPuesto('Diseño').map((u) => (
                <option key={u.id} value={u.id}>
                  {getUsuarioLabel(u)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Responsable de Post Procesado: </label>
            <select
              className="form-control"
              name="responsablePostprocesado"
              value={form.responsablePostprocesado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione usuario</option>
              {usuariosPorPuesto('Post Procesado').map((u) => (
                <option key={u.id} value={u.id}>
                  {getUsuarioLabel(u)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Responsable de Marketing: </label>
            <select
              className="form-control"
              name="responsableMarketing"
              value={form.responsableMarketing}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione usuario</option>
              {usuariosPorPuesto('Marketing').map((u) => (
                <option key={u.id} value={u.id}>
                  {getUsuarioLabel(u)}
                </option>
              ))}
            </select>
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
