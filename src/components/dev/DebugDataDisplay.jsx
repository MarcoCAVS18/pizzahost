// src/components/dev/DebugDataDisplay.jsx
import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

const DebugDataDisplay = () => {
  const { pizzaSizes, pastaSizes, pizzaToppings, loading, error } = useProducts();
  const [isVisible, setIsVisible] = useState(false);

  if (loading) return <div>Cargando datos...</div>;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 9999,
      maxWidth: '500px',
      maxHeight: '80vh',
      overflow: 'auto',
      padding: '10px',
      background: '#f8f8f8',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      fontSize: '12px'
    }}>
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={{
          padding: '5px 10px',
          marginBottom: '10px',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        {isVisible ? 'Ocultar datos' : 'Mostrar datos de depuración'}
      </button>
      
      {isVisible && (
        <div>
          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Pizza Sizes:</h3>
            <pre style={{ background: '#eee', padding: '5px', overflowX: 'auto' }}>
              {JSON.stringify(pizzaSizes, null, 2)}
            </pre>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Pasta Sizes:</h3>
            <pre style={{ background: '#eee', padding: '5px', overflowX: 'auto' }}>
              {JSON.stringify(pastaSizes, null, 2)}
            </pre>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Pizza Toppings:</h3>
            <pre style={{ background: '#eee', padding: '5px', overflowX: 'auto' }}>
              {JSON.stringify(pizzaToppings, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3>Accesos directos a valores:</h3>
            <div style={{ marginLeft: '10px' }}>
              <p><strong>SMALL pizza:</strong> {JSON.stringify(pizzaSizes.SMALL)}</p>
              <p><strong>MEDIUM pizza:</strong> {JSON.stringify(pizzaSizes.MEDIUM)}</p>
              <p><strong>LARGE pizza:</strong> {JSON.stringify(pizzaSizes.LARGE)}</p>
              <p><strong>REGULAR pasta:</strong> {JSON.stringify(pastaSizes.REGULAR)}</p>
              <p><strong>LARGE pasta:</strong> {JSON.stringify(pastaSizes.LARGE)}</p>
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <h3>Ejemplo de acceso correcto:</h3>
            <div style={{ marginLeft: '10px' }}>
              <p><strong>SMALL pizza name:</strong> {pizzaSizes?.SMALL?.name || 'Undefined'}</p>
              <p><strong>SMALL pizza price:</strong> {pizzaSizes?.SMALL?.price || 'Undefined'}</p>
              <p><strong>REGULAR pasta name:</strong> {pastaSizes?.REGULAR?.name || 'Undefined'}</p>
              <p><strong>REGULAR pasta price:</strong> {pastaSizes?.REGULAR?.price || 'Undefined'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugDataDisplay;