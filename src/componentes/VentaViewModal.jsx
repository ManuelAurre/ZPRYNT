import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const VentaViewModal = ({ show, onHide, venta }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) setVisible(true);
    else if (visible) setTimeout(() => setVisible(false), 250);
  }, [show]);

  if (!show && !visible) return null;
  if (!venta) return null;
  return (
    <Modal show={show || visible} onHide={onHide} centered dialogClassName={show ? 'fade-in' : 'fade-out'}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center', letterSpacing: 2 }}>
          TICKET DE VENTA
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{
          background: '#fff',
          borderRadius: 8,
          padding: 20,
          maxWidth: 350,
          margin: '0 auto',
          fontFamily: 'monospace',
          boxShadow: '0 2px 8px #e0e0e0'
        }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>
            #{venta.id}
          </div>
          <hr style={{ margin: '8px 0' }} />
          <div><strong>Nombre:</strong> <span style={{ float: 'right' }}>{venta.nombre}</span></div>
          <hr style={{ margin: '8px 0' }} />
          <div><strong>Costo Diseño:</strong> <span style={{ float: 'right' }}>${venta.costoDiseno}</span></div>
          <div><strong>Costo Marketing:</strong> <span style={{ float: 'right' }}>${venta.costoMarketingEntrega}</span></div>
          <div><strong>Costo Postprocesado:</strong> <span style={{ float: 'right' }}>${venta.costoPostprocesado}</span></div>
          <div><strong>Costo Consumible:</strong> <span style={{ float: 'right' }}>${venta.costoConsumible}</span></div>
          <div><strong>Costo Impresora:</strong> <span style={{ float: 'right' }}>${venta.costoImpresora}</span></div>
          <hr style={{ margin: '8px 0' }} />
          <div style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', letterSpacing: 1 }}>
            TOTAL: ${venta.costoTotal}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VentaViewModal;
