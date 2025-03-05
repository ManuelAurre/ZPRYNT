import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuoteRequest = () => {
    const [showModal, setShowModal] = useState(false); // Estado para manejar el modal

    const handleBackClick = () => {
        window.location.href = './src/components/home.jsx'; // Cambia esto por la ruta de React que desees
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(true); // Muestra el modal al enviar el formulario
        console.log("Solicitud enviada");
    };

    const handleClose = () => {
        setShowModal(false); // Cierra el modal
    };

    return (
        <div className="container mt-5">
            <h3>Solicitar Cotización</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="modelLink">Link del modelo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="modelLink" 
                        placeholder="Poner link del modelo aquí" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción del pedido</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows="3" 
                        placeholder="Descripción del pedido" 
                        required 
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="desiredSize">Tamaño Deseado</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="desiredSize" 
                        placeholder="Tamaño deseado" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Presupuesto</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="budget" 
                        placeholder="Presupuesto" 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar Solicitud</button>
                <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Volver</button>
            </form>

            {/* Modal de Confirmación */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Solicitud Enviada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tu solicitud de cotización ha sido enviada con éxito. Nos pondremos en contacto contigo pronto.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default QuoteRequest;
