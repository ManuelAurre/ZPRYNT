import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Modal.css'; // Import the new CSS file

const Consumables = ({ showModal, handleClose }) => {
    const [consumableName, setConsumableName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchaseCost, setPurchaseCost] = useState('');
    const [saleCost, setSaleCost] = useState('');
    const [consumableType, setConsumableType] = useState('');
    const [material, setMaterial] = useState('');
    const [imagePreview, setImagePreview] = useState('./src/Img/ruta_de_la_imagen_de_consumible.jpg');

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
        console.log({
            consumableName,
            quantity,
            purchaseCost,
            saleCost,
            consumableType,
            material,
            imagePreview,
        });
        // Aquí puedes agregar la lógica para manejar el envío del formulario
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registro de Consumibles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="consumableForm" onSubmit={handleSubmit}>
                    <div className="image-container mb-3">
                        <img src={imagePreview} alt="Imagen del Consumible" id="imagePreview" className="img-fluid" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="consumableName">Nombre del Consumible</label>
                        <input
                            type="text"
                            className="form-control"
                            id="consumableName"
                            placeholder="Ingresa el nombre del consumible"
                            required
                            value={consumableName}
                            onChange={(e) => setConsumableName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="consumableQuantity">Cantidad</label>
                        <input
                            type="number"
                            className="form-control"
                            id="consumableQuantity"
                            placeholder="Ingresa la cantidad disponible"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="purchaseCost">Costo de Compra</label>
                        <input
                            type="number"
                            className="form-control"
                            id="purchaseCost"
                            placeholder="Ingresa el costo de compra"
                            step="0.01"
                            required
                            value={purchaseCost}
                            onChange={(e) => setPurchaseCost(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="saleCost">Costo de Venta</label>
                        <input
                            type="number"
                            className="form-control"
                            id="saleCost"
                            placeholder="Ingresa el costo de venta"
                            step="0.01"
                            required
                            value={saleCost}
                            onChange={(e) => setSaleCost(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="consumableType">Tipo de Consumible</label>
                        <div id="consumableType">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="consumableType"
                                    id="filament"
                                    value="Filamento"
                                    required
                                    checked={consumableType === 'Filamento'}
                                    onChange={(e) => setConsumableType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="filament">
                                    Filamento
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="consumableType"
                                    id="resinUV"
                                    value="Resina UV"
                                    required
                                    checked={consumableType === 'Resina UV'}
                                    onChange={(e) => setConsumableType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="resinUV">
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
                            placeholder="Ingresa el material del consumible"
                            required
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="consumableImage">Agregar Imagen del Consumible</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="consumableImage"
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
                    Registrar Consumible
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Consumables;
