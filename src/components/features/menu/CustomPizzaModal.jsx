// components/features/menu/CustomPizzaModal.jsx
import React from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { useCustomPizzaModal } from '../../../hooks/useModal';

const CustomPizzaModal = ({ isOpen, onClose, onConfirm, selectedSize, resetSelection, pizzas = [] }) => {
  const {
    selectedFlavors,
    handleFlavorSelect,
    calculateTotalPrice,
    canConfirm,
  } = useCustomPizzaModal(selectedSize);

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm(selectedFlavors);
    }
  };

  const handleClose = () => {
    resetSelection();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Choose Your Pizza Flavors"
      size="large"
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
      <div className="py-2">
        <p className="text-gray-600 text-center mb-6">
          Select two different pizza flavors to create your perfect half & half custom pizza.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-serif font-semibold mb-4 text-center">Left Side</h3>
            <div className={`p-4 h-40 flex items-center justify-center rounded-lg mb-4 ${selectedFlavors.left ? 'bg-green-500/10 border border-green' : 'bg-gray-100'}`}>
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
            <div className={`p-4 h-40 flex items-center justify-center rounded-lg mb-4 ${selectedFlavors.right ? 'bg-green-500/10 border border-green' : 'bg-gray-100'}`}>
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
    </Modal>
  );
};

export default CustomPizzaModal;