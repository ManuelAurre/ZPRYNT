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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
          document.cookie = `token=${data.token}; path=/; max-age=86400;`;
          navigate('/home');
        } else {
          // Si el backend responde con el token como texto plano
          data = await response.text();
          // Si el texto parece un token, lo guardamos
          if (data && data.length > 10) { // Ajusta la condición según tu token
            document.cookie = `token=${data}; path=/; max-age=86400;`;
            navigate('/home');
          } else {
            alert('Respuesta inesperada del servidor. Contacta al administrador.');
          }
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
      <form onSubmit={handleSubmit}>
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
