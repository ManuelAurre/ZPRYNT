import { useState, useEffect, useMemo } from 'react';
import {
  columnasTablas,
  columnasPuestos,
  columnasVentas,
  columnasUsuarios,
  getUtilizableNombre,
  getImpresoraNombre,
  getPuestoNombre,
  renderLinkCell,
  renderCalculadoraCell,
  renderUsuarioCell,
} from './home-helpers';

export default function useHomeLogic(navigate) {
  // Estados
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [showConsumableDetails, setShowConsumableDetails] = useState(false);
  const [showQuoteRequest, setShowQuoteRequest] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const [printerModalMode, setPrinterModalMode] = useState('add');
  const [printerEditData, setPrinterEditData] = useState(null);
  const [showConsumableModal, setShowConsumableModal] = useState(false);
  const [consumableModalMode, setConsumableModalMode] = useState('add');
  const [consumableEditData, setConsumableEditData] = useState(null);
  const [activeTab, setActiveTab] = useState('printer');
  const [showCalculadoraAdd, setShowCalculadoraAdd] = useState(false);
  const [showCalculadoraEdit, setShowCalculadoraEdit] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [consumables, setConsumables] = useState([]);
  const [calculatorConfigs, setCalculatorConfigs] = useState([]);
  const [selectedPrinterId, setSelectedPrinterId] = useState(null);
  const [selectedPrinterDetails, setSelectedPrinterDetails] = useState(null);
  const [selectedConsumableId, setSelectedConsumableId] = useState(null);
  const [selectedCalculatorId, setSelectedCalculatorId] = useState(null);
  const [selectedCalculatorDetails, setSelectedCalculatorDetails] = useState(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [selectedQuoteDetails, setSelectedQuoteDetails] = useState(null);
  const [tablaSeleccionada, setTablaSeleccionada] = useState('impresoras');
  const [usuarios, setUsuarios] = useState([]);
  const [showBoorado, setShowBoorado] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ id: null, tabla: null });
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteModalMode, setQuoteModalMode] = useState('add');
  const [quoteEditData, setQuoteEditData] = useState(null);
  const [showCalculadoraConfigModal, setShowCalculadoraConfigModal] = useState(false);
  const [calculadoraConfigModalMode, setCalculadoraConfigModalMode] = useState('add');
  const [calculadoraConfigEditData, setCalculadoraConfigEditData] = useState(null);
  const [puestos, setPuestos] = useState([]);
  const [showPuestoModal, setShowPuestoModal] = useState(false);
  const [puestoModalMode, setPuestoModalMode] = useState('add');
  const [puestoEditData, setPuestoEditData] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [showVentaView, setShowVentaView] = useState(false);
  const [ventaViewData, setVentaViewData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPuesto, setCurrentPuesto] = useState(null);

  // Helpers
  const getTokenFromCookie = () => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
  };

  // Cargar puestos primero
  useEffect(() => {
    fetch('/api/puestos')
      .then(res => res.json())
      .then(data => setPuestos(data))
      .catch(() => setPuestos([]));
  }, []);

  // Cargar usuario solo cuando puestos ya están listos
  useEffect(() => {
    if (puestos.length === 0) return;
    const token = getTokenFromCookie();
    if (!token) {
      navigate('/login');
    } else {
      fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          setCurrentUser(data);
          setCurrentPuesto(data?.tipo || null);
        })
        .catch(() => {
          setCurrentUser(null);
          setCurrentPuesto(null);
        });
    }
  }, [puestos, navigate]);

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

  // Lógica de permisos por id de puesto
  const permisosPorPuestoId = (puestoId) => {
    if (String(puestoId) === '4') {
      return {
        personal: true, puestos: true, printer: true, consumibles: true, quotes: true, calculator: true, ventas: true
      };
    }
    if (String(puestoId) === '3') {
      return {
        personal: false, puestos: false, printer: false, consumibles: false, quotes: false, calculator: false, ventas: false
      };
    }
    if (['1', '2', '5'].includes(String(puestoId))) {
      return {
        personal: false, puestos: false, printer: false, consumibles: false, quotes: true, calculator: false, ventas: true
      };
    }
    return {
      personal: false, puestos: false, printer: false, consumibles: false, quotes: false, calculator: false, ventas: true
    };
  };

  const permisos = useMemo(() => {
    if (!currentUser || !currentPuesto) return {};
    return permisosPorPuestoId(currentPuesto);
  }, [currentUser, currentPuesto]);

  useEffect(() => {
    fetchPuestos();
    // eslint-disable-next-line
  }, []);

  // Fetchers
  const fetchQuotes = async () => {
    try {
      const response = await fetchWithAuth(`/api/quotes`);
      if (!response.ok) throw new Error('Error al obtener cotizaciones');
      const data = await response.json();
      const mappedData = data.map(q => ({
        id: q.id,
        nombre: q.nombre ?? q.name ?? '',
        link: q.link ?? q.url ?? '',
        presupuesto: q.presupuesto ?? '',
        estatus: q.estatus ?? '',
      }));
      setQuotes(mappedData);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar las cotizaciones:', error);
    }
  };

  const fetchPrinters = async () => {
    try {
      const response = await fetchWithAuth(`/api/impresoras`);
      if (!response.ok) throw new Error('Error al obtener las impresoras');
      const data = await response.json();
      setPrinters(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar las impresoras:', error);
    }
  };

  const fetchConsumables = async () => {
    try {
      const response = await fetchWithAuth(`/api/utilizables`);
      if (!response.ok) throw new Error('Error al obtener los consumibles');
      const data = await response.json();
      setConsumables(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar los consumibles:', error);
    }
  };

  const fetchCalculatorConfigs = async () => {
    try {
      const response = await fetchWithAuth(`/api/calculadoras`);
      if (!response.ok) throw new Error('Error al obtener las configuraciones de calculadora');
      const data = await response.json();
      setCalculatorConfigs(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar las configuraciones de calculadora:', error);
    }
  };

  const fetchPrinterDetails = async (printerId) => {
    try {
      const response = await fetchWithAuth(`/api/impresoras/${printerId}`);
      if (!response.ok) throw new Error('Error al obtener detalles de impresora');
      const data = await response.json();
      setSelectedPrinterDetails(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar los detalles de la impresora:', error);
    }
  };

  const fetchConsumableDetails = async (consumableId) => {
    try {
      const response = await fetchWithAuth(`/api/utilizables/${consumableId}`);
      if (!response.ok) throw new Error('Error al obtener detalles de consumible');
      const data = await response.json();
      setSelectedConsumableId(data);
      setShowConsumableDetails(true);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar los detalles del consumible:', error);
    }
  };

  const fetchCalculatorDetails = async (calculatorId) => {
    try {
      const response = await fetchWithAuth(`/api/calculadoras/${calculatorId}`);
      if (!response.ok) throw new Error('Error al obtener detalles de calculadora');
      const data = await response.json();
      setSelectedCalculatorDetails(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar los detalles de la configuración:', error);
    }
  };

  const fetchQuoteDetails = async (quoteId) => {
    try {
      const response = await fetchWithAuth(`/api/cotizaciones/${quoteId}`);
      if (!response.ok) throw new Error('Error al obtener detalles de cotización');
      const data = await response.json();
      setSelectedQuoteDetails(data);
      setShowQuoteRequest(true);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar los detalles de la cotización:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetchWithAuth('/api/users');
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar usuarios:', error);
    }
  };

  const fetchPuestos = async () => {
    try {
      const response = await fetchWithAuth('/api/puestos');
      if (!response.ok) throw new Error('Error al obtener los puestos');
      const data = await response.json();
      setPuestos(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar los puestos:', error);
    }
  };

  const fetchVentas = async () => {
    try {
      const response = await fetchWithAuth('/api/ventas');
      if (!response.ok) throw new Error('Error al obtener las ventas');
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al cargar las ventas:', error);
    }
  };

  // Handlers
  const handleViewVenta = async (id) => {
    const res = await fetch(`/api/ventas`);
    const ventas = await res.json();
    const venta = ventas.find(v => v.id === id);
    setVentaViewData(venta);
    setShowVentaView(true);
  };

  useEffect(() => {
    if (activeTab === 'printer') {
      fetchPrinters();
    } else if (activeTab === 'consumibles') {
      fetchConsumables();
    } else if (activeTab === 'calculator') {
      fetchCalculatorConfigs();
    } else if (activeTab === 'puestos') {
      fetchPuestos();
    } else if (activeTab === 'ventas') {
      fetchVentas();
    }
    // eslint-disable-next-line
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'quotes') {
      fetchQuotes();
    }
  };

  const handleShowPrinterDetails = () => {
    if (selectedPrinterId) {
      setShowPrinterDetails(true);
    } else {
      alert('Por favor selecciona una impresora.');
    }
  };

  const handleClosePrinterDetails = () => setShowPrinterDetails(false);

  const handlePrinterSelection = (event) => {
    setSelectedPrinterId(event.target.value);
  };

  const handleShowConsumableDetails = () => {
    if (selectedConsumableId) {
      setShowConsumableDetails(true);
    } else {
      alert('Por favor selecciona un consumible.');
    }
  };

  const handleCloseConsumableDetails = () => setShowConsumableDetails(false);

  const handleConsumableSelection = (event) => {
    setSelectedConsumableId(event.target.value);
  };

  const handleShowQuoteRequest = () => {
    setSelectedQuoteDetails(null);
    setShowQuoteRequest(true);
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

  const handleCloseConsumableModal = () => setShowConsumableModal(false);

  const handleShowCalculadoraAdd = () => setShowCalculadoraAdd(true);
  const handleCloseCalculadoraAdd = () => setShowCalculadoraAdd(false);

  const handleShowCalculadoraEdit = () => {
    if (selectedCalculatorId) {
      fetchCalculatorDetails(selectedCalculatorId);
      setShowCalculadoraEdit(true);
    } else {
      alert('Por favor selecciona una configuración.');
    }
  };

  const handleCloseCalculadoraEdit = () => setShowCalculadoraEdit(false);

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
    setShowBoorado(false);
    setDeleteInfo({ id: null, tabla: null });
  };

  const handleCancelDelete = () => {
    setShowBoorado(false);
    setDeleteInfo({ id: null, tabla: null });
  };

  const handleShowPuestoModal = () => {
    setPuestoModalMode('add');
    setPuestoEditData(null);
    setShowPuestoModal(true);
  };

  const handleEditPuesto = async (id) => {
    const res = await fetch(`/api/puestos/${id}`);
    const data = await res.json();
    setPuestoModalMode('edit');
    setPuestoEditData(data);
    setShowPuestoModal(true);
  };

  // Mapea calculatorConfigs para mostrar el nombre del consumible en la columna 'utilizables'
  const calculatorConfigsWithNames = calculatorConfigs.map(cfg => ({
    ...cfg,
    utilizables: getUtilizableNombre(cfg.utilizablesId, consumables),
    impresora: getImpresoraNombre(cfg.impresoraId, printers),
  }));

  // Helper para saber si una pestaña está deshabilitada
  const isTabDisabled = (tab) => {
    switch (tab) {
      case 'personal': return !permisos.personal;
      case 'puestos': return !permisos.puestos;
      case 'printer': return !permisos.printer;
      case 'consumibles': return !permisos.consumibles;
      case 'quotes': return !permisos.quotes;
      case 'calculator': return !permisos.calculator;
      case 'ventas': return !permisos.ventas;
      default: return false;
    }
  };

  // Devuelve todo lo necesario para el renderizado
  return {
    // Estados
    showPrinterDetails, setShowPrinterDetails,
    showConsumableDetails, setShowConsumableDetails,
    showQuoteRequest, setShowQuoteRequest,
    showPrinterModal, setShowPrinterModal,
    printerModalMode, setPrinterModalMode,
    printerEditData, setPrinterEditData,
    showConsumableModal, setShowConsumableModal,
    consumableModalMode, setConsumableModalMode,
    consumableEditData, setConsumableEditData,
    activeTab, setActiveTab,
    showCalculadoraAdd, setShowCalculadoraAdd,
    showCalculadoraEdit, setShowCalculadoraEdit,
    selectedQuote, setSelectedQuote,
    quotes, setQuotes,
    printers, setPrinters,
    consumables, setConsumables,
    calculatorConfigs, setCalculatorConfigs,
    selectedPrinterId, setSelectedPrinterId,
    selectedPrinterDetails, setSelectedPrinterDetails,
    selectedConsumableId, setSelectedConsumableId,
    selectedCalculatorId, setSelectedCalculatorId,
    selectedCalculatorDetails, setSelectedCalculatorDetails,
    selectedQuoteId, setSelectedQuoteId,
    selectedQuoteDetails, setSelectedQuoteDetails,
    tablaSeleccionada, setTablaSeleccionada,
    usuarios, setUsuarios,
    showBoorado, setShowBoorado,
    deleteInfo, setDeleteInfo,
    showUserModal, setShowUserModal,
    selectedUserId, setSelectedUserId,
    showQuoteModal, setShowQuoteModal,
    quoteModalMode, setQuoteModalMode,
    quoteEditData, setQuoteEditData,
    showCalculadoraConfigModal, setShowCalculadoraConfigModal,
    calculadoraConfigModalMode, setCalculadoraConfigModalMode,
    calculadoraConfigEditData, setCalculadoraConfigEditData,
    puestos, setPuestos,
    showPuestoModal, setShowPuestoModal,
    puestoModalMode, setPuestoModalMode,
    puestoEditData, setPuestoEditData,
    ventas, setVentas,
    showVentaView, setShowVentaView,
    ventaViewData, setVentaViewData,
    currentUser, setCurrentUser,
    currentPuesto, setCurrentPuesto,
    // Helpers y lógica
    fetchQuotes,
    fetchPrinters,
    fetchConsumables,
    fetchCalculatorConfigs,
    fetchPrinterDetails,
    fetchConsumableDetails,
    fetchCalculatorDetails,
    fetchQuoteDetails,
    fetchUsuarios,
    fetchPuestos,
    fetchVentas,
    handleViewVenta,
    handleTabChange,
    handleShowPrinterDetails,
    handleClosePrinterDetails,
    handlePrinterSelection,
    handleShowConsumableDetails,
    handleCloseConsumableDetails,
    handleConsumableSelection,
    handleShowQuoteRequest,
    handleCloseQuoteRequest,
    handleShowPrinterModal,
    handleEditPrinter,
    handleShowConsumableModal,
    handleEditConsumable,
    handleCloseConsumableModal,
    handleShowCalculadoraAdd,
    handleCloseCalculadoraAdd,
    handleShowCalculadoraEdit,
    handleCloseCalculadoraEdit,
    handleShowCalculadoraConfigModal,
    handleEditCalculadoraConfig,
    handleQuoteSelection,
    handleShowQuoteModal,
    handleEditQuote,
    handleDeleteClick,
    handleEditClick,
    handleAcceptDelete,
    handleCancelDelete,
    handleShowPuestoModal,
    handleEditPuesto,
    calculatorConfigsWithNames,
    isTabDisabled,
    permisos,
    columnasTablas,
    columnasPuestos,
    columnasVentas,
    columnasUsuarios,
    getUtilizableNombre,
    getImpresoraNombre,
    getPuestoNombre,
    renderLinkCell,
    renderCalculadoraCell,
    renderUsuarioCell,
  };
}
