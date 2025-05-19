import React, { useState, useEffect } from 'react';
import '../styles/componentes.css';

const radioValueToString = (val) => (parseInt(val, 10) === 2 ? 'Si' : 'No');
const stringToRadioValue = (val) => (val === 'Si' ? 2 : 1);

const QuoteModal = ({ showModal, handleClose, mode = 'add', quoteData, onSaved }) => {
  const [form, setForm] = useState({
    nombre: '',
    link: '',
    presupuesto: '',
    tamano: '',
    DescripcionCliente: '',
    tipo: '',
    estatus: 'Pendiente',
    diseno: 'No',
    marketingEntrega: 'No',
    postprocesado: 'No',
    idConfiguracionCalculadora: '',
    TiempoOperandoHora: '',
    usoConsumible: '', // <--- Agregado aquí
  });

  const [calculadoras, setCalculadoras] = useState([]);

  useEffect(() => {
    // Cargar opciones de calculadora desde la tabla de calculadoras
    fetch('/api/calculadoras')
      .then(res => res.json())
      .then(data => setCalculadoras(data || []));
  }, []);

  useEffect(() => {
    if (mode === 'edit' && quoteData) {
      setForm({
        nombre: quoteData.nombre || '',
        link: quoteData.link || '',
        presupuesto: quoteData.presupuesto ? String(quoteData.presupuesto) : '',
        tamano: quoteData.tamano || '',
        DescripcionCliente: quoteData.DescripcionCliente || '',
        tipo: quoteData.tipo || '',
        estatus: quoteData.estatus || 'Pendiente',
        diseno: radioValueToString(quoteData.diseno),
        marketingEntrega: radioValueToString(quoteData.marketingEntrega),
        postprocesado: radioValueToString(quoteData.postprocesado),
        idConfiguracionCalculadora: quoteData.idConfiguracionCalculadora ? String(quoteData.idConfiguracionCalculadora) : '',
        TiempoOperandoHora: quoteData.TiempoOperandoHora !== undefined ? String(quoteData.TiempoOperandoHora) : '',
        usoConsumible: quoteData.usoConsumible !== undefined ? String(quoteData.usoConsumible) : '', // <--- Agregado aquí
      });
    } else if (mode === 'add') {
      setForm({
        nombre: '',
        link: '',
        presupuesto: '',
        tamano: '',
        DescripcionCliente: '',
        tipo: '',
        estatus: 'Pendiente',
        diseno: 'No',
        marketingEntrega: 'No',
        postprocesado: 'No',
        idConfiguracionCalculadora: '',
        TiempoOperandoHora: '',
        usoConsumible: '', // <--- Agregado aquí
      });
    }
  }, [mode, quoteData, showModal]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRadioChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Convertir los radios a 1/2 antes de enviar
    const toSend = {
      ...form,
      diseno: stringToRadioValue(form.diseno),
      marketingEntrega: stringToRadioValue(form.marketingEntrega),
      postprocesado: stringToRadioValue(form.postprocesado),
      TiempoOperandoHora: form.TiempoOperandoHora ? parseInt(form.TiempoOperandoHora, 10) : null,
      usoConsumible: form.usoConsumible ? parseInt(form.usoConsumible, 10) : null, // <--- Agregado aquí
    };
    if (mode === 'add') {
      await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSend)
      });
    } else if (mode === 'edit' && quoteData?.id) {
      await fetch(`/api/cotizaciones/${quoteData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSend)
      });
    }
    if (onSaved) onSaved();
    handleClose();
  };

  // Nueva función para calcular y guardar la venta
  const handleCalcularCosto = async () => {
    try {
      // 1. Obtener la configuración seleccionada
      const configId = form.idConfiguracionCalculadora;
      if (!configId) {
        alert('Selecciona una configuración');
        return;
      }
      const configRes = await fetch(`/api/calculadoras/${configId}`);
      const config = await configRes.json();

      // 2. Obtener la impresora
      const impresoraRes = await fetch(`/api/impresoras/${config.impresoraId}`);
      const impresora = await impresoraRes.json();

      // 3. Obtener los usuarios y puestos
      const usuariosRes = await fetch('/api/users');
      const usuarios = await usuariosRes.json();
      const puestosRes = await fetch('/api/puestos');
      const puestos = await puestosRes.json();

      // 4. Calcular costos de responsables
      const getCuotaPorHora = (userId) => {
        const user = usuarios.find(u => String(u.id) === String(userId));
        if (!user) return 0;
        const puesto = puestos.find(p => String(p.id) === String(user.tipo));
        return puesto ? parseFloat(puesto.cuotaPorHora) : 0;
      };

      // Diseño
      let costoDiseno = 0;
      if (form.diseno === 'Si') {
        costoDiseno = getCuotaPorHora(config.costoDiseno);
      }
      // Post Procesado
      let costoPostprocesado = 0;
      if (form.postprocesado === 'Si') {
        costoPostprocesado = getCuotaPorHora(config.costoPostprocesado);
      }
      // Marketing/Entrega
      let costoMarketingEntrega = 0;
      if (form.marketingEntrega === 'Si') {
        costoMarketingEntrega = getCuotaPorHora(config.costoMarketingEntrega);
      }

      // 5. Costo impresora
      let costoImpresora = 0;
      if (impresora && impresora.costoPorHora && form.TiempoOperandoHora) {
        costoImpresora = parseFloat(impresora.costoPorHora) * parseInt(form.TiempoOperandoHora, 10);
      }

      // 6. Costo consumible
      let costoConsumible = 0;
      if (config.utilizablesId && form.usoConsumible) {
        const consumibleRes = await fetch(`/api/utilizables/${config.utilizablesId}`);
        const consumible = await consumibleRes.json();
        if (consumible && consumible.costoDeVenta) {
          costoConsumible = parseFloat(consumible.costoDeVenta) * parseInt(form.usoConsumible, 10);
        }
      }

      // 7. Costo total (ahora incluye costoConsumible)
      const costoTotal = costoDiseno + costoPostprocesado + costoMarketingEntrega + costoImpresora + costoConsumible;

      // 8. Nombre de la venta: nombre cotización + (Calculadora id)
      const nombreVenta = `${form.nombre} (Calculadora ${configId})`;

      // 9. Guardar en ventas
      await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreVenta,
          costoDiseno,
          costoMarketingEntrega,
          costoPostprocesado,
          costoImpresora,
          costoConsumible,
          costoTotal,
          usoConsumible: form.usoConsumible ? parseInt(form.usoConsumible, 10) : 0,
        }),
      });

      alert('Venta registrada correctamente');
    } catch (err) {
      alert('Error al calcular y guardar la venta');
      console.error(err);
    }
  };

  if (!showModal) return null;

  return (
    <div className="boorado-modal-backdrop">
      <div className="boorado-modal">
        <div className="boorado-modal-header">
          <h4 className="boorado-modal-header-left" style={{ margin: 0 }}>
            {mode === 'add' ? 'Agregar Cotización' : 'Editar Cotización'}
          </h4>
          <button className="boorado-modal-close" onClick={handleClose} aria-label="Cerrar">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="boorado-modal-content">
          <div className="form-group">
            <label style={{ textAlign: 'left', display: 'block' }}>Nombre: </label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Link: </label>
            <input
              className="form-control"
              name="link"
              value={form.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Tamaño: </label>
              <input
                className="form-control"
                name="tamano"
                value={form.tamano}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Presupuesto: </label>
              <input
                className="form-control"
                name="presupuesto"
                value={form.presupuesto}
                onChange={handleChange}
                type="number"
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Configuración: </label>
              <select
                className="form-control"
                name="idConfiguracionCalculadora"
                value={form.idConfiguracionCalculadora}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona una configuración --</option>
                {calculadoras.map((calc) => (
                  <option key={calc.id} value={calc.id}>
                    Configuración {calc.id}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Filamento: </label>
              <input
                className="form-control"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Estatus: </label>
              <select
                className="form-control"
                name="estatus"
                value={form.estatus}
                onChange={handleChange}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Terminado">Terminado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Diseño: </label>
              <div>
                <label style={{ marginRight: 10 }}>
                  <input
                    type="radio"
                    name="diseno"
                    value="Si"
                    checked={form.diseno === 'Si'}
                    onChange={handleRadioChange}
                  />{' '}
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="diseno"
                    value="No"
                    checked={form.diseno === 'No'}
                    onChange={handleRadioChange}
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Marketing/Entrega: </label>
              <div>
                <label style={{ marginRight: 10 }}>
                  <input
                    type="radio"
                    name="marketingEntrega"
                    value="Si"
                    checked={form.marketingEntrega === 'Si'}
                    onChange={handleRadioChange}
                  />{' '}
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="marketingEntrega"
                    value="No"
                    checked={form.marketingEntrega === 'No'}
                    onChange={handleRadioChange}
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Post Procesado: </label>
              <div>
                <label style={{ marginRight: 10 }}>
                  <input
                    type="radio"
                    name="postprocesado"
                    value="Si"
                    checked={form.postprocesado === 'Si'}
                    onChange={handleRadioChange}
                  />{' '}
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="postprocesado"
                    value="No"
                    checked={form.postprocesado === 'No'}
                    onChange={handleRadioChange}
                  />{' '}
                  No
                </label>
              </div>
            </div>
          </div>
          {/* Campo para tiempo operando por hora y uso de consumible en la misma fila */}
          <div className="form-group mt-2" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Tiempo operando por hora:</label>
              <input
                type="number"
                className="form-control"
                name="TiempoOperandoHora"
                value={form.TiempoOperandoHora || ''}
                onChange={handleChange}
                min={0}
                required
                style={{ width: '200px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ textAlign: 'left', display: 'block' }}>Uso de Consumible:</label>
              <input
                type="number"
                className="form-control"
                name="usoConsumible"
                value={form.usoConsumible || ''}
                onChange={handleChange}
                min={0}
                required
                style={{ width: '200px' }}
              />
            </div>
          </div>
          <div className="form-group mt-2">
            <label style={{ textAlign: 'left', display: 'block' }}>Descripción Cliente: </label>
            <textarea
              className="form-control"
              name="DescripcionCliente"
              value={form.DescripcionCliente}
              onChange={handleChange}
              required
            />
          </div>
          {/* Botones en la misma fila, centrados */}
          <div className="boorado-modal-buttons mt-3 d-flex justify-content-center gap-2">
            {mode === 'edit' && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleCalcularCosto}
                style={{ minWidth: 130 }}
              >
                Calcular Costo
              </button>
            )}
            <button type="submit" className="btn-morado" style={{ minWidth: 100 }}>
              {mode === 'add' ? 'Agregar' : 'Guardar'}
            </button>
            <button type="button" className="btn-gris" onClick={handleClose} style={{ minWidth: 100 }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
