import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Modal.css'; // Import the new CSS file

const Consumables = ({ showModal, handleClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        cantidad: '',
        tipo: 'Filamento', // Valor predeterminado
        material: '',
        costoDeCompra: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRadioChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            tipo: e.target.value, // Actualizamos el tipo según el radio button seleccionado
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            nombre: formData.nombre,
            cantidad: parseFloat(formData.cantidad),
            cantidadActual: parseFloat(formData.cantidad), // `cantidadActual` toma el valor de `cantidad`
            tipo: formData.tipo,
            material: formData.material,
            costoDeCompra: formData.costoDeCompra,
        };

        console.log('Datos enviados:', payload);

        try {
            const response = await fetch('http://localhost:4000/api/utilizables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);
                alert('Consumible registrado exitosamente');
                handleClose();
            } else {
                const errorData = await response.json();
                console.error('Error del servidor:', errorData);
                alert(`Error al registrar el consumible: ${errorData.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al registrar el consumible. Verifica la conexión al servidor.');
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registro de Consumibles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="consumableForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del Consumible</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa el nombre del consumible"
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cantidad"
                            name="cantidad"
                            placeholder="Ingresa la cantidad total"
                            required
                            value={formData.cantidad}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="tipo">Tipo de Consumible</label>
                        <div id="tipo">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="tipo"
                                    id="filamento"
                                    value="Filamento"
                                    checked={formData.tipo === 'Filamento'}
                                    onChange={handleRadioChange}
                                />
                                <label className="form-check-label" htmlFor="filamento">
                                    Filamento
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="tipo"
                                    id="resinaUV"
                                    value="Resina UV"
                                    checked={formData.tipo === 'Resina UV'}
                                    onChange={handleRadioChange}
                                />
                                <label className="form-check-label" htmlFor="resinaUV">
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
                            name="material"
                            placeholder="Ingresa el material del consumible"
                            required
                            value={formData.material}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="costoDeCompra">Costo de Compra</label>
                        <input
                            type="text"
                            className="form-control"
                            id="costoDeCompra"
                            name="costoDeCompra"
                            placeholder="Ingresa el costo de compra"
                            required
                            value={formData.costoDeCompra}
                            onChange={handleChange}
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
