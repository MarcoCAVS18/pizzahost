import React from 'react';
import Modal from '../../ui/Modal';
import { useCustomPizzaModal } from '../../../hoks/useModal';
import Button from '../../ui/Button';

const CustomPizzaModal = ({ isOpen, onClose, onConfirm, selectedSize }) => {
    const {
        selectedFlavors,
        pizzas,
        handleFlavorSelect,
        calculatePrice,
        calculateTotalPrice,
        canConfirm,
        setSelectedFlavors
    } = useCustomPizzaModal(selectedSize);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Your Perfect Pizza"
            size="large"
            footer={
                <Button
                    onClick={() => onConfirm(selectedFlavors)}
                    disabled={!canConfirm}
                    text={canConfirm
                        ? `Confirm Selection - Total: $${calculateTotalPrice()}`
                        : "Confirm Selection"
                    }
                    className={`w-full ${!canConfirm && 'opacity-50 cursor-not-allowed bg-gray-300'}`}
                    size="medium"
                    bgColor="bg-darkRed"
                    hoverColor="hover:bg-lightRed"
                    fontFamily="font-serif"
                    rounded="rounded-lg"
                />
            }
        >

            <div className="text-center font-serif text-gray-600 mb-8">
                <p className='font-bold'>Choose two flavors for your pizza.</p>
                <p className="text-sm mt-2">
                    {!selectedFlavors.left
                        ? "Select your first flavor"
                        : !selectedFlavors.right
                            ? "Now select your second flavor"
                            : "Your pizza is ready!"}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Pizza Visualization */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative w-64 h-64">
                        <div className="absolute inset-0 rounded-full bg-[#fcf5f0] border-2 border-darkRed/20 overflow-hidden">
                            {/* Left Half */}
                            <div className="absolute inset-0 w-1/2 overflow-hidden">
                                {selectedFlavors.left && (
                                    <img
                                        src={selectedFlavors.left.image}
                                        alt={selectedFlavors.left.name}
                                        className="absolute w-[200%] h-full object-cover left-0"
                                    />
                                )}
                            </div>

                            {/* Right Half */}
                            <div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden">
                                {selectedFlavors.right && (
                                    <img
                                        src={selectedFlavors.right.image}
                                        alt={selectedFlavors.right.name}
                                        className="absolute w-[200%] h-full object-cover right-0"
                                    />
                                )}
                            </div>

                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-darkRed/30 transform -translate-x-1/2" />
                        </div>
                    </div>

                    {/* Selected Flavors Summary */}
                    <div className="w-full space-y-2 font-serif">
                        {selectedFlavors.left && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span>Left: {selectedFlavors.left.name}</span>
                                    <button
                                        onClick={() => setSelectedFlavors(prev => ({ ...prev, left: null }))}
                                        className="text-sm text-darkRed hover:text-lightRed underline"
                                    >
                                        Change
                                    </button>
                                </div>
                                <span>${calculatePrice(selectedFlavors.left).toFixed(2)}</span>
                            </div>
                        )}
                        {selectedFlavors.right && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span>Right: {selectedFlavors.right.name}</span>
                                    <button
                                        onClick={() => setSelectedFlavors(prev => ({ ...prev, right: null }))}
                                        className="text-sm text-darkRed hover:text-lightRed underline"
                                    >
                                        Change
                                    </button>
                                </div>
                                <span>${calculatePrice(selectedFlavors.right).toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Flavor Selection */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {pizzas.map((pizza) => (
                        <button
                            key={pizza.id}
                            onClick={() => handleFlavorSelect(pizza)}
                            disabled={selectedFlavors.left && selectedFlavors.right}
                            className="w-full p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300
                                hover:border-darkRed focus:outline-none focus:ring-2 focus:ring-darkRed/50
                                group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={pizza.image}
                                    alt={pizza.name}
                                    className="w-16 h-16 object-cover rounded-full border-2 border-transparent
                                        group-hover:border-darkRed transition-colors"
                                />
                                <div className="text-left">
                                    <h4 className="font-serif text-darkRed">{pizza.name}</h4>
                                    <p className="text-sm text-gray-600 font-serif">{pizza.description}</p>
                                    <p className="text-sm text-darkRed font-serif mt-1">
                                        ${(pizza.sizes[selectedSize] / 2 * 1.05).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default CustomPizzaModal;