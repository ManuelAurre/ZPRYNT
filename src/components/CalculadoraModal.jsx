import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CalculadoraModal = ({ showModal, handleClose, isEdit }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Editar Calculadora' : 'Agregar Calculadora'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="filamentoId">
            <Form.Label>Consumible</Form.Label>
            <Form.Control as="select">
              <option>Filamento 1</option>
              <option>Filamento 2</option>
              <option>Filamento 3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="impresoraId" className="mt-3">
            <Form.Label>Impresora</Form.Label>
            <Form.Control as="select">
              <option>Impresora 1</option>
              <option>Impresora 2</option>
              <option>Impresora 3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="costoPorTiempo" className="mt-3">
            <Form.Label>Costo por Tiempo</Form.Label>
            <Form.Control type="text" placeholder="Ingrese el costo por tiempo" />
          </Form.Group>
          <Form.Group controlId="diseno" className="mt-3">
            <Form.Label>Diseño</Form.Label>
            <Form.Control type="text" placeholder="Ingrese el diseño" />
          </Form.Group>
          <Form.Group controlId="postprocesado" className="mt-3">
            <Form.Label>Postprocesado</Form.Label>
            <Form.Control type="text" placeholder="Ingrese el postprocesado" />
          </Form.Group>
          <Form.Group controlId="marketingEntrega" className="mt-3">
            <Form.Label>Marketing/Entrega</Form.Label>
            <Form.Control type="text" placeholder="Ingrese marketing/entrega" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary">
          {isEdit ? 'Guardar Cambios' : 'Agregar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalculadoraModal;
