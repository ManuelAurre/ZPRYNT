import React, { useEffect, useState } from 'react';
import TablaDatos from '../componentes/TablaDatos';
import Boorado from '../componentes/Boorado';
// ...otros imports...

function Usuarios() {
  const [datos, setDatos] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setDatos(data);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  return (
    <>
      <TablaDatos
        columnas={columnas}
        datos={datos}
        onDeleteConfirm={item => setItemToDelete(item)}
        onEdit={handleEdit}
        tabla="users"
      />
      <Boorado
        show={!!itemToDelete}
        onDeleted={() => {
          setItemToDelete(null);
          cargarDatos();
        }}
        onCancel={handleCancelDelete}
        item={itemToDelete}
      />
      {/* Debug visual */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, background: '#fff', zIndex: 9999, fontSize: 12 }}>
        itemToDelete: {JSON.stringify(itemToDelete)}
      </div>
    </>
  );
}

export default Usuarios;
