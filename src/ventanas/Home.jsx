import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrinterDetails from './PrinterDetails';
import ConsumableDetails from './consumables-details';
import QuoteRequest from './QuoteRequest';
import QuoteView from './QuoteView';
import CalculadoraModal from './CalculadoraModal';
import TablaDatos from '../componentes/TablaDatos';
import Boorado from '../componentes/Boorado';
import UserModal from '../componentes/UserModal';
import PrinterModal from '../componentes/PrinterModal';
import ConsumableModal from '../componentes/ConsumableModal';
import QuoteModal from '../componentes/QuoteModal';
import CalculadoraConfigModal from '../componentes/CalculadoraConfigModal';
import PuestoModal from '../componentes/PuestoModal';
import VentaViewModal from '../componentes/VentaViewModal';
import useHomeLogic from '../componentes/useHomeLogic';
import Titulo from '../componentes/Titulo';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const logic = useHomeLogic(navigate);

  const {
    activeTab, setActiveTab, permisos, isTabDisabled,
    showPrinterDetails, handleClosePrinterDetails, selectedPrinterId,
    showConsumableDetails, handleCloseConsumableDetails, selectedConsumableId,
    showQuoteRequest, handleCloseQuoteRequest, selectedQuoteDetails,
    showCalculadoraAdd, handleCloseCalculadoraAdd,
    showCalculadoraEdit, handleCloseCalculadoraEdit, selectedCalculatorDetails,
    showPrinterModal, setShowPrinterModal, printerModalMode, printerEditData, fetchPrinters,
    showConsumableModal, setShowConsumableModal, consumableModalMode, consumableEditData, fetchConsumables,
    showQuoteModal, setShowQuoteModal, quoteModalMode, quoteEditData, fetchQuotes,
    showCalculadoraConfigModal, setShowCalculadoraConfigModal, calculadoraConfigModalMode, calculadoraConfigEditData, fetchCalculatorConfigs,
    showUserModal, setShowUserModal, selectedUserId, fetchUsuarios, puestos,
    showPuestoModal, setShowPuestoModal, puestoModalMode, puestoEditData, fetchPuestos,
    showBoorado, handleAcceptDelete, handleCancelDelete,
    showVentaView, ventaViewData, setShowVentaView,
    usuarios, handleDeleteClick, handleEditClick,
    handleShowPuestoModal, handleEditPuesto,
    printers, handleShowPrinterModal, handleEditPrinter,
    consumables, handleShowConsumableModal, handleEditConsumable,
    quotes, handleShowQuoteModal, handleEditQuote,
    ventas, handleViewVenta,
    calculatorConfigsWithNames, handleShowCalculadoraConfigModal, handleEditCalculadoraConfig,
    columnasTablas, columnasPuestos, columnasVentas, columnasUsuarios,
    renderLinkCell, renderCalculadoraCell, renderUsuarioCell,
    currentUser,
  } = logic;

  const renderContent = () => {
    if (!permisos[activeTab]) {
      return (
        <div className="alert alert-danger mt-4">
          Acceso denegado: No tienes permisos para ver esta sección.
        </div>
      );
    }
    switch (activeTab) {
      case 'personal':
        return (
          <div>
            <h3 className="mt-4">Personal Participante</h3>
            <TablaDatos
              columnas={columnasUsuarios}
              datos={usuarios}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
              tabla="users"
              renderCell={(col, fila) => renderUsuarioCell(col, fila, puestos)}
            />
          </div>
        );
      case 'puestos':
        return (
          <div>
            <h3 className="mt-4">Puestos</h3>
            <div className="d-flex justify-content-start mb-2">
              <button type="button" className="btn-morado" onClick={handleShowPuestoModal}>
                Agregar
              </button>
            </div>
            <TablaDatos
              columnas={columnasPuestos}
              datos={puestos}
              onDelete={handleDeleteClick}
              onEdit={(_id, tabla) => {
                if (tabla === 'puestos') handleEditPuesto(_id);
              }}
              tabla="puestos"
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
              renderCell={renderLinkCell}
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
              datos={calculatorConfigsWithNames}
              onDelete={handleDeleteClick}
              onEdit={(_id, tabla) => {
                if (tabla === 'calculadoras') handleEditCalculadoraConfig(_id);
              }}
              tabla="calculadoras"
              renderCell={renderCalculadoraCell}
            />
          </div>
        );
      case 'ventas':
        return (
          <div>
            <h3 className="mt-4">Ventas</h3>
            <TablaDatos
              columnas={columnasVentas}
              datos={ventas}
              tabla="ventas"
              onEdit={handleViewVenta}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-overlay">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <Titulo
              onSalir={() => {
                document.cookie = 'token=; path=/; max-age=0;';
                navigate('/login');
              }}
              usuario={currentUser?.name}
            />
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {[
                { key: 'personal', label: 'Personal Participante' },
                { key: 'puestos', label: 'Puestos' },
                { key: 'printer', label: 'Impresoras' },
                { key: 'consumibles', label: 'Consumibles' },
                { key: 'quotes', label: 'Cotizaciones' },
                { key: 'calculator', label: 'Configuracion' },
                { key: 'ventas', label: 'Ventas' }
              ].map(tab => (
                <li className="nav-item" key={tab.key}>
                  <a
                    className={`nav-link ${activeTab === tab.key ? 'active' : ''} ${isTabDisabled(tab.key) ? 'disabled-tab' : ''}`}
                    id={`${tab.key}-tab`}
                    data-bs-toggle="tab"
                    href={`#${tab.key}`}
                    role="tab"
                    aria-controls={tab.key}
                    aria-selected={activeTab === tab.key}
                    tabIndex={isTabDisabled(tab.key) ? -1 : 0}
                    aria-disabled={isTabDisabled(tab.key)}
                    onClick={e => {
                      if (isTabDisabled(tab.key)) {
                        e.preventDefault();
                        return;
                      }
                      setActiveTab(tab.key);
                    }}
                    style={isTabDisabled(tab.key) ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-content" id="myTabContent">
              {renderContent()}
            </div>
          </div>
        </div>
        {showPrinterDetails && (
          <PrinterDetails
            showModal={showPrinterDetails}
            handleClose={handleClosePrinterDetails}
            selectedPrinterId={selectedPrinterId}
          />
        )}
        {showConsumableDetails && (
          <ConsumableDetails
            showModal={showConsumableDetails}
            handleClose={handleCloseConsumableDetails}
            selectedConsumableId={selectedConsumableId}
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
            quoteData={selectedQuoteDetails}
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
            calculatorData={selectedCalculatorDetails}
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
          puestos={puestos}
        />
        <PuestoModal
          showModal={showPuestoModal}
          handleClose={() => setShowPuestoModal(false)}
          mode={puestoModalMode}
          puestoData={puestoEditData}
          onSaved={fetchPuestos}
        />
        <Boorado
          show={showBoorado}
          onAccept={handleAcceptDelete}
          onCancel={handleCancelDelete}
        />
        {showVentaView && ventaViewData && (
          <VentaViewModal
            show={showVentaView}
            onHide={() => setShowVentaView(false)}
            venta={ventaViewData}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
