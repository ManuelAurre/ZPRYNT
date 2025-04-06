import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios para realizar solicitudes HTTP
import PrinterDetails from './PrinterDetails';
import Printer from './Printer';
import ConsumableDetails from './consumables-details';
import Consumable from './consumables';
import QuoteRequest from './QuoteRequest';
import QuoteView from './QuoteView';
import QuoteViewVendors from './QuoteViewVendors';
import CalculadoraModal from './CalculadoraModal';
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
  const [showCalculadoraEdit, setShowCalculadoraEdit] = useState(false); // Modal para editar calculadora
  const [showCalculadoraAdd, setShowCalculadoraAdd] = useState(false); // Modal para agregar calculadora
  const [activeTab, setActiveTab] = useState('printer'); // Estado para la pestaña activa
  const [printers, setPrinters] = useState([]); // Estado para almacenar las impresoras
  const [newPrinterName, setNewPrinterName] = useState(''); // Estado para el nombre de la nueva impresora

  useEffect(() => {
    // Obtener impresoras desde la base de datos al cargar el componente
    const fetchPrinters = async () => {
      try {
        const response = await axios.get('/api/printers');
        setPrinters(response.data);
      } catch (error) {
        console.error('Error al obtener las impresoras:', error);
      }
    };
    fetchPrinters();
  }, []);

  const handleAddPrinter = async () => {
    if (!newPrinterName) return;
    try {
      const response = await axios.post('/api/printers', { name: newPrinterName });
      setPrinters([...printers, response.data]); // Actualizar la lista de impresoras
      setNewPrinterName(''); // Limpiar el campo de entrada
    } catch (error) {
      console.error('Error al agregar la impresora:', error);
    }
  };

  const handleEditPrinter = async (id, newName) => {
    try {
      const response = await axios.put(`/api/printers/${id}`, { name: newName });
      setPrinters(printers.map(printer => (printer.id === id ? response.data : printer)));
    } catch (error) {
      console.error('Error al editar la impresora:', error);
    }
  };

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

  const handleShowCalculadoraEdit = () => setShowCalculadoraEdit(true);
  const handleCloseCalculadoraEdit = () => setShowCalculadoraEdit(false);

  const handleShowCalculadoraAdd = () => setShowCalculadoraAdd(true);
  const handleCloseCalculadoraAdd = () => setShowCalculadoraAdd(false);

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
                  {printers.map(printer => (
                    <option key={printer.id} value={printer.id}>
                      {printer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowPrinterDetails}>Ver</button>
                <button type="button" className="btn btn-success" onClick={handleShowPrinterModal}>Agregar</button>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="newPrinterName">Nueva Impresora</label>
                <input
                  type="text"
                  className="form-control"
                  id="newPrinterName"
                  value={newPrinterName}
                  onChange={(e) => setNewPrinterName(e.target.value)}
                />
                <button type="button" className="btn btn-success mt-2" onClick={handleAddPrinter}>
                  Agregar Impresora
                </button>
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
      case 'posts':
        return (
          <div>
          <h3 className="mt-4">Configuración</h3>
          <form>
            <div className="form-group">
             
              <select className="form-control" id="quoteSelectClients">
                <option>Cotización 1</option>
                <option>Cotización 2</option>
                <option>Cotización 3</option>
              </select>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <button type="button" className="btn btn-primary" onClick={handleShowCalculadoraEdit}>Editar</button>
              <button type="button" className="btn btn-success" onClick={handleShowCalculadoraAdd}>Agregar</button>
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
export default Home;
