import React from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h3>Registro de Usuarios</h3>
      <form id="registerForm">
        <div className="form-group">
          <label htmlFor="registerName">Nombre</label>
          <input type="text" className="form-control" id="registerName" placeholder="Ingresa tu nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">Correo Electrónico</label>
          <input type="email" className="form-control" id="registerEmail" placeholder="Ingresa tu correo electrónico" required />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Contraseña</label>
          <input type="password" className="form-control" id="registerPassword" placeholder="Crea una contraseña" required />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default Register;
