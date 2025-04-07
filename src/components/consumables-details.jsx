import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConsumablesDetails = ({ showModal, handleClose, selectedConsumableId }) => {
  const [consumableData, setConsumableData] = useState({
    nombre: '',
    cantidad: '',
    costoDeCompra: '',
    tipo: '',
    material: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConsumableDetails = async () => {
      if (selectedConsumableId && showModal) {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`http://localhost:4000/api/utilizables/${selectedConsumableId}`);
          if (response.ok) {
            const data = await response.json();
            setConsumableData({
              nombre: data.nombre,
              cantidad: data.cantidad.toString(),
              costoDeCompra: data.costoDeCompra.toString(),
              tipo: data.tipo,
              material: data.material,
            });
          } else {
            setError('Error al obtener los detalles del consumible');
          }
        } catch (error) {
          setError('Error en la solicitud al servidor');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConsumableDetails();
  }, [selectedConsumableId, showModal]); // Ejecutar cuando cambia el ID seleccionado o se abre el modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsumableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Consumible</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Consumible</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={consumableData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                name="cantidad"
                value={consumableData.cantidad}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="costoDeCompra">Costo de Compra</label>
              <input
                type="number"
                className="form-control"
                id="costoDeCompra"
                name="costoDeCompra"
                value={consumableData.costoDeCompra}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="tipo">Tipo</label>
              <input
                type="text"
                className="form-control"
                id="tipo"
                name="tipo"
                value={consumableData.tipo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="material">Material</label>
              <input
                type="text"
                className="form-control"
                id="material"
                name="material"
                value={consumableData.material}
                onChange={handleChange}
              />
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsumablesDetails;
