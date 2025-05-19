import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrinterDetails from './PrinterDetails';
import Printer from './Printer';
import ConsumableDetails from './consumables-details';
import Consumable from './consumables';
import QuoteRequest from './QuoteRequest';
import QuoteView from './QuoteView';
import CalculadoraModal from './CalculadoraModal'; // Importamos el componente CalculadoraModal
import TablaDatos from '../componentes/TablaDatos'; // Importar el nuevo componente
import Boorado from '../componentes/Boorado'; // Importar el componente Boorado
import UserModal from '../componentes/UserModal'; // Importar el modal de usuario
import PrinterModal from '../componentes/PrinterModal'; // Importar el nuevo modal de impresoras
import ConsumableModal from '../componentes/ConsumableModal'; // Importar el modal de consumibles
import QuoteModal from '../componentes/QuoteModal'; // Importar el modal de cotizaciones
import CalculadoraConfigModal from '../componentes/CalculadoraConfigModal'; // Importar el modal de configuración de calculadora
import '../styles/Home.css'; // Import the new CSS file

const Home = () => {
  const navigate = useNavigate();
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [showConsumableDetails, setShowConsumableDetails] = useState(false);
  const [showQuoteRequest, setShowQuoteRequest] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false); // Modal para agregar/editar impresora
  const [printerModalMode, setPrinterModalMode] = useState('add'); // Modo del modal de impresoras
  const [printerEditData, setPrinterEditData] = useState(null); // Datos para editar impresora
  const [showConsumableModal, setShowConsumableModal] = useState(false); // Modal para agregar consumible
  const [consumableModalMode, setConsumableModalMode] = useState('add'); // Modo del modal de consumibles
  const [consumableEditData, setConsumableEditData] = useState(null); // Datos para editar consumible
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
  const [tablaSeleccionada, setTablaSeleccionada] = useState('impresoras'); // Estado para el select de tabla
  const [usuarios, setUsuarios] = useState([]); // Estado para usuarios
  const [showBoorado, setShowBoorado] = useState(false); // Estado para mostrar el modal de borrado
  const [deleteInfo, setDeleteInfo] = useState({ id: null, tabla: null }); // Estado para la información de borrado
  const [showUserModal, setShowUserModal] = useState(false); // Estado para mostrar el modal de usuario
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el ID del usuario seleccionado
  const [showQuoteModal, setShowQuoteModal] = useState(false); // Estado para mostrar el modal de cotizaciones
  const [quoteModalMode, setQuoteModalMode] = useState('add'); // Modo del modal de cotizaciones
  const [quoteEditData, setQuoteEditData] = useState(null); // Datos para editar cotización
  const [showCalculadoraConfigModal, setShowCalculadoraConfigModal] = useState(false); // Estado para mostrar el modal de configuración de calculadora
  const [calculadoraConfigModalMode, setCalculadoraConfigModalMode] = useState('add'); // Modo del modal de configuración de calculadora
  const [calculadoraConfigEditData, setCalculadoraConfigEditData] = useState(null); // Datos para editar configuración de calculadora

  const getTokenFromCookie = () => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
  };

  useEffect(() => {
    // Redirigir a login si no hay token
    const token = getTokenFromCookie();
    if (!token) {
      navigate('/login');
    }
  }, []);

  const fetchWithAuth = async (url, options = {}) => {
    const token = getTokenFromCookie();
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchQuotes = async () => {
    try {
      console.log('Realizando solicitud a /api/quotes'); // Confirmar que se está llamando a la API
      const response = await fetchWithAuth(`/api/quotes`);
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
      const response = await fetchWithAuth(`/api/impresoras`);
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
      const response = await fetchWithAuth(`/api/utilizables`);
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
      const response = await fetchWithAuth(`/api/calculadoras`);
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
      const response = await fetchWithAuth(`/api/impresoras/${printerId}`); // Asegúrate de usar la ruta correcta
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
      const response = await fetchWithAuth(`/api/utilizables/${consumableId}`);
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
      const response = await fetchWithAuth(`/api/calculadoras/${calculatorId}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Datos de la configuración recibidos del servidor:', data); // Depuración
      setSelectedCalculatorDetails(data); // Actualizar el estado con los detalles de la configuración
    } catch (error) {
      console.error('Error al cargar los detalles de la configuración:', error);
    }
  };

  const fetchQuoteDetails = async (quoteId) => {
    try {
      console.log(`Realizando solicitud a /api/cotizaciones/${quoteId}`); // Depuración
      const response = await fetchWithAuth(`/api/cotizaciones/${quoteId}`);
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

  const fetchUsuarios = async () => {
    try {
      const response = await fetchWithAuth('/api/users'); // <-- minúsculas
      const errorText = !response.ok ? await response.text() : '';
      console.error(
        `[fetchUsuarios] status: ${response.status} ${response.statusText}`,
        errorText
      );
      if (!response.ok) throw new Error(`Error al obtener usuarios: ${response.status} ${response.statusText} - ${errorText}`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'printer') {
      fetchPrinters(); // Consultar las impresoras al cambiar a la pestaña "Impresoras"
    } else if (activeTab === 'consumibles') {
      fetchConsumables(); // Consultar los consumibles al cambiar a la pestaña "Consumibles"
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

  const handleShowPrinterModal = () => {
    setPrinterModalMode('add');
    setPrinterEditData(null);
    setShowPrinterModal(true);
  };

  const handleEditPrinter = async (id) => {
    const res = await fetch(`/api/impresoras/${id}`);
    const data = await res.json();
    setPrinterModalMode('edit');
    setPrinterEditData(data);
    setShowPrinterModal(true);
  };

  const handleShowConsumableModal = () => {
    setConsumableModalMode('add');
    setConsumableEditData(null);
    setShowConsumableModal(true);
  };

  const handleEditConsumable = async (id) => {
    const res = await fetch(`/api/utilizables/${id}`);
    const data = await res.json();
    setConsumableModalMode('edit');
    setConsumableEditData(data);
    setShowConsumableModal(true);
  };

  const handleCloseConsumableModal = () => setShowConsumableModal(false); // Cerrar modal de agregar consumible

  const handleShowCalculadoraAdd = () => setShowCalculadoraAdd(true); // Mostrar agregar calculadora
  const handleCloseCalculadoraAdd = () => setShowCalculadoraAdd(false); // Cerrar agregar calculadora

  const handleShowCalculadoraEdit = () => {
    if (selectedCalculatorId) {
      fetchCalculatorDetails(selectedCalculatorId); // Consultar los detalles de la configuración seleccionada
      setShowCalculadoraEdit(true); // Mostrar el modal de edición
    } else {
      alert('Por favor selecciona una configuración.');
    }
  };

  const handleCloseCalculadoraEdit = () => setShowCalculadoraEdit(false); // Cerrar editar calculadora

  const handleShowCalculadoraConfigModal = () => {
    setCalculadoraConfigModalMode('add');
    setCalculadoraConfigEditData(null);
    setShowCalculadoraConfigModal(true);
  };

  const handleEditCalculadoraConfig = async (id) => {
    const res = await fetch(`/api/calculadoras/${id}`);
    const data = await res.json();
    setCalculadoraConfigModalMode('edit');
    setCalculadoraConfigEditData(data);
    setShowCalculadoraConfigModal(true);
  };

  const handleQuoteSelection = (event) => {
    const selectedId = event.target.value;
    const quote = quotes.find((q) => q.id === parseInt(selectedId, 10));
    setSelectedQuote(quote);
    setSelectedQuoteId(selectedId);
  };

  const handleShowQuoteModal = () => {
    setQuoteModalMode('add');
    setQuoteEditData(null);
    setShowQuoteModal(true);
  };

  const handleEditQuote = async (id) => {
    const res = await fetch(`/api/cotizaciones/${id}`);
    const data = await res.json();
    setQuoteModalMode('edit');
    setQuoteEditData(data);
    setShowQuoteModal(true);
  };

  const handleDeleteClick = (id, tabla) => {
    setDeleteInfo({ id, tabla });
    setShowBoorado(true);
  };

  const handleEditClick = (id, tabla) => {
    if (tabla === 'users') {
      setSelectedUserId(id);
      setShowUserModal(true);
    }
  };

  const handleAcceptDelete = async () => {
    // Aquí puedes hacer la petición de borrado según la tabla
    // Ejemplo:
    // await fetch(`/api/${deleteInfo.tabla}/${deleteInfo.id}`, { method: 'DELETE' });
    setShowBoorado(false);
    setDeleteInfo({ id: null, tabla: null });
    // Recargar datos si es necesario
  };

  const handleCancelDelete = () => {
    setShowBoorado(false);
    setDeleteInfo({ id: null, tabla: null });
  };

  const columnasTablas = {
    impresoras: [
      { key: 'id', label: 'ID' },
      { key: 'nombre', label: 'Nombre' },
    ],
    consumibles: [
      { key: 'id', label: 'ID' },
      { key: 'nombre', label: 'Nombre' },
    ],
    cotizaciones: [
      { key: 'id', label: 'ID' },
      { key: 'nombre', label: 'Nombre' },
    ],
    calculadoras: [
      { key: 'id', label: 'ID' },
    ],
  };

  const columnasUsuarios = [
    { key: 'name', label: 'Nombre' }, // Cambia 'nombre' por 'name'
    { key: 'email', label: 'Email' },
    { key: 'tipo', label: 'Tipo' },
  ];

  const datosTabla = (() => {
    switch (tablaSeleccionada) {
      case 'impresoras':
        return printers;
      case 'consumibles':
        return consumables;
      case 'cotizaciones':
        return quotes;
      case 'calculadoras':
        return calculatorConfigs;
      default:
        return [];
    }
  })();

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        console.log('Renderizando usuarios:', usuarios); // Depuración
        return (
          <div>
            <h3 className="mt-4">Personal Participante</h3>
            <TablaDatos
              columnas={columnasUsuarios}
              datos={usuarios}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
              tabla="users"
            />
          </div>
        );
      case 'printer':
        return (
          <div>
            <h3 className="mt-4">Registro de Impresoras</h3>
            <div className="d-flex justify-content-start mb-2">
              <button type="button" className="btn-morado" onClick={handleShowPrinterModal}>
                Agregar
              </button>
            </div>
            <TablaDatos
              columnas={columnasTablas.impresoras}
              datos={printers}
              onDelete={handleDeleteClick}
              onEdit={(_id, tabla) => {
                if (tabla === 'impresoras') handleEditPrinter(_id);
              }}
              tabla="impresoras"
            />
          </div>
        );
      case 'consumibles':
        return (
          <div>
            <h3 className="mt-4">Registro de Consumible</h3>
            <div className="d-flex justify-content-start mb-2">
              <button type="button" className="btn-morado" onClick={handleShowConsumableModal}>
                Agregar
              </button>
            </div>
            <TablaDatos
              columnas={columnasTablas.consumibles}
              datos={consumables}
              onDelete={handleDeleteClick}
              onEdit={(_id, tabla) => {
                if (tabla === 'utilizables') handleEditConsumable(_id);
              }}
              tabla="utilizables"
            />
          </div>
        );
      case 'quotes':
        console.log('Renderizando cotizaciones:', quotes); // Confirmar los datos que llegan al select
        return (
          <div>
            <h3 className="mt-4">Cotizaciones</h3>
            <div className="d-flex justify-content-start mb-2">
              <button type="button" className="btn-morado" onClick={handleShowQuoteModal}>
                Agregar
              </button>
            </div>
            <TablaDatos
              columnas={columnasTablas.cotizaciones}
              datos={quotes}
              onDelete={handleDeleteClick}
              onEdit={(_id, tabla) => {
                if (tabla === 'cotizaciones') handleEditQuote(_id);
              }}
              tabla="cotizaciones"
            />
          </div>
        );
      case 'calculator':
        return (
          <div>
            <h3 className="mt-4">Calculadora</h3>
            <div className="d-flex justify-content-start mb-2">
              <button type="button" className="btn-morado" onClick={handleShowCalculadoraConfigModal}>
                Agregar
              </button>
            </div>
            <TablaDatos
              columnas={columnasTablas.calculadoras}
              datos={calculatorConfigs}
              onDelete={handleDeleteClick}
              onEdit={(_id, tabla) => {
                if (tabla === 'calculadoras') handleEditCalculadoraConfig(_id);
              }}
              tabla="calculadoras"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Columna derecha: contenido principal */}
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Impresoras3D</h2>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                // Eliminar la cookie del token al cerrar sesión
                document.cookie = 'token=; path=/; max-age=0;';
                navigate('/login');
              }}
            >
              Salir
            </button>
          </div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                id="personal-tab"
                data-bs-toggle="tab"
                href="#personal"
                role="tab"
                aria-controls="personal"
                aria-selected={activeTab === 'personal'}
                onClick={() => {
                  setActiveTab('personal');
                  fetchUsuarios(); // Siempre consulta al pulsar la pestaña
                }}
              >
                Personal Participante
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'printer' ? 'active' : ''}`}
                id="printer-tab"
                data-bs-toggle="tab"
                href="#printer"
                role="tab"
                aria-controls="printer"
                aria-selected={activeTab === 'printer'}
                onClick={() => setActiveTab('printer')}
              >
                Impresoras
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'consumibles' ? 'active' : ''}`}
                id="consumibles-tab"
                data-bs-toggle="tab"
                href="#consumibles"
                role="tab"
                aria-controls="consumibles"
                aria-selected={activeTab === 'consumibles'}
                onClick={() => setActiveTab('consumibles')}
              >
                Consumibles
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'quotes' ? 'active' : ''}`}
                id="quotes-tab"
                data-bs-toggle="tab"
                href="#quotes"
                role="tab"
                aria-controls="quotes"
                aria-selected={activeTab === 'quotes'}
                onClick={() => handleTabChange('quotes')}
              >
                Cotizaciones
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'calculator' ? 'active' : ''}`}
                id="calculator-tab"
                data-bs-toggle="tab"
                href="#calculator"
                role="tab"
                aria-controls="calculator"
                aria-selected={activeTab === 'calculator'}
                onClick={() => handleTabChange('calculator')}
              >
                Calculadora
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            {renderContent()}
          </div>
        </div>
      </div>
      {/* Modales */}
      {showPrinterDetails && (
        <PrinterDetails
          showModal={showPrinterDetails}
          handleClose={handleClosePrinterDetails}
          selectedPrinterId={selectedPrinterId} // Pasar el ID seleccionado al modal
        />
      )}
      {showConsumableDetails && (
        <ConsumableDetails
          showModal={showConsumableDetails}
          handleClose={handleCloseConsumableDetails}
          selectedConsumableId={selectedConsumableId} // Pasar el ID seleccionado al modal
        />
      )}
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
      <PrinterModal
        showModal={showPrinterModal}
        handleClose={() => setShowPrinterModal(false)}
        mode={printerModalMode}
        printerData={printerEditData}
        onSaved={fetchPrinters}
      />
      <ConsumableModal
        showModal={showConsumableModal}
        handleClose={() => setShowConsumableModal(false)}
        mode={consumableModalMode}
        consumableData={consumableEditData}
        onSaved={fetchConsumables}
      />
      <QuoteModal
        showModal={showQuoteModal}
        handleClose={() => setShowQuoteModal(false)}
        mode={quoteModalMode}
        quoteData={quoteEditData}
        onSaved={fetchQuotes}
      />
      <CalculadoraConfigModal
        showModal={showCalculadoraConfigModal}
        handleClose={() => setShowCalculadoraConfigModal(false)}
        mode={calculadoraConfigModalMode}
        configData={calculadoraConfigEditData}
        onSaved={fetchCalculatorConfigs}
      />
      <UserModal
        showModal={showUserModal}
        handleClose={() => setShowUserModal(false)}
        userId={selectedUserId}
        onUserUpdated={fetchUsuarios}
      />
      <Boorado
        show={showBoorado}
        onAccept={handleAcceptDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Home;
