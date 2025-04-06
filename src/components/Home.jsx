import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrinterDetails from './PrinterDetails';
import Printer from './Printer';
import ConsumableDetails from './consumables-details';
import Consumable from './consumables';
import QuoteRequest from './QuoteRequest';
import QuoteView from './QuoteView';
import QuoteViewVendors from './QuoteViewVendors';
import CalculadoraModal from './CalculadoraModal'; // Importamos el componente CalculadoraModal
import '../styles/Home.css'; // Import the new CSS file

const Home = () => {
  const navigate = useNavigate();
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [showConsumableDetails, setShowConsumableDetails] = useState(false);
  const [showQuoteView, setShowQuoteView] = useState(false);
  const [showQuoteRequest, setShowQuoteRequest] = useState(false);
  const [showQuoteViewVendors, setShowQuoteViewVendors] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false); // Modal para agregar impresora
  const [showConsumableModal, setShowConsumableModal] = useState(false); // Modal para agregar consumible
  const [activeTab, setActiveTab] = useState('printer'); // Estado para la pestaña activa
  const [showCalculadoraAdd, setShowCalculadoraAdd] = useState(false); // Estado para agregar calculadora
  const [showCalculadoraEdit, setShowCalculadoraEdit] = useState(false); // Estado para editar calculadora

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

  const handleShowCalculadoraAdd = () => setShowCalculadoraAdd(true); // Mostrar agregar calculadora
  const handleCloseCalculadoraAdd = () => setShowCalculadoraAdd(false); // Cerrar agregar calculadora

  const handleShowCalculadoraEdit = () => setShowCalculadoraEdit(true); // Mostrar editar calculadora
  const handleCloseCalculadoraEdit = () => setShowCalculadoraEdit(false); // Cerrar editar calculadora

  const renderContent = () => {
    switch (activeTab) {
      case 'printer':
        return (
          <div>
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
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowPrinterDetails}>Ver</button>
                <button type="button" className="btn btn-success" onClick={handleShowPrinterModal}>Agregar</button>
              </div>
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
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowConsumableDetails}>Ver</button>
                <button type="button" className="btn btn-success" onClick={handleShowConsumableModal}>Agregar</button>
              </div>
            </form>
          </div>
        );
      case 'quote-clients':
        return (
          <div>
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
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowQuoteView}>Ver</button>
                <button type="button" className="btn btn-success" onClick={handleShowQuoteRequest}>Pedir</button>
              </div>
            </form>
          </div>
        );
      case 'quote-vendors':
        return (
          <div>
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
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowQuoteViewVendors}>Ver</button>
              </div>
            </form>
          </div>
        );
      case 'calculator':
        return (
          <div>
            <h3 className="mt-4">Calculadora</h3>
            <form>
              <div className="form-group">
                <label htmlFor="calculatorSelect">Selecciona una Calculadora</label>
                <select className="form-control" id="calculatorSelect">
                  {/* Aquí se llenará dinámicamente con datos de la base de datos */}
                  <option>Calculadora 1</option>
                  <option>Calculadora 2</option>
                  <option>Calculadora 3</option>
                </select>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-secondary" onClick={handleShowCalculadoraEdit}>
                  Editar
                </button>
                <button type="button" className="btn btn-success" onClick={handleShowCalculadoraAdd}>
                  Agregar
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

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
          <a className={`nav-link ${activeTab === 'printer' ? 'active' : ''}`} id="printer-tab" data-bs-toggle="tab" href="#printer" role="tab" aria-controls="printer" aria-selected={activeTab === 'printer'} onClick={() => setActiveTab('printer')}>
            Registro de Impresoras y Consumible
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'quote-clients' ? 'active' : ''}`} id="quote-clients-tab" data-bs-toggle="tab" href="#quote-clients" role="tab" aria-controls="quote-clients" aria-selected={activeTab === 'quote-clients'} onClick={() => setActiveTab('quote-clients')}>
            Cotizaciones Clientes
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'quote-vendors' ? 'active' : ''}`} id="quote-vendors-tab" data-bs-toggle="tab" href="#quote-vendors" role="tab" aria-controls="quote-vendors" aria-selected={activeTab === 'quote-vendors'} onClick={() => setActiveTab('quote-vendors')}>
            Cotizaciones Vendedores
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'calculator' ? 'active' : ''}`} id="calculator-tab" data-bs-toggle="tab" href="#calculator" role="tab" aria-controls="calculator" aria-selected={activeTab === 'calculator'} onClick={() => setActiveTab('calculator')}>
            Calculadora
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        {renderContent()}
      </div>

      {/* Modales */}
      {showPrinterDetails && <PrinterDetails showModal={showPrinterDetails} handleClose={handleClosePrinterDetails} />}
      {showPrinterModal && <Printer showModal={showPrinterModal} handleClose={handleClosePrinterModal} />}
      {showConsumableDetails && <ConsumableDetails showModal={showConsumableDetails} handleClose={handleCloseConsumableDetails} />}
      {showConsumableModal && <Consumable showModal={showConsumableModal} handleClose={handleCloseConsumableModal} />}
      {showQuoteRequest && <QuoteRequest showModal={showQuoteRequest} handleClose={handleCloseQuoteRequest} />}
      {showQuoteView && <QuoteView showModal={showQuoteView} handleClose={handleCloseQuoteView} />}
      {showQuoteViewVendors && <QuoteViewVendors showModal={showQuoteViewVendors} handleClose={handleCloseQuoteViewVendors} />}
      {showCalculadoraAdd && (
        <CalculadoraModal
          showModal={showCalculadoraAdd}
          handleClose={handleCloseCalculadoraAdd}
          mode="add"
        />
      )}
      {showCalculadoraEdit && (
        <CalculadoraModal
          showModal={showCalculadoraEdit}
          handleClose={handleCloseCalculadoraEdit}
          mode="edit"
        />
      )}
    </div>
  );
};

export default Home;
