import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConsumablesDetails = ({ showModal, handleClose }) => {
    const [consumableName, setConsumableName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchaseCost, setPurchaseCost] = useState('');
    const [saleCost, setSaleCost] = useState('');
    const [consumableType, setConsumableType] = useState('');
    const [material, setMaterial] = useState('');
    const [imagePreview, setImagePreview] = useState('./src/Img/ruta_de_la_imagen_de_consumible.jpg'); // Update the path to the image

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
        handleClose(); // Cierra el modal después de enviar
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Consumible</Modal.Title>
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
                        <label htmlFor="quantity">Cantidad</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Ingresa la cantidad"
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
                        <input
                            type="text"
                            className="form-control"
                            id="consumableType"
                            placeholder="Ingresa el tipo de consumible"
                            required
                            value={consumableType}
                            onChange={(e) => setConsumableType(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="material">Material</label>
                        <input
                            type="text"
                            className="form-control"
                            id="material"
                            placeholder="Ingresa el material"
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

export default ConsumablesDetails;
