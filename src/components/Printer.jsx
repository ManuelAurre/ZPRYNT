import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Printer = ({ showModal, handleClose }) => {
    const [printerModel, setPrinterModel] = useState('');
    const [printerType, setPrinterType] = useState('');
    const [printSpeed, setPrintSpeed] = useState('');
    const [costPerMinute, setCostPerMinute] = useState('');
    const [imagePreview, setImagePreview] = useState('./src/Img/ruta_de_la_imagen_de_impresora.jpg');

    const handleImageChange = (event) => {
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
        // Aquí puedes agregar la lógica para manejar el envío del formulario
        console.log({
            printerModel,
            printerType,
            printSpeed,
            costPerMinute,
            imagePreview,
        });
        // Cerrar el modal después de enviar
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registro de Impresoras</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="printerForm" onSubmit={handleSubmit}>
                    <div className="image-container mb-3">
                        <img src={imagePreview} alt="Imagen de la Impresora" id="imagePreview" className="img-fluid" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="printerModel">Modelo de Impresora</label>
                        <input
                            type="text"
                            className="form-control"
                            id="printerModel"
                            placeholder="Ingresa el modelo de la impresora"
                            required
                            value={printerModel}
                            onChange={(e) => setPrinterModel(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="printerType">Tipo de Impresora</label>
                        <div id="printerType">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="printerType"
                                    id="filament"
                                    value="Filamento"
                                    required
                                    checked={printerType === 'Filamento'}
                                    onChange={(e) => setPrinterType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="filament">
                                    Filamento
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="printerType"
                                    id="resin"
                                    value="ResinaUV"
                                    required
                                    checked={printerType === 'ResinaUV'}
                                    onChange={(e) => setPrinterType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="resin">
                                    Resina UV
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="printSpeed">Velocidad de Impresión (mm/s)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="printSpeed"
                            placeholder="Ingresa la velocidad de impresión en mm/s"
                            step="0.1"
                            required
                            value={printSpeed}
                            onChange={(e) => setPrintSpeed(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="costPerMinute">Costo por Minuto</label>
                        <input
                            type="number"
                            className="form-control"
                            id="costPerMinute"
                            placeholder="Ingresa el costo por minuto"
                            step="0.01"
                            required
                            value={costPerMinute}
                            onChange={(e) => setCostPerMinute(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="printerImage">Agregar Imagen de la Impresora</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="printerImage"
                            onChange={handleImageChange}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Registrar Impresora
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Printer;
