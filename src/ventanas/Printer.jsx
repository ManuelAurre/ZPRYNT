import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const getTokenFromCookie = () => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

const Printer = ({ showModal, handleClose, mode }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    imagen: '',
    velocidad: '',
  });

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
      tipo: formData.tipo,
      imagen: formData.imagen,
      velocidad: parseFloat(formData.velocidad),
    };

    console.log('Datos enviados:', payload);

    try {
      const token = getTokenFromCookie();
      const response = await fetch('http://localhost:4000/api/impresoras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        alert('Impresora registrada exitosamente');
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        alert(`Error al registrar la impresora: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al registrar la impresora. Verifica la conexión al servidor.');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Impresora' : 'Editar Impresora'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa el nombre de la impresora"
            />
          </Form.Group>
          <Form.Group controlId="tipo" className="mt-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              placeholder="Ingresa el tipo de impresora"
            />
          </Form.Group>
          <Form.Group controlId="imagen" className="mt-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="Ingresa la URL de la imagen"
            />
          </Form.Group>
          <Form.Group controlId="velocidad" className="mt-3">
            <Form.Label>Velocidad</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="velocidad"
              value={formData.velocidad}
              onChange={handleChange}
              placeholder="Ingresa la velocidad de la impresora"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Printer;
