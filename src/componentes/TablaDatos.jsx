import React, { useState } from 'react';
import Boorado from './Boorado';

const TablaDatos = ({ columnas, datos, onDeleteConfirm, onEdit, tabla, renderCell }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    const fila = datos.find(d => d.id === id);
    setItemToDelete({ id, tabla, ...fila });
    setModalOpen(true);
  };

  const handleAccept = (item) => {
    setModalOpen(false);
    setItemToDelete(null);
    if (onDeleteConfirm) onDeleteConfirm(item);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            {columnas.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos && datos.length > 0 ? (
            datos.map((fila, idx) => (
              <tr key={fila.id || idx}>
                {columnas.map(col => (
                  <td key={col.key}>
                    {renderCell ? renderCell(col, fila) : fila[col.key]}
                  </td>
                ))}
                <td>
                  <span
                    style={{ cursor: 'pointer', marginRight: 8 }}
                    title="Editar"
                    onClick={() => onEdit && onEdit(fila.id, tabla)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#d2cf37" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    title="Eliminar"
                    onClick={() => handleDeleteClick(fila.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#d13636" viewBox="0 0 24 24">
                      <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length + 1} className="text-center">
                Sin datos para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Boorado
        show={modalOpen}
        onAccept={handleAccept}
        onCancel={handleCancel}
        item={itemToDelete}
      />
    </div>
  );
};

export default TablaDatos;
