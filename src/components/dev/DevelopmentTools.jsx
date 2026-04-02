// src/components/dev/DevelopmentTools.jsx
import React, { useState } from 'react';
import MetadataInitializer from '../../utils/initializeFirestoreMetadata';
import CouponInitializer from '../../utils/initializeFirestoreCoupons';
import DebugDataDisplay from './DebugDataDisplay';

/**
 * Tabs para las diferentes herramientas de desarrollo
 */
const DevTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'metadata', label: 'Metadata' },
    { id: 'coupons', label: 'Coupons' },
    { id: 'debug', label: 'Debug Data' }
  ];

  return (
    <div className="flex border-b mb-4">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-2 px-4 font-medium text-sm transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-darkRed text-darkRed'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/**
 * Componente que agrupa todas las herramientas de desarrollo.
 * Solo debe ser incluido en entorno de desarrollo.
 */
const DevelopmentTools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('metadata');
  
  // Verificar si estamos en entorno de desarrollo
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment) return null;
  
  return (
    <>
      {/* Botón para mostrar/ocultar panel */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-darkRed text-white p-2 rounded-md shadow-lg hover:bg-lightRed"
      >
        {isVisible ? 'Hide Dev Tools' : 'Show Dev Tools'}
      </button>
      
      {/* Panel de herramientas */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 w-96 max-h-[80vh] overflow-auto bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Development Tools</h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-darkRed"
              >
                ✕
              </button>
            </div>
            
            <DevTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="py-2">
              {activeTab === 'metadata' && <MetadataInitializer />}
              {activeTab === 'coupons' && <CouponInitializer />}
              {activeTab === 'debug' && <DebugDataDisplay />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevelopmentTools;