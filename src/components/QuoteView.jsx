import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Modal.css'; // Import the new CSS file

const QuoteView = ({ showModal, handleClose, mode, quoteData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    link: '',
    presupuesto: '',
    tamano: '',
    DescripcionCliente: '',
    tipo: 'Filamento',
    diseno: '',
    postprocesado: '',
    marketingEntrega: '',
    comentarios: '',
    idConfiguracionCalculadora: '',
  });

  const [calculatorConfigs, setCalculatorConfigs] = useState([]); // Estado para almacenar las configuraciones de la calculadora

  useEffect(() => {
    if (quoteData && mode === 'edit') {
      setFormData({
        nombre: quoteData.nombre,
        link: quoteData.link,
        presupuesto: quoteData.presupuesto.toString(),
        tamano: quoteData.tamano,
        DescripcionCliente: quoteData.DescripcionCliente,
        tipo: quoteData.tipo,
        diseno: quoteData.diseno || '',
        postprocesado: quoteData.postprocesado || '',
        marketingEntrega: quoteData.marketingEntrega || '',
        comentarios: quoteData.comentarios || '',
        idConfiguracionCalculadora: quoteData.idConfiguracionCalculadora || '',
      });
    }
  }, [quoteData, mode]);

  const fetchCalculatorConfigs = async () => {
    try {
      const response = await fetch(`/api/calculadoras`);
      if (!response.ok) throw new Error('Error al obtener las configuraciones de la calculadora');
      const data = await response.json();
      setCalculatorConfigs(data);
    } catch (error) {
      console.error('Error al cargar las configuraciones de la calculadora:', error);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchCalculatorConfigs();
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      nombre: formData.nombre,
      link: formData.link,
      presupuesto: parseFloat(formData.presupuesto),
      tamano: formData.tamano,
      DescripcionCliente: formData.DescripcionCliente,
      tipo: formData.tipo,
      diseno: formData.diseno,
      postprocesado: formData.postprocesado,
      marketingEntrega: formData.marketingEntrega,
      comentarios: formData.comentarios,
      idConfiguracionCalculadora: formData.idConfiguracionCalculadora,
    };

    console.log('Datos enviados:', payload);

    try {
      const url = mode === 'add' ? '/api/cotizaciones' : `/api/cotizaciones/${quoteData.id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        alert(mode === 'add' ? 'Cotización registrada exitosamente' : 'Cotización actualizada exitosamente');
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        alert(`Error al ${mode === 'add' ? 'registrar' : 'actualizar'} la cotización: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert(`Error al ${mode === 'add' ? 'registrar' : 'actualizar'} la cotización. Verifica la conexión al servidor.`);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Cotización' : 'Editar Cotización'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="quoteForm" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              placeholder="Ingresa el nombre de la cotización"
              required
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              placeholder="Ingresa el link relacionado"
              required
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="presupuesto">Presupuesto</label>
            <input
              type="number"
              className="form-control"
              id="presupuesto"
              name="presupuesto"
              placeholder="Ingresa el presupuesto"
              step="0.01"
              required
              value={formData.presupuesto}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="tamano">Tamaño</label>
            <input
              type="text"
              className="form-control"
              id="tamano"
              name="tamano"
              placeholder="Ingresa el tamaño"
              required
              value={formData.tamano}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="DescripcionCliente">Descripción del Cliente</label>
            <textarea
              className="form-control"
              id="DescripcionCliente"
              name="DescripcionCliente"
              placeholder="Ingresa la descripción del cliente"
              rows="3"
              required
              value={formData.DescripcionCliente}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="idConfiguracionCalculadora">Configuración Calculadora</label>
            <select
              className="form-control"
              id="idConfiguracionCalculadora"
              name="idConfiguracionCalculadora"
              value={formData.idConfiguracionCalculadora}
              onChange={handleChange}
            >
              <option value="" disabled>-- Selecciona una configuración --</option>
              {calculatorConfigs.map((config) => (
                <option key={config.id} value={config.id}>
                  Configuración {config.id}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {mode === 'add' ? 'Agregar Cotización' : 'Guardar Cambios'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuoteView;
