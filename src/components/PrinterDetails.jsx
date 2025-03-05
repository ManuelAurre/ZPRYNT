import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PrinterDetails = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Impresora</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img
              src="./Img/ruta_de_la_imagen_de_impresora.jpg" // Update the path to the image
              alt="Imagen de Impresora"
              className="img-fluid"
            />
            {/* Sección para cargar nueva imagen */}
            <div className="form-group mt-3">
              <label htmlFor="uploadImage">Cargar Nueva Imagen:</label>
              <input type="file" className="form-control-file" id="uploadImage" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="printerName">Nombre:</label>
              <input type="text" className="form-control" id="printerName" defaultValue="Impresora X" />
            </div>
            <div className="form-group">
              <label htmlFor="printerSpeed">Velocidad:</label>
              <input type="text" className="form-control" id="printerSpeed" defaultValue="30 mm/s" />
            </div>
            <div className="form-group">
              <label htmlFor="printerCost">Costo por Tiempo:</label>
              <input type="text" className="form-control" id="printerCost" defaultValue="$0.90 por minuto" />
            </div>
            <div className="form-group">
              <label htmlFor="printerType">Tipo de Impresora:</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="filament" name="printerType" value="filament" defaultChecked />
                <label className="form-check-label" htmlFor="filament">
                  Filamento
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="resinUV" name="printerType" value="resinUV" />
                <label className="form-check-label" htmlFor="resinUV">
                  Resina UV
                </label>
              </div>
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Editar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Volver
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PrinterDetails;
