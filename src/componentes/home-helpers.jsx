// Helpers para obtener nombres
export const getUtilizableNombre = (id, consumables) => {
  const u = consumables.find(x => Number(x.id) === Number(id));
  return u ? u.nombre : id;
};

export const getImpresoraNombre = (id, printers) => {
  const i = printers.find(x => x.id === id);
  return i ? i.nombre : id;
};

export const getPuestoNombre = (id, puestos) => {
  if (!puestos || !Array.isArray(puestos)) return id;
  const p = puestos.find(x => String(x.id) === String(id));
  return p ? p.nombre : id;
};

// Columnas para las tablas
export const columnasTablas = {
  impresoras: [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'costoPorHora', label: 'Costo Por Hora' },
    { key: 'dimensiones', label: 'Dimensiones' },
  ],
  consumibles: [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'material', label: 'Material' },
    { key: 'cantidad', label: 'Cantidad Total' },
    { key: 'cantidadActual', label: 'Cantidad Actual' },
    { key: 'costoDeCompra', label: 'Costo de Compra' },
    { key: 'costoDeVenta', label: 'Venta por Gramo' },
  ],
  cotizaciones: [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'link', label: 'Link' },
    { key: 'presupuesto', label: 'Presupuesto' },
    { key: 'estatus', label: 'Estatus' },
  ],
  calculadoras: [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'utilizables', label: 'Consumibles' },
    { key: 'impresora', label: 'Impresora' },
  ],
};

export const columnasPuestos = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' },
];

export const columnasVentas = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'costoTotal', label: 'Costo total' },
];

export const columnasUsuarios = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'tipo', label: 'Tipo' },
];

// Render helpers
export const renderLinkCell = (col, fila) => {
  if (col.key === 'link' && fila.link) {
    return (
      <a href={fila.link} target="_blank" rel="noopener noreferrer">
        {fila.link}
      </a>
    );
  }
  return fila[col.key];
};

export const renderCalculadoraCell = (col, fila) => {
  if (col.key === 'nombre') {
    return `Calculadora ${fila.id}`;
  }
  return fila[col.key];
};

export const renderUsuarioCell = (col, fila, puestos) => {
  if (col.key === 'tipo') {
    return getPuestoNombre(fila.tipo, puestos);
  }
  return fila[col.key];
};
