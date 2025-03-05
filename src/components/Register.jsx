import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tipo: '',
    edad: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h3>Registro de Usuarios</h3>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="registerName">Nombre</label>
          <input type="text" className="form-control" id="registerName" name="name" placeholder="Ingresa tu nombre" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">Correo Electrónico</label>
          <input type="email" className="form-control" id="registerEmail" name="email" placeholder="Ingresa tu correo electrónico" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Contraseña</label>
          <input type="password" className="form-control" id="registerPassword" name="password" placeholder="Crea una contraseña" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="registerTipo">Tipo</label>
          <input type="text" className="form-control" id="registerTipo" name="tipo" placeholder="Ingresa el tipo de usuario" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="registerEdad">Edad</label>
          <input type="number" className="form-control" id="registerEdad" name="edad" placeholder="Ingresa tu edad" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default Register;
