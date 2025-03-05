import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Modal.css'; // Import the new CSS file

const QuoteRequest = ({ showModal, handleClose }) => {
    const [modelLink, setModelLink] = useState('');
    const [description, setDescription] = useState('');
    const [desiredSize, setDesiredSize] = useState('');
    const [budget, setBudget] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            modelLink,
            description,
            desiredSize,
            budget,
        });
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Solicitar Cotización</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="quoteRequestForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="modelLink">Link del modelo</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="modelLink" 
                            placeholder="Poner link del modelo aquí" 
                            required 
                            value={modelLink}
                            onChange={(e) => setModelLink(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="description">Descripción del pedido</label>
                        <textarea 
                            className="form-control" 
                            id="description" 
                            rows="3" 
                            placeholder="Descripción del pedido" 
                            required 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="desiredSize">Tamaño Deseado</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="desiredSize" 
                            placeholder="Tamaño deseado" 
                            required 
                            value={desiredSize}
                            onChange={(e) => setDesiredSize(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="budget">Presupuesto</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="budget" 
                            placeholder="Presupuesto" 
                            required 
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Enviar Solicitud
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuoteRequest;
