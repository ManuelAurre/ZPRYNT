import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuoteView = () => {
    const [showModal, setShowModal] = useState(true); // Inicialmente el modal está abierto

    const handleClose = () => {
        setShowModal(false); // Cierra el modal
    };

    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Cotización</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            src="/Img/ruta_de_la_imagen_de_cotizacion.jpg" 
                            alt="Imagen de Cotización" 
                            className="img-fluid" 
                        />
                    </div>
                    <div className="col-md-6">
                        <h3>Cotización X</h3>
                        <p><strong>Link del Modelo:</strong> <a href="#" target="_blank" rel="noopener noreferrer">Enlace al modelo</a></p>
                        <p><strong>Descripción del Pedido:</strong> Una descripción detallada del pedido.</p>
                        <p><strong>Tamaño Deseado:</strong> Medidas específicas del tamaño.</p>
                        <p><strong>Presupuesto:</strong> Monto asignado para el pedido.</p>
                        <p><strong>Costo Total:</strong> $123.45</p>
                        <p><strong>Impresora a Usar:</strong> Impresora X</p>
                        <p><strong>Tipo de Impresión:</strong> Tipo específico de impresión.</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Volver
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuoteView;
