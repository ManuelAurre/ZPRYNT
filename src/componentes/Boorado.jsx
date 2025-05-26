import React, { useEffect, useState } from 'react';
import '../styles/componentes.css';

const Boorado = ({ show, onDeleted, onCancel, item }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) setVisible(true);
    else if (visible) setTimeout(() => setVisible(false), 250);
  }, [show]);

  const handleAccept = async () => {
    if (!item || !item.id || !item.tabla) return;
    setLoading(true);
    let url = '';
    if (item.tabla === 'users') url = `/api/users/${item.id}`;
    else if (item.tabla === 'puestos') url = `/api/puestos/${item.id}`;
    else if (item.tabla === 'impresoras') url = `/api/impresoras/${item.id}`;
    else if (item.tabla === 'utilizables') url = `/api/utilizables/${item.id}`;
    else if (item.tabla === 'cotizaciones') url = `/api/cotizaciones/${item.id}`;
    else if (item.tabla === 'calculadoras') url = `/api/calculadoras/${item.id}`;
    else if (item.tabla === 'ventas') url = `/api/ventas/${item.id}`;
    else {
      alert('Tabla no soportada');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) {
        const error = await res.json();
        alert('No se pudo eliminar el registro: ' + (error.error || res.statusText));
      } else {
        setVisible(false); // Cierra el modal con animación
        if (onDeleted) onDeleted();
      }
    } catch (err) {
      alert('Error en la petición de borrado');
    }
    setLoading(false);
  };

  if (!show && !visible) return null;

  return (
    <div className="boorado-modal-backdrop">
      <div className={`boorado-modal ${show ? 'fade-in' : 'fade-out'}`}>
        <div className="boorado-modal-header">
          <span className="boorado-modal-header-left">Confirmar borrado: </span>
          <button className="boorado-modal-close" onClick={onCancel} aria-label="Cerrar">&times;</button>
        </div>
        <div className="boorado-modal-content">
          <p>¿Seguro que deseas borrar los datos?</p>
          <div className="boorado-modal-buttons">
            <button
              className="btn-morado"
              onClick={handleAccept}
              disabled={loading || !(item && item.id && item.tabla)}
            >Aceptar</button>
            <button className="btn-gris" onClick={onCancel} disabled={loading}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boorado;
