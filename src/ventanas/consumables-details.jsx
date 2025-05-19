import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const getTokenFromCookie = () => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

const ConsumablesDetails = ({ showModal, handleClose, selectedConsumableId }) => {
  const [consumableData, setConsumableData] = useState({
    nombre: '',
    cantidad: '',
    costoDeCompra: '',
    tipo: 'Filamento', // Valor predeterminado
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
          const token = getTokenFromCookie();
          const response = await fetch(`http://localhost:4000/api/utilizables/${selectedConsumableId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
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
  }, [selectedConsumableId, showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsumableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = getTokenFromCookie();
      const response = await fetch(`http://localhost:4000/api/utilizables/${selectedConsumableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(consumableData),
      });

      if (response.ok) {
        alert('Consumible actualizado exitosamente');
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error al actualizar el consumible: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error al actualizar el consumible. Verifica la conexión al servidor.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este consumible?');
    if (!confirmDelete) return;

    try {
      const token = getTokenFromCookie();
      const response = await fetch(`http://localhost:4000/api/utilizables/${selectedConsumableId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert('Consumible eliminado exitosamente');
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el consumible: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error al eliminar el consumible. Verifica la conexión al servidor.');
    }
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
              <label>Tipo de Consumible</label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="tipoFilamento"
                    name="tipo"
                    value="Filamento"
                    checked={consumableData.tipo === 'Filamento'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="tipoFilamento">
                    Filamento
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="tipoResinaUV"
                    name="tipo"
                    value="Resina UV"
                    checked={consumableData.tipo === 'Resina UV'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="tipoResinaUV">
                    Resina UV
                  </label>
                </div>
              </div>
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
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <Button variant="danger" onClick={handleDelete}>
            Borrar
          </Button>
          <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Aceptar
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsumablesDetails;
