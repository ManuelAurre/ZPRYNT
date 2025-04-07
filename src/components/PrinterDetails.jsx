import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PrinterDetails = ({ showModal, handleClose, selectedPrinterId }) => {
  const [printerData, setPrinterData] = useState({
    nombre: '',
    tipo: '',
    imagen: '',
    velocidad: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrinterDetails = async () => {
      if (selectedPrinterId && showModal) {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`http://localhost:4000/api/impresoras/${selectedPrinterId}`);
          if (response.ok) {
            const data = await response.json();
            setPrinterData({
              nombre: data.nombre,
              tipo: data.tipo,
              imagen: data.imagen,
              velocidad: data.velocidad.toString(),
            });
          } else {
            setError('Error al obtener los detalles de la impresora');
          }
        } catch (error) {
          setError('Error en la solicitud al servidor');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPrinterDetails();
  }, [selectedPrinterId, showModal]); // Ejecutar cuando cambia el ID seleccionado o se abre el modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrinterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Impresora</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <form>
            <div className="form-group">
              <label htmlFor="printerName">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="printerName"
                name="nombre"
                value={printerData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="printerType">Tipo:</label>
              <input
                type="text"
                className="form-control"
                id="printerType"
                name="tipo"
                value={printerData.tipo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="printerImage">Imagen:</label>
              <input
                type="text"
                className="form-control"
                id="printerImage"
                name="imagen"
                value={printerData.imagen}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="printerSpeed">Velocidad:</label>
              <input
                type="text"
                className="form-control"
                id="printerSpeed"
                name="velocidad"
                value={printerData.velocidad}
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

export default PrinterDetails;
