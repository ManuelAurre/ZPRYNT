import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Update the import path

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          document.cookie = `token=${data.token}; path=/;`;
          navigate('/home');
        } else {
          console.error('No se recibió token del backend');
        }
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo-zprynt">
        <img src={require('../Img/Logo.jpg')} alt="Logo ZPRYNT" className="login-logo" />
        <span className="login-zprynt-text">ZPRYNT</span>
      </div>
      <h3>Inicio de Sesión</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="loginEmail">Correo Electrónico</label>
          <input type="email" className="form-control" id="loginEmail" name="email" placeholder="Ingresa tu correo electrónico" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Contraseña</label>
          <input type="password" className="form-control" id="loginPassword" name="password" placeholder="Ingresa tu contraseña" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn-login-primary">Iniciar Sesión</button>
        <button type="button" className="btn-login-link" onClick={() => navigate('/register')}>Registrarte</button>
      </form>
    </div>
  );
};

export default Login;
