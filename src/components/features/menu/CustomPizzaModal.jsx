// src/components/features/menu/CustomPizzaModal.jsx - VERSIÓN MEJORADA PARA MÓVILES
import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { useCustomPizzaModal } from '../../../hooks/useModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const CustomPizzaModal = ({ isOpen, onClose, onConfirm, selectedSize, resetSelection, pizzas = [] }) => {
  const {
    selectedFlavors,
    handleFlavorSelect,
    calculateTotalPrice,
    canConfirm,
  } = useCustomPizzaModal(selectedSize);

  // Estado para controlar la vista en dispositivos móviles
  const [mobileView, setMobileView] = useState('preview'); // 'preview', 'left', 'right', 'flavors'

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm(selectedFlavors);
    }
  };

  const handleClose = () => {
    resetSelection();
    onClose();
    // Resetear la vista móvil al cerrar
    setMobileView('preview');
  };

  // Función para cambiar entre vistas en móvil
  const navigateView = (view) => {
    setMobileView(view);
  };

  // Renderizar el título según la vista actual en móvil
  const renderMobileTitle = () => {
    switch (mobileView) {
      case 'left':
        return "Select Left Side Flavor";
      case 'right':
        return "Select Right Side Flavor";
      case 'flavors':
        return "Available Flavors";
      default:
        return "Create Your Custom Pizza";
    }
  };

  // Renderizar el contenido según la vista actual en móvil
  const renderMobileContent = () => {
    switch (mobileView) {
      case 'left':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={() => navigateView('preview')}
                className="flex items-center text-darkRed font-medium"
              >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back
              </button>
              <h3 className="font-serif font-semibold">Left Side Flavor</h3>
              <div className="w-5"></div> {/* Spacer para centrar el título */}
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pb-4">
              {pizzas.map((pizza) => (
                <div
                  key={pizza.id}
                  onClick={() => {
                    handleFlavorSelect(pizza, 'left');
                    navigateView('preview');
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-darkRed
                    ${selectedFlavors.left?.id === pizza.id
                      ? 'bg-darkRed/5 border-darkRed'
                      : 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h4 className="font-serif font-medium">{pizza.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{pizza.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'right':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={() => navigateView('preview')}
                className="flex items-center text-darkRed font-medium"
              >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back
              </button>
              <h3 className="font-serif font-semibold">Right Side Flavor</h3>
              <div className="w-5"></div> {/* Spacer para centrar el título */}
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pb-4">
              {pizzas.map((pizza) => (
                <div
                  key={pizza.id}
                  onClick={() => {
                    handleFlavorSelect(pizza, 'right');
                    navigateView('preview');
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-darkRed
                    ${selectedFlavors.right?.id === pizza.id
                      ? 'bg-darkRed/5 border-darkRed'
                      : 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h4 className="font-serif font-medium">{pizza.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{pizza.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default: // 'preview'
        return (
          <div className="py-2">
            <p className="text-gray-600 text-center mb-6">
              Select two different pizza flavors to create your perfect half & half custom pizza.
            </p>
            
            {/* Vista previa de la pizza personalizada */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Mitad izquierda */}
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => navigateView('left')}
              >
                <div className={`p-4 rounded-lg mb-2 flex flex-col items-center justify-center min-h-[120px] border-2 transition-all
                  ${selectedFlavors.left 
                    ? 'border-green bg-green/5' 
                    : 'border-darkRed/30 bg-darkRed/5'}`}
                >
                  {selectedFlavors.left ? (
                    <div className="text-center">
                      <img
                        src={selectedFlavors.left.image}
                        alt={selectedFlavors.left.name}
                        className="w-20 h-20 mx-auto object-contain mb-2"
                      />
                      <p className="font-serif font-semibold text-darkRed">{selectedFlavors.left.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-darkRed/20 flex items-center justify-center mx-auto mb-2">
                        <ChevronRightIcon className="w-8 h-8 text-darkRed" />
                      </div>
                      <p className="text-darkRed font-medium">Select Left Side</p>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => navigateView('left')}
                  className="w-full py-2 px-3 bg-darkRed/10 hover:bg-darkRed/20 text-darkRed rounded-lg font-medium transition-colors"
                >
                  {selectedFlavors.left ? 'Change Left Side' : 'Select Left Side'}
                </button>
              </div>
              
              {/* Mitad derecha */}
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => navigateView('right')}
              >
                <div className={`p-4 rounded-lg mb-2 flex flex-col items-center justify-center min-h-[120px] border-2 transition-all
                  ${selectedFlavors.right 
                    ? 'border-green bg-green/5' 
                    : 'border-darkRed/30 bg-darkRed/5'}`}
                >
                  {selectedFlavors.right ? (
                    <div className="text-center">
                      <img
                        src={selectedFlavors.right.image}
                        alt={selectedFlavors.right.name}
                        className="w-20 h-20 mx-auto object-contain mb-2"
                      />
                      <p className="font-serif font-semibold text-darkRed">{selectedFlavors.right.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-darkRed/20 flex items-center justify-center mx-auto mb-2">
                        <ChevronRightIcon className="w-8 h-8 text-darkRed" />
                      </div>
                      <p className="text-darkRed font-medium">Select Right Side</p>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => navigateView('right')}
                  className="w-full py-2 px-3 bg-darkRed/10 hover:bg-darkRed/20 text-darkRed rounded-lg font-medium transition-colors"
                >
                  {selectedFlavors.right ? 'Change Right Side' : 'Select Right Side'}
                </button>
              </div>
            </div>
            
            {/* Vista previa de la pizza completa - solo visible cuando ambos lados están seleccionados */}
            {selectedFlavors.left && selectedFlavors.right && (
              <div className="mb-6">
                <h3 className="font-serif font-semibold mb-3 text-center">Your Custom Pizza</h3>
                <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden border-2 border-green">
                  {/* Visualización mejorada para pizzas personalizadas */}
                  <div className="absolute inset-0 flex">
                    {/* Mitad izquierda */}
                    <div className="w-1/2 h-full overflow-hidden border-r border-dashed border-gray-300">
                      <img 
                        src={selectedFlavors.left.image} 
                        alt={selectedFlavors.left.name} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Mitad derecha */}
                    <div className="w-1/2 h-full overflow-hidden">
                      <img 
                        src={selectedFlavors.right.image} 
                        alt={selectedFlavors.right.name} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  {/* Línea divisoria */}
                  <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{
                      borderRight: '1px dashed rgba(255,255,255,0.7)',
                      transform: 'rotate(0deg)',
                      transformOrigin: 'center'
                    }}
                  ></div>
                </div>
                <p className="text-center mt-2 font-serif text-darkRed font-medium">
                  {selectedFlavors.left.name} & {selectedFlavors.right.name}
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  // Renderizar el contenido para pantallas grandes (sin cambios)
  const renderDesktopContent = () => (
    <div className="py-2">
      <p className="text-gray-600 text-center mb-6">
        Select two different pizza flavors to create your perfect half & half custom pizza.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-serif font-semibold mb-4 text-center">Left Side</h3>
          <div className={`p-4 h-40 flex items-center justify-center rounded-lg mb-4 ${selectedFlavors.left ? 'bg-green/10 border border-green' : 'bg-gray-100'}`}>
            {selectedFlavors.left ? (
              <div className="text-center">
                <img
                  src={selectedFlavors.left.image}
                  alt={selectedFlavors.left.name}
                  className="w-20 h-20 mx-auto object-contain mb-2"
                />
                <p className="font-serif font-semibold text-darkRed">{selectedFlavors.left.name}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Select a flavor for the left side</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-serif font-semibold mb-4 text-center">Right Side</h3>
          <div className={`p-4 h-40 flex items-center justify-center rounded-lg mb-4 ${selectedFlavors.right ? 'bg-green/10 border border-green' : 'bg-gray-100'}`}>
            {selectedFlavors.right ? (
              <div className="text-center">
                <img
                  src={selectedFlavors.right.image}
                  alt={selectedFlavors.right.name}
                  className="w-20 h-20 mx-auto object-contain mb-2"
                />
                <p className="font-serif font-semibold text-darkRed">{selectedFlavors.right.name}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Select a flavor for the right side</p>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="font-serif font-semibold mt-6 mb-4">Available Flavors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            onClick={() => handleFlavorSelect(pizza)}
            className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-darkRed
              ${selectedFlavors.left?.id === pizza.id || selectedFlavors.right?.id === pizza.id
                ? 'bg-darkRed/5 border-darkRed'
                : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center gap-3">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="font-serif font-medium">{pizza.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{pizza.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={window.innerWidth < 640 ? renderMobileTitle() : "Choose Your Pizza Flavors"}
      size={window.innerWidth < 640 ? "medium" : "large"}
      footer={(
        <div className="flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-darkRed">
            {canConfirm ? `$${calculateTotalPrice()}` : ''}
          </div>
          <div className="flex gap-4">
            <Button
              text="Cancel"
              onClick={handleClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            />
            <Button
              text="Confirm"
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={!canConfirm ? 'cursor-not-allowed' : ''}
              bgColor={canConfirm ? "bg-darkRed" : "bg-gray-400"}
              hoverColor={canConfirm ? "hover:bg-lightRed" : ""}
              textColor="text-white"
            />
          </div>
        </div>
      )}
    >
      {/* Renderizar contenido según el tamaño de pantalla */}
      <div className="hidden sm:block">
        {renderDesktopContent()}
      </div>
      <div className="sm:hidden">
        {renderMobileContent()}
      </div>
    </Modal>
  );
};

export default CustomPizzaModal;
