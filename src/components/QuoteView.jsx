import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Modal.css'; // Import the new CSS file

const QuoteView = ({ showModal, handleClose }) => {
    const [imagePreview, setImagePreview] = useState('placeholder-image.jpg');
    const [costTotal, setCostTotal] = useState('');
    const [selectedPrinter, setSelectedPrinter] = useState('Impresora 1');
    const [printType, setPrintType] = useState('filament');

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            costTotal,
            selectedPrinter,
            printType,
            imagePreview,
        });
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Cotización</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="quoteForm" onSubmit={handleSubmit}>
                    <div className="image-container mb-3">
                        <img src={imagePreview} alt="Imagen de la Cotización" id="imagePreview" className="img-fluid" />
                    </div>
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
                        <label htmlFor="quoteImage">Agregar Imagen de la Cotización</label>
                        <input 
                            type="file" 
                            className="form-control-file" 
                            id="quoteImage" 
                            onChange={handleFileChange}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuoteView;
