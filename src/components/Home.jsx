import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrinterDetails from './PrinterDetails';
import Printer from './Printer';
import ConsumableDetails from './consumables-details';
import Consumable from './consumables';
import QuoteRequest from './QuoteRequest';
import QuoteView from './QuoteView';
import CalculadoraModal from './CalculadoraModal'; // Importamos el componente CalculadoraModal
import '../styles/Home.css'; // Import the new CSS file

const Home = () => {
  const navigate = useNavigate();
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [showConsumableDetails, setShowConsumableDetails] = useState(false);
  const [showQuoteRequest, setShowQuoteRequest] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false); // Modal para agregar impresora
  const [showConsumableModal, setShowConsumableModal] = useState(false); // Modal para agregar consumible
  const [activeTab, setActiveTab] = useState('printer'); // Estado para la pestaña activa
  const [showCalculadoraAdd, setShowCalculadoraAdd] = useState(false); // Estado para agregar calculadora
  const [showCalculadoraEdit, setShowCalculadoraEdit] = useState(false); // Estado para editar calculadora
  const [selectedQuote, setSelectedQuote] = useState(null); // Estado para la cotización seleccionada
  const [quotes, setQuotes] = useState([]); // Estado para almacenar todas las cotizaciones
  const [printers, setPrinters] = useState([]); // Estado para almacenar las impresoras
  const [consumables, setConsumables] = useState([]); // Estado para almacenar los consumibles
  const [calculatorConfigs, setCalculatorConfigs] = useState([]); // Estado para almacenar las configuraciones de la calculadora
  const [selectedPrinterId, setSelectedPrinterId] = useState(null); // Estado para almacenar el ID de la impresora seleccionada
  const [selectedPrinterDetails, setSelectedPrinterDetails] = useState(null); // Estado para almacenar los detalles de la impresora seleccionada
  const [selectedConsumableId, setSelectedConsumableId] = useState(null); // Estado para almacenar el ID del consumible seleccionado
  const [selectedCalculatorId, setSelectedCalculatorId] = useState(null); // Estado para almacenar el ID de la configuración seleccionada
  const [selectedCalculatorDetails, setSelectedCalculatorDetails] = useState(null); // Estado para almacenar los detalles de la configuración seleccionada
  const [selectedQuoteId, setSelectedQuoteId] = useState(null); // Estado para almacenar el ID de la cotización seleccionada
  const [selectedQuoteDetails, setSelectedQuoteDetails] = useState(null); // Estado para almacenar los detalles de la cotización seleccionada

  const fetchQuotes = async () => {
    try {
      console.log('Realizando solicitud a /api/quotes'); // Confirmar que se está llamando a la API
      const response = await fetch(`/api/quotes`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Datos recibidos del servidor:', data); // Verificar los datos recibidos
      setQuotes(data); // Actualizar el estado con las cotizaciones
    } catch (error) {
      console.error('Error al cargar las cotizaciones:', error);
    }
  };

  const fetchPrinters = async () => {
    try {
      console.log('Realizando solicitud a /api/impresoras'); // Confirmar que se está llamando a la API
      const response = await fetch(`/api/impresoras`);
      if (!response.ok) throw new Error('Error al obtener las impresoras');
      const data = await response.json();
      console.log('Impresoras obtenidas:', data); // Verificar los datos
      setPrinters(data);
    } catch (error) {
      console.error('Error al cargar las impresoras:', error);
    }
  };

  const fetchConsumables = async () => {
    try {
      console.log('Realizando solicitud a /api/utilizables'); // Confirmar que se está llamando a la API
      const response = await fetch(`/api/utilizables`);
      if (!response.ok) throw new Error('Error al obtener los consumibles');
      const data = await response.json();
      console.log('Consumibles obtenidos:', data); // Verificar los datos
      setConsumables(data);
    } catch (error) {
      console.error('Error al cargar los consumibles:', error);
    }
  };

  const fetchCalculatorConfigs = async () => {
    try {
      console.log('Realizando solicitud a /api/calculadoras'); // Confirmar que se está llamando a la API
      const response = await fetch(`/api/calculadoras`);
      if (!response.ok) throw new Error('Error al obtener las configuraciones de calculadora');
      const data = await response.json();
      console.log('Configuraciones de calculadora obtenidas:', data); // Verificar los datos
      setCalculatorConfigs(data);
    } catch (error) {
      console.error('Error al cargar las configuraciones de calculadora:', error);
    }
  };

  const fetchPrinterDetails = async (printerId) => {
    try {
      console.log(`Realizando solicitud a /api/impresoras/${printerId}`); // Confirmar que se está llamando a la API correcta
      const response = await fetch(`/api/impresoras/${printerId}`); // Asegúrate de usar la ruta correcta
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Datos de la impresora recibidos del servidor:', data); // Verificar los datos recibidos
      setSelectedPrinterDetails(data); // Actualizar el estado con los detalles de la impresora
    } catch (error) {
      console.error('Error al cargar los detalles de la impresora:', error);
    }
  };

  const fetchConsumableDetails = async (consumableId) => {
    try {
      console.log(`Realizando solicitud a /api/utilizables/${consumableId}`); // Confirmar que se está llamando a la API
      const response = await fetch(`/api/utilizables/${consumableId}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Datos del consumible recibidos del servidor:', data); // Verificar los datos recibidos
      setSelectedConsumableId(data); // Actualizar el estado con los detalles del consumible
      setShowConsumableDetails(true); // Mostrar el modal
    } catch (error) {
      console.error('Error al cargar los detalles del consumible:', error);
    }
  };

  const fetchCalculatorDetails = async (calculatorId) => {
    try {
      console.log(`Realizando solicitud a /api/calculadoras/${calculatorId}`); // Depuración
      const response = await fetch(`/api/calculadoras/${calculatorId}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Datos de la configuración recibidos del servidor:', data); // Depuración
      setSelectedCalculatorDetails(data); // Actualizar el estado con los detalles de la configuración
      setShowCalculadoraEdit(true); // Mostrar el modal de edición
    } catch (error) {
      console.error('Error al cargar los detalles de la configuración:', error);
    }
  };

  const fetchQuoteDetails = async (quoteId) => {
    try {
      console.log(`Realizando solicitud a /api/cotizaciones/${quoteId}`); // Depuración
      const response = await fetch(`/api/cotizaciones/${quoteId}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Datos de la cotización recibidos del servidor:', data); // Depuración
      setSelectedQuoteDetails(data); // Actualizar el estado con los detalles de la cotización
      setShowQuoteRequest(true); // Mostrar el modal de edición
    } catch (error) {
      console.error('Error al cargar los detalles de la cotización:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'printer') {
      fetchPrinters(); // Consultar las impresoras al cambiar a la pestaña "Impresoras"
      fetchConsumables(); // Consultar los consumibles al cambiar a la pestaña "Impresoras"
    } else if (activeTab === 'calculator') {
      fetchCalculatorConfigs(); // Consultar las configuraciones al cambiar a la pestaña "Calculadora"
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'quotes') {
      fetchQuotes(); // Consultar las cotizaciones al cambiar a la pestaña "Cotizaciones"
    }
  };

  const handleShowPrinterDetails = () => {
    if (selectedPrinterId) {
      setShowPrinterDetails(true); // Mostrar el modal
    } else {
      alert('Por favor selecciona una impresora.');
    }
  };

  const handleClosePrinterDetails = () => setShowPrinterDetails(false);

  const handlePrinterSelection = (event) => {
    setSelectedPrinterId(event.target.value); // Actualizar el ID de la impresora seleccionada
  };

  const handleShowConsumableDetails = () => {
    if (selectedConsumableId) {
      setShowConsumableDetails(true); // Mostrar el modal
    } else {
      alert('Por favor selecciona un consumible.');
    }
  };

  const handleCloseConsumableDetails = () => setShowConsumableDetails(false);

  const handleConsumableSelection = (event) => {
    setSelectedConsumableId(event.target.value); // Actualizar el ID del consumible seleccionado
  };

  const handleShowQuoteRequest = () => {
    setSelectedQuoteDetails(null); // Asegurarse de que no haya datos de cotización seleccionados
    setShowQuoteRequest(true); // Mostrar el modal de agregar cotización
  };

  const handleCloseQuoteRequest = () => setShowQuoteRequest(false);

  const handleShowPrinterModal = () => setShowPrinterModal(true); // Mostrar modal de agregar impresora
  const handleClosePrinterModal = () => setShowPrinterModal(false); // Cerrar modal de agregar impresora

  const handleShowConsumableModal = () => setShowConsumableModal(true); // Mostrar modal de agregar consumible
  const handleCloseConsumableModal = () => setShowConsumableModal(false); // Cerrar modal de agregar consumible

  const handleShowCalculadoraAdd = () => setShowCalculadoraAdd(true); // Mostrar agregar calculadora
  const handleCloseCalculadoraAdd = () => setShowCalculadoraAdd(false); // Cerrar agregar calculadora

  const handleShowCalculadoraEdit = () => {
    if (selectedCalculatorId) {
      fetchCalculatorDetails(selectedCalculatorId); // Consultar los detalles de la configuración seleccionada
    } else {
      alert('Por favor selecciona una configuración.');
    }
  };

  const handleCloseCalculadoraEdit = () => setShowCalculadoraEdit(false); // Cerrar editar calculadora

  const handleQuoteSelection = (event) => {
    const selectedId = event.target.value;
    const quote = quotes.find((q) => q.id === parseInt(selectedId, 10));
    setSelectedQuote(quote);
    setSelectedQuoteId(selectedId);
  };

  const handleShowQuoteEdit = () => {
    if (selectedQuoteId) {
      fetchQuoteDetails(selectedQuoteId); // Consultar los detalles de la cotización seleccionada
    } else {
      alert('Por favor selecciona una cotización.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'printer':
        return (
          <div>
            <h3 className="mt-4">Registro de Impresoras</h3>
            <form>
              <div className="form-group">
                <label htmlFor="printerSelect">Selecciona una Impresora</label>
                <select
                  className="form-control"
                  id="printerSelect"
                  onChange={handlePrinterSelection}
                  value={selectedPrinterId || ''}
                >
                  <option value="" disabled>
                    -- Selecciona una impresora --
                  </option>
                  {printers.map((printer) => (
                    <option key={printer.id} value={printer.id}>
                      {printer.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowPrinterDetails}>
                  Editar
                </button>
                <button type="button" className="btn btn-success" onClick={handleShowPrinterModal}>
                  Agregar
                </button>
              </div>
              <h3 className="mt-4">Registro de Consumible</h3>
              <div className="form-group mt-3">
                <label htmlFor="consumableSelect">Selecciona un Consumible</label>
                <select
                  className="form-control"
                  id="consumableSelect"
                  onChange={handleConsumableSelection}
                  value={selectedConsumableId || ''}
                >
                  <option value="" disabled>
                    -- Selecciona un consumible --
                  </option>
                  {consumables.map((consumable) => (
                    <option key={consumable.id} value={consumable.id}>
                      {consumable.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowConsumableDetails}>
                  Editar
                </button>
                <button type="button" className="btn btn-success" onClick={handleShowConsumableModal}>
                  Agregar
                </button>
              </div>
            </form>
          </div>
        );
      case 'quotes':
        console.log('Renderizando cotizaciones:', quotes); // Confirmar los datos que llegan al select
        return (
          <div>
            <h3 className="mt-4">Cotizaciones</h3>
            <form>
              <div className="form-group">
                <select
                  className="form-control"
                  id="quoteSelect"
                  onChange={handleQuoteSelection}
                  value={selectedQuote?.id || ''}
                >
                  <option value="" disabled>
                    -- Selecciona una cotización --
                  </option>
                  {quotes.map((quote) => (
                    <option key={quote.id} value={quote.id}>
                      {quote.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowQuoteEdit}>
                  Editar
                </button>
                <button type="button" className="btn btn-success" onClick={handleShowQuoteRequest}>
                  Agregar
                </button>
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
                <label htmlFor="calculatorSelect">Selecciona una Configuración</label>
                <select
                  className="form-control"
                  id="calculatorSelect"
                  onChange={(e) => setSelectedCalculatorId(e.target.value)}
                  value={selectedCalculatorId || ''}
                >
                  <option value="" disabled>
                    -- Selecciona una configuración --
                  </option>
                  {calculatorConfigs.map((config) => (
                    <option key={config.id} value={config.id}>
                      Configuración {config.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="button" className="btn btn-primary" onClick={handleShowCalculadoraEdit}>
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
          <a className={`nav-link ${activeTab === 'printer' ? 'active' : ''}`} id="printer-tab" data-bs-toggle="tab" href="#printer" role="tab" aria-controls="printer" aria-selected={activeTab === 'printer'} onClick={() => handleTabChange('printer')}>
            Registro de Impresoras y Consumible
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'quotes' ? 'active' : ''}`} id="quotes-tab" data-bs-toggle="tab" href="#quotes" role="tab" aria-controls="quotes" aria-selected={activeTab === 'quotes'} onClick={() => handleTabChange('quotes')}>
            Cotizaciones
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'calculator' ? 'active' : ''}`} id="calculator-tab" data-bs-toggle="tab" href="#calculator" role="tab" aria-controls="calculator" aria-selected={activeTab === 'calculator'} onClick={() => handleTabChange('calculator')}>
            Calculadora
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        {renderContent()}
      </div>

      {/* Modales */}
      {showPrinterDetails && (
        <PrinterDetails
          showModal={showPrinterDetails}
          handleClose={handleClosePrinterDetails}
          selectedPrinterId={selectedPrinterId} // Pasar el ID seleccionado al modal
        />
      )}
      {showPrinterModal && <Printer showModal={showPrinterModal} handleClose={handleClosePrinterModal} />}
      {showConsumableDetails && (
        <ConsumableDetails
          showModal={showConsumableDetails}
          handleClose={handleCloseConsumableDetails}
          selectedConsumableId={selectedConsumableId} // Pasar el ID seleccionado al modal
        />
      )}
      {showConsumableModal && <Consumable showModal={showConsumableModal} handleClose={handleCloseConsumableModal} />}
      {showQuoteRequest && !selectedQuoteDetails && (
        <QuoteRequest
          showModal={showQuoteRequest}
          handleClose={handleCloseQuoteRequest}
        />
      )}
      {showQuoteRequest && selectedQuoteDetails && (
        <QuoteView
          showModal={showQuoteRequest}
          handleClose={handleCloseQuoteRequest}
          mode="edit"
          quoteData={selectedQuoteDetails} // Pasar los detalles de la cotización al modal
        />
      )}
      {showCalculadoraAdd && (
        <CalculadoraModal
          showModal={showCalculadoraAdd}
          handleClose={handleCloseCalculadoraAdd}
          mode="add"
        />
      )}
      {showCalculadoraEdit && selectedCalculatorDetails && (
        <CalculadoraModal
          showModal={showCalculadoraEdit}
          handleClose={handleCloseCalculadoraEdit}
          mode="edit"
          calculatorData={selectedCalculatorDetails} // Pasar los detalles de la configuración al modal
        />
      )}
    </div>
  );
};

export default Home;
