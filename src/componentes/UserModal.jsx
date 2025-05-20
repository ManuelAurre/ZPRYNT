import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';
import '../styles/Modal.css';

const UserModal = ({ showModal, handleClose, userId, onUserUpdated, puestos }) => {
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', tipo: '', edad: '' });
  const [passwordError, setPasswordError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showModal) setVisible(true);
    else if (visible) setTimeout(() => setVisible(false), 250);
  }, [showModal]);

  useEffect(() => {
    if (showModal && userId) {
      fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setForm({
            name: data.name || '',
            email: data.email || '',
            password: '',
            confirmPassword: '',
            tipo: data.tipo || '',
            edad: data.edad ? String(data.edad) : '',
          });
        });
    }
  }, [showModal, userId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    const { confirmPassword, ...toSend } = form;
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSend),
    });
    if (onUserUpdated) onUserUpdated();
    handleClose();
  };

  if (!showModal && !visible) return null;

  return (
    <div className="boorado-modal-backdrop">
      <div className={`boorado-modal ${showModal ? 'fade-in' : 'fade-out'}`}>
        <div className="boorado-modal-header">
          <h4 className="boorado-modal-header-left" style={{ margin: 0 }}>Editar Usuario</h4>
          <button
            className="boorado-modal-close"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="boorado-modal-content">
          <div className="form-group">
            <label style={{ textAlign: 'left', display: 'block' }}>Nombre: </label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Email: </label>
              <input
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Tipo (Puesto): </label>
              <select
                id="tipo"
                name="tipo"
                className="form-control"
                value={form.tipo}
                onChange={handleChange}
                required
                style={{ width: '150px' }}
              >
                <option value="">Seleccione un puesto</option>
                {puestos && puestos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Contraseña: </label>
              <input
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Confirmar Contraseña: </label>
              <input
                className="form-control"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
          </div>
          {passwordError && (
            <div style={{ color: 'red', marginTop: 4, fontSize: 13, textAlign: 'left' }}>{passwordError}</div>
          )}
          <div className="form-group mt-2" style={{ textAlign: 'left' }}>
            <label style={{ display: 'block' }}>Edad: </label>
            <input
              className="form-control"
              name="edad"
              value={form.edad}
              onChange={handleChange}
              type="number"
              min="0"
              required
              style={{ width: 100, display: 'block', marginLeft: 0 }}
            />
          </div>
          <div className="boorado-modal-buttons mt-3">
            <button type="submit" className="btn-morado">Guardar</button>
            <button type="button" className="btn-gris" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
