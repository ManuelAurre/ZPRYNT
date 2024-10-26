import React from 'react';



const Login = () => {
  return (
    <div className="container mt-5">
      <h3>Inicio de Sesión</h3>
      <form>
        <div className="form-group">
          <label htmlFor="loginEmail">Correo Electrónico</label>
          <input type="email" className="form-control" id="loginEmail" placeholder="Ingresa tu correo electrónico" />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Contraseña</label>
          <input type="password" className="form-control" id="loginPassword" placeholder="Ingresa tu contraseña" />
        </div>
        <button type="button" className="btn btn-primary" onClick={() => window.location.href='/home'}>
          Iniciar Sesión
        </button>
        <button type="button" className="btn btn-link" onClick={() => window.location.href='/register'}>
          Registrarte
        </button>
      </form>
    </div>
  );
};

export default Login;
