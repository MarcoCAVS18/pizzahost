// src/components/utils/SizeDataTester.jsx
import React from 'react';
import { useProducts } from '../../hooks/useProducts';

const SizeDataTester = () => {
  const { pizzaSizes, pastaSizes, loading, error } = useProducts();

  if (loading) return <div>Cargando tamaños...</div>;
  if (error) return <div>Error al cargar tamaños: {error}</div>;

  const renderSizeInfo = (sizes, title) => {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        
        {sizes && Object.keys(sizes).length > 0 ? (
          <div>
            <h3 className="font-bold mb-2">Objeto completo (solo debug):</h3>
            <pre className="bg-gray-100 p-2 rounded mb-4 overflow-auto">
              {JSON.stringify(sizes, null, 2)}
            </pre>

            <h3 className="font-bold mb-2">Renderización segura de tamaños:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(sizes).map(([sizeKey, sizeData]) => (
                <div key={sizeKey} className="border p-3 rounded">
                  <p>Clave: {sizeKey}</p>
                  <p>Nombre: {sizeData?.name || 'Sin nombre'}</p>
                  <p>Precio: ${(sizeData?.price || 0).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No hay tamaños disponibles.</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Probador de Datos de Tamaños</h1>
      
      {renderSizeInfo(pizzaSizes, 'Tamaños de Pizza')}
      {renderSizeInfo(pastaSizes, 'Tamaños de Pasta')}
      
      <div className="bg-yellow-100 p-4 rounded">
        <h3 className="font-bold">Notas importantes:</h3>
        <ul className="list-disc pl-5">
          <li>Siempre usa el operador de encadenamiento opcional (?.) para acceder a propiedades anidadas.</li>
          <li>Proporciona valores por defecto cuando accedas a propiedades que podrían no existir.</li>
          <li>Nunca renderices objetos directamente, siempre accede a sus propiedades primitivas.</li>
        </ul>
      </div>
    </div>
  );
};

export default SizeDataTester;