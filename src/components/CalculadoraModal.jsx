import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CalculadoraModal = ({ showModal, handleClose, mode, calculatorData }) => {
  const [formData, setFormData] = useState({
    utilizablesId: '',
    impresoraId: '',
    costoPorTiempo: '',
    costoDiseno: '',
    costoPostprocesado: '',
    costoMarketingEntrega: '',
  });

  const [printers, setPrinters] = useState([]); // Estado para almacenar las impresoras
  const [consumables, setConsumables] = useState([]); // Estado para almacenar los consumibles

  useEffect(() => {
    if (calculatorData && mode === 'edit') {
      setFormData({
        utilizablesId: calculatorData.utilizablesId.toString(),
        impresoraId: calculatorData.impresoraId.toString(),
        costoPorTiempo: calculatorData.costoPorTiempo.toString(),
        costoDiseno: calculatorData.costoDiseno.toString(),
        costoPostprocesado: calculatorData.costoPostprocesado.toString(),
        costoMarketingEntrega: calculatorData.costoMarketingEntrega.toString(),
      });
    }
  }, [calculatorData, mode]);

  const fetchPrinters = async () => {
    try {
      const response = await fetch(`/api/impresoras`);
      if (!response.ok) throw new Error('Error al obtener las impresoras');
      const data = await response.json();
      setPrinters(data);
    } catch (error) {
      console.error('Error al cargar las impresoras:', error);
    }
  };

  const fetchConsumables = async () => {
    try {
      const response = await fetch(`/api/utilizables`);
      if (!response.ok) throw new Error('Error al obtener los consumibles');
      const data = await response.json();
      setConsumables(data);
    } catch (error) {
      console.error('Error al cargar los consumibles:', error);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchPrinters();
      fetchConsumables();
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
      utilizablesId: parseInt(formData.utilizablesId, 10),
      impresoraId: parseInt(formData.impresoraId, 10),
      costoPorTiempo: parseFloat(formData.costoPorTiempo),
      costoDiseno: parseFloat(formData.costoDiseno),
      costoPostprocesado: parseFloat(formData.costoPostprocesado),
      costoMarketingEntrega: parseFloat(formData.costoMarketingEntrega),
    };

    console.log('Datos enviados:', payload);

    try {
      const url = mode === 'add' ? '/api/calculadoras' : `/api/calculadoras/${calculatorData.id}`;
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
        alert(mode === 'add' ? 'Configuración registrada exitosamente' : 'Configuración actualizada exitosamente');
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        alert(`Error al ${mode === 'add' ? 'registrar' : 'actualizar'} la configuración: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert(`Error al ${mode === 'add' ? 'registrar' : 'actualizar'} la configuración. Verifica la conexión al servidor.`);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Configuración' : 'Editar Configuración'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="calculatorForm" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="impresoraId">Impresora</label>
            <select
              className="form-control"
              id="impresoraId"
              name="impresoraId"
              value={formData.impresoraId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>-- Selecciona una impresora --</option>
              {printers.map((printer) => (
                <option key={printer.id} value={printer.id}>{printer.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="utilizablesId">Consumible</label>
            <select
              className="form-control"
              id="utilizablesId"
              name="utilizablesId"
              value={formData.utilizablesId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>-- Selecciona un consumible --</option>
              {consumables.map((consumable) => (
                <option key={consumable.id} value={consumable.id}>{consumable.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="costoPorTiempo">Costo por Tiempo</label>
            <input
              type="number"
              className="form-control"
              id="costoPorTiempo"
              name="costoPorTiempo"
              placeholder="Ingresa el costo por tiempo"
              step="0.01"
              required
              value={formData.costoPorTiempo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="costoDiseno">Costo de Diseño</label>
            <input
              type="number"
              className="form-control"
              id="costoDiseno"
              name="costoDiseno"
              placeholder="Ingresa el costo de diseño"
              step="0.01"
              required
              value={formData.costoDiseno}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="costoPostprocesado">Costo de Postprocesado</label>
            <input
              type="number"
              className="form-control"
              id="costoPostprocesado"
              name="costoPostprocesado"
              placeholder="Ingresa el costo de postprocesado"
              step="0.01"
              required
              value={formData.costoPostprocesado}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="costoMarketingEntrega">Costo de Marketing y Entrega</label>
            <input
              type="number"
              className="form-control"
              id="costoMarketingEntrega"
              name="costoMarketingEntrega"
              placeholder="Ingresa el costo de marketing y entrega"
              step="0.01"
              required
              value={formData.costoMarketingEntrega}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {mode === 'add' ? 'Agregar Configuración' : 'Guardar Cambios'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalculadoraModal;
