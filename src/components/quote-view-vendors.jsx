import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuoteViewVendors = () => {
    const [imagePreview, setImagePreview] = useState('placeholder-image.jpg');
    const [costTotal, setCostTotal] = useState('');
    const [selectedPrinter, setSelectedPrinter] = useState('Impresora 1');
    const [printType, setPrintType] = useState('filament');
    const [showModal, setShowModal] = useState(false); // Estado para el modal
    const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFinishClick = () => {
        setModalMessage('¿Estás seguro de que deseas finalizar la cotización?');
        setShowModal(true);
    };

    const handleRejectClick = () => {
        setModalMessage('¿Estás seguro de que deseas rechazar la cotización?');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirm = () => {
        // Aquí puedes manejar la lógica para finalizar o rechazar la cotización
        console.log("Cotización finalizada/rechazada");
        setShowModal(false); // Cierra el modal después de confirmar
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Detalles de la Cotización</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-start">
                            <div className="image-container">
                                <img src={imagePreview} alt="Imagen de la Cotización" id="imagePreview" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>Detalles</h3>
                            <p><strong>Link del Modelo:</strong> <a href="#">Enlace</a></p>
                            <p><strong>Descripción del Pedido:</strong> Descripción del pedido...</p>
                            <p><strong>Tamaño Deseado:</strong> Tamaño...</p>
                            <p><strong>Presupuesto:</strong> $...</p>
                            <div className="form-group">
                                <label htmlFor="costTotal">Costo:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="costTotal" 
                                    placeholder="Ingrese el costo"
                                    value={costTotal}
                                    onChange={(e) => setCostTotal(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="printerSelect">Impresora a Usar:</label>
                                <select 
                                    className="form-control" 
                                    id="printerSelect" 
                                    value={selectedPrinter}
                                    onChange={(e) => setSelectedPrinter(e.target.value)}
                                >
                                    <option>Impresora 1</option>
                                    <option>Impresora 2</option>
                                    <option>Impresora 3</option>
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label>Tipo de Impresión:</label>
                                <div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="printType" 
                                            id="filament" 
                                            value="filament" 
                                            checked={printType === 'filament'}
                                            onChange={() => setPrintType('filament')}
                                        />
                                        <label className="form-check-label" htmlFor="filament">
                                            Filamento
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="printType" 
                                            id="resinUV" 
                                            value="resinUV" 
                                            checked={printType === 'resinUV'}
                                            onChange={() => setPrintType('resinUV')}
                                        />
                                        <label className="form-check-label" htmlFor="resinUV">
                                            Resina UV
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="cotizacionImage">Agregar Imagen de la Cotización</label>
                                <input 
                                    type="file" 
                                    className="form-control-file" 
                                    id="cotizacionImage" 
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="button" className="btn btn-success" onClick={handleFinishClick}>Finalizar</button>
                        <button type="button" className="btn btn-danger" onClick={handleRejectClick}>Rechazar</button>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmación */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default QuoteViewVendors;
