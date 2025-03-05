import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrinterDetails from './PrinterDetails';
import Printer from './Printer';
import ConsumableDetails from './consumables-details';
import Consumable from './consumables';
import QuoteRequest from './QuoteRequest';
import QuoteView from './QuoteView';
import QuoteViewVendors from './QuoteViewVendors';

const Home = () => {
  const navigate = useNavigate();
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [showConsumableDetails, setShowConsumableDetails] = useState(false);
  const [showQuoteView, setShowQuoteView] = useState(false);
  const [showQuoteRequest, setShowQuoteRequest] = useState(false);
  const [showQuoteViewVendors, setShowQuoteViewVendors] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false); // Modal para agregar impresora
  const [showConsumableModal, setShowConsumableModal] = useState(false); // Modal para agregar consumible

  const handleShowPrinterDetails = () => setShowPrinterDetails(true);
  const handleClosePrinterDetails = () => setShowPrinterDetails(false);

  const handleShowConsumableDetails = () => setShowConsumableDetails(true);
  const handleCloseConsumableDetails = () => setShowConsumableDetails(false);

  const handleShowQuoteView = () => setShowQuoteView(true);
  const handleCloseQuoteView = () => setShowQuoteView(false);

  const handleShowQuoteRequest = () => setShowQuoteRequest(true);
  const handleCloseQuoteRequest = () => setShowQuoteRequest(false);

  const handleShowQuoteViewVendors = () => setShowQuoteViewVendors(true);
  const handleCloseQuoteViewVendors = () => setShowQuoteViewVendors(false);

  const handleShowPrinterModal = () => setShowPrinterModal(true); // Mostrar modal de agregar impresora
  const handleClosePrinterModal = () => setShowPrinterModal(false); // Cerrar modal de agregar impresora

  const handleShowConsumableModal = () => setShowConsumableModal(true); // Mostrar modal de agregar consumible
  const handleCloseConsumableModal = () => setShowConsumableModal(false); // Cerrar modal de agregar consumible

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Impresoras3D</h2>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/login')}>
          Salir
        </button>
      </div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="printer-tab" data-bs-toggle="tab" href="#printer" role="tab" aria-controls="printer" aria-selected="true">
            Registro de Impresoras y Consumible
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="quote-clients-tab" data-bs-toggle="tab" href="#quote-clients" role="tab" aria-controls="quote-clients" aria-selected="false">
            Cotizaciones Clientes
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="quote-vendors-tab" data-bs-toggle="tab" href="#quote-vendors" role="tab" aria-controls="quote-vendors" aria-selected="false">
            Cotizaciones Vendedores
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="posts-tab" data-bs-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="false">
            Publicaciones
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        {/* Pantalla de Registro de Impresoras y Consumible */}
        <div className="tab-pane fade show active" id="printer" role="tabpanel" aria-labelledby="printer-tab">
          <h3 className="mt-4">Registro de Impresoras</h3>
          <form>
            <div className="form-group">
              <label htmlFor="printerSelect">Selecciona una Impresora</label>
              <select className="form-control" id="printerSelect">
                <option>Impresora 1</option>
                <option>Impresora 2</option>
                <option>Impresora 3</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleShowPrinterDetails}>Ver</button>
            <button type="button" className="btn btn-success" onClick={handleShowPrinterModal}>Agregar</button>
            <h3 className="mt-4">Registro de Consumible</h3>
            <div className="form-group mt-3">
              <label htmlFor="consumableSelect">Selecciona un Consumible</label>
              <select className="form-control" id="consumableSelect">
                <option>Filamento 1</option>
                <option>Filamento 2</option>
                <option>Resina UV 1</option>
                <option>Resina UV 2</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleShowConsumableDetails}>Ver</button>
            <button type="button" className="btn btn-success" onClick={handleShowConsumableModal}>Agregar</button>
          </form>
        </div>

        {/* Pantalla de Cotizaciones Clientes */}
        <div className="tab-pane fade" id="quote-clients" role="tabpanel" aria-labelledby="quote-clients-tab">
          <h3 className="mt-4">Cotizaciones Clientes</h3>
          <form>
            <div className="form-group">
              <label htmlFor="quoteSelectClients">Selecciona una Cotización</label>
              <select className="form-control" id="quoteSelectClients">
                <option>Cotización 1</option>
                <option>Cotización 2</option>
                <option>Cotización 3</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleShowQuoteView}>Ver</button>
            <button type="button" className="btn btn-success" onClick={handleShowQuoteRequest}>Pedir</button>
          </form>
        </div>

        {/* Pantalla de Cotizaciones Vendedores */}
        <div className="tab-pane fade" id="quote-vendors" role="tabpanel" aria-labelledby="quote-vendors-tab">
          <h3 className="mt-4">Cotizaciones Vendedores</h3>
          <form>
            <div className="form-group">
              <label htmlFor="quoteSelectVendors">Selecciona una Cotización</label>
              <select className="form-control" id="quoteSelectVendors">
                <option>Cotización 1</option>
                <option>Cotización 2</option>
                <option>Cotización 3</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleShowQuoteViewVendors}>Ver</button>
          </form>
        </div>

        {/* Pantalla de Publicaciones */}
        <div className="tab-pane fade" id="posts" role="tabpanel" aria-labelledby="posts-tab">
          <h3 className="mt-4">Publicaciones</h3>
          <form>
            <div className="form-group">
              <label htmlFor="imageUpload">Cargar Foto</label>
              <input type="file" className="form-control" id="imageUpload" />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="postText">Texto de la Publicación</label>
              <textarea className="form-control" id="postText" rows="4" placeholder="Escribe el texto aquí"></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Publicar</button>
          </form>
        </div>
      </div>

      {/* Modales */}
      <PrinterDetails showModal={showPrinterDetails} handleClose={handleClosePrinterDetails} />
      <Printer showModal={showPrinterModal} handleClose={handleClosePrinterModal} /> 
      <ConsumableDetails showModal={showConsumableDetails} handleClose={handleCloseConsumableDetails} />
      <Consumable showModal={showConsumableModal} handleClose={handleCloseConsumableModal} /> 
      <QuoteRequest showModal={showQuoteRequest} handleClose={handleCloseQuoteRequest} />
      <QuoteView showModal={showQuoteView} handleClose={handleCloseQuoteView} />
      <QuoteViewVendors showModal={showQuoteViewVendors} handleClose={handleCloseQuoteViewVendors} />
    </div>
  );
};

export default Home;
