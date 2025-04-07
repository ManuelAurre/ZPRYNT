import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuoteRequest = ({ showModal, handleClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        link: '',
        presupuesto: '',
        tamano: '',
        DescripcionCliente: '',
        tipo: 'Filamento', // Valor predeterminado
        diseno: '',
        postprocesado: '',
        marketingEntrega: '',
        comentarios: '',
        idConfiguracionCalculadora: '',
    });

    const configuracionesDummy = [
        { id: 1, nombre: 'Configuración 1' },
        { id: 2, nombre: 'Configuración 2' },
        { id: 3, nombre: 'Configuración 3' },
    ];

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
            tipo: e.target.value, // Actualizamos el valor de `tipo` según el botón seleccionado
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            nombre: formData.nombre,
            link: formData.link,
            presupuesto: parseFloat(formData.presupuesto),
            tamano: formData.tamano,
            DescripcionCliente: formData.DescripcionCliente,
            tipo: formData.tipo,
            diseno: formData.diseno,
            postprocesado: formData.postprocesado,
            marketingEntrega: formData.marketingEntrega,
            comentarios: formData.comentarios,
            idConfiguracionCalculadora: formData.idConfiguracionCalculadora,
        };

        console.log('Datos enviados:', payload);

        try {
            const response = await fetch('http://localhost:4000/api/cotizaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);
                alert('Cotización registrada exitosamente');
                handleClose();
            } else {
                const errorData = await response.json();
                console.error('Error del servidor:', errorData);
                alert(`Error al registrar la cotización: ${errorData.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al registrar la cotización. Verifica la conexión al servidor.');
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Solicitar Cotización</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="quoteForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa el nombre de la cotización"
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="link"
                            name="link"
                            placeholder="Ingresa el link relacionado"
                            required
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="presupuesto">Presupuesto</label>
                        <input
                            type="number"
                            className="form-control"
                            id="presupuesto"
                            name="presupuesto"
                            placeholder="Ingresa el presupuesto"
                            step="0.01"
                            required
                            value={formData.presupuesto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="tamano">Tamaño</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tamano"
                            name="tamano"
                            placeholder="Ingresa el tamaño"
                            required
                            value={formData.tamano}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="DescripcionCliente">Descripción del Cliente</label>
                        <textarea
                            className="form-control"
                            id="DescripcionCliente"
                            name="DescripcionCliente"
                            placeholder="Ingresa la descripción del cliente"
                            rows="3"
                            required
                            value={formData.DescripcionCliente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Tipo</label>
                        <div>
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
                        <label htmlFor="diseno">Diseño</label>
                        <input
                            type="text"
                            className="form-control"
                            id="diseno"
                            name="diseno"
                            placeholder="Ingresa el diseño"
                            value={formData.diseno}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="postprocesado">Postprocesado</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postprocesado"
                            name="postprocesado"
                            placeholder="Ingresa el postprocesado"
                            value={formData.postprocesado}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="marketingEntrega">Marketing y Entrega</label>
                        <input
                            type="text"
                            className="form-control"
                            id="marketingEntrega"
                            name="marketingEntrega"
                            placeholder="Ingresa el marketing y entrega"
                            value={formData.marketingEntrega}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="comentarios">Comentarios</label>
                        <textarea
                            className="form-control"
                            id="comentarios"
                            name="comentarios"
                            placeholder="Ingresa comentarios adicionales"
                            rows="3"
                            value={formData.comentarios}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="idConfiguracionCalculadora">Configuración Calculadora</label>
                        <select
                            className="form-control"
                            id="idConfiguracionCalculadora"
                            name="idConfiguracionCalculadora"
                            value={formData.idConfiguracionCalculadora}
                            onChange={handleChange}
                        >
                            <option value="" disabled>-- Selecciona una configuración --</option>
                            {configuracionesDummy.map((config) => (
                                <option key={config.id} value={config.id}>{config.nombre}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Registrar Cotización
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuoteRequest;
