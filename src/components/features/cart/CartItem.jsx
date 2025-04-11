// components/features/cart/CartItem.jsx
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { useProducts } from '../../../hooks/useProducts';
import { getPizzaToppings } from '../../../services/productService';

// Orden predefinido de tamaños
const SIZE_ORDER = ['SMALL', 'MEDIUM', 'LARGE', 'XLARGE'];

const CartItem = ({
  id,
  image,
  name,
  quantity,
  price,
  selectedSize,
  ingredients = [],
  extras = [],
  onUpdateQuantity,
  onRemove,
  onUpdateIngredients,
  sizes = {},
  flavors,
  isCustom,
  category,
  leftImage,  // Nueva prop para pizza personalizada
  rightImage  // Nueva prop para pizza personalizada
}) => {
  const { pizzaSizes, pastaSizes } = useProducts();
  const [pizzaToppings, setPizzaToppings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localSelectedSize, setLocalSelectedSize] = useState(selectedSize?.toUpperCase());
  const [selectedExtras, setSelectedExtras] = useState(extras || []);
  const [localIngredients, setLocalIngredients] = useState(ingredients);
  
  // Nuevo estado para almacenar los ingredientes originales
  const [originalIngredients, setOriginalIngredients] = useState([]);
  // Estado para rastrear ingredientes eliminados
  const [removedIngredients, setRemovedIngredients] = useState([]);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(false);

  // Cargar toppings cuando se abre el modal
  useEffect(() => {
    if (isModalOpen) {
      const loadToppings = async () => {
        setLoading(true);
        try {
          const toppings = await getPizzaToppings();
          setPizzaToppings(toppings || []);
        } catch (error) {
          console.error('Error loading pizza toppings:', error);
          setPizzaToppings([]);
        } finally {
          setLoading(false);
        }
      };
      
      loadToppings();
    }
  }, [isModalOpen]);

  useEffect(() => {
    setLocalSelectedSize(selectedSize?.toUpperCase());
    setSelectedExtras(extras || []);
    setLocalIngredients(ingredients || []);
    // Guardar los ingredientes originales cuando se abre el modal
    setOriginalIngredients(ingredients || []);
    // Reiniciar los ingredientes removidos
    setRemovedIngredients([]);
  }, [selectedSize, extras, ingredients]);

  const sizePrice = sizes?.[localSelectedSize] || price || 0;
  const extrasTotal = selectedExtras.reduce((total, extra) => total + (Number(extra.price) || 0), 0);
  const itemTotal = (Number(sizePrice) + extrasTotal) * quantity;

  // Ordenar los tamaños según el orden predefinido
  const orderedSizes = React.useMemo(() => {
    if (!sizes || Object.keys(sizes).length === 0) return [];
    
    return Object.entries(sizes)
      .sort(([sizeKeyA], [sizeKeyB]) => {
        const indexA = SIZE_ORDER.indexOf(sizeKeyA.toUpperCase());
        const indexB = SIZE_ORDER.indexOf(sizeKeyB.toUpperCase());
        
        // Si ambos tamaños están en nuestro array de orden, usar ese orden
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        
        // Si solo uno está en el array, priorizar el que está
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        // Si ninguno está en el array, usar orden alfabético
        return sizeKeyA.localeCompare(sizeKeyB);
      });
  }, [sizes]);

  // Determinar qué conjunto de tamaños usar según la categoría
  const getSizeName = (size) => {
    if (!size) return '';
    const normalizedSize = size.toUpperCase();
    
    // Usar el objeto de tamaños correspondiente o un objeto vacío como fallback
    const sizesObject = category === 'pasta' ? pastaSizes || {} : pizzaSizes || {};
    
    // Extraer solo el nombre del tamaño o usar el código de tamaño como respaldo
    if (sizesObject && sizesObject[normalizedSize] && typeof sizesObject[normalizedSize] === 'object') {
      return sizesObject[normalizedSize].name || normalizedSize;
    }
    
    return normalizedSize;
  };

  // Función para manejar el cambio de extras
  const handleExtraToggle = (extra) => {
    if (!extra || !extra.id) return;
    
    setSelectedExtras((prev) => {
      const isSelected = prev.some((e) => e.id === extra.id);
      return isSelected
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra];
    });
  };

  // Función para manejar la eliminación de ingredientes
  const handleIngredientToggle = (ingredientId) => {
    if (!ingredientId) return;
    
    // Encontrar el ingrediente que está siendo eliminado
    const ingredientToRemove = localIngredients.find(ing => ing.id === ingredientId);
    
    if (ingredientToRemove && ingredientToRemove.removable) {
      // Actualizar ingredientes locales
      setLocalIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
      
      // Añadir a la lista de ingredientes eliminados si no está ya
      setRemovedIngredients(prev => {
        if (!prev.some(ing => ing.id === ingredientId)) {
          return [...prev, ingredientToRemove];
        }
        return prev;
      });
    }
  };

  // Función para restaurar un ingrediente eliminado
  const handleRestoreIngredient = (ingredientId) => {
    if (!ingredientId) return;
    
    // Encontrar el ingrediente a restaurar
    const ingredientToRestore = removedIngredients.find(ing => ing.id === ingredientId);
    
    if (ingredientToRestore) {
      // Añadir de nuevo a los ingredientes locales
      setLocalIngredients(prev => [...prev, ingredientToRestore]);
      
      // Quitar de la lista de eliminados
      setRemovedIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
    }
  };

  // Función para restaurar todos los ingredientes originales
  const handleRestoreAllIngredients = () => {
    setLocalIngredients(originalIngredients);
    setRemovedIngredients([]);
  };

  // Función para guardar los cambios
  const handleSaveChanges = () => {
    const newBasePrice = sizes[localSelectedSize] || 0;
    const newExtrasPrice = selectedExtras.reduce((total, extra) => total + (Number(extra.price) || 0), 0);
    
    onUpdateIngredients(id, localSelectedSize, {
      baseIngredients: localIngredients,
      extras: selectedExtras,
      size: localSelectedSize,
      totalPrice: newBasePrice + newExtrasPrice,
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-start gap-3 py-3">
        <div className="w-20 h-20 flex-shrink-0">
          {isCustom ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* En lugar de usar una imagen generada con canvas, mostramos dos imágenes lado a lado */}
              <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <img 
                  src={flavors?.left?.image || leftImage} 
                  alt={flavors?.left?.name || 'Left pizza'} 
                  className="object-cover h-full"
                  style={{ width: '200%', maxWidth: 'none', marginLeft: '-50%' }}
                />
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
                <img 
                  src={flavors?.right?.image || rightImage} 
                  alt={flavors?.right?.name || 'Right pizza'} 
                  className="object-cover h-full"
                  style={{ width: '200%', maxWidth: 'none', marginLeft: '-50%' }}
                />
              </div>
            </div>
          ) : (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
          )}
        </div>
  
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-serif font-bold text-gray-800">
                {isCustom ? 'Custom Pizza' : name}
              </h3>
              {selectedSize && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">
                  {getSizeName(localSelectedSize)}
                </span>
              )}
            </div>
            <span className="text-lg font-bold text-darkRed">${itemTotal.toFixed(2)}</span>
          </div>
  
          <div className="text-xs font-serif text-gray-600 mb-2 flex flex-wrap items-center gap-1">
            {isCustom ? (
              <span>{flavors?.left?.name || ''} & {flavors?.right?.name || ''}</span>
            ) : (
              <>
                <span>{localIngredients.map((ing) => ing?.name || '').filter(Boolean).join(', ')}</span>
                {selectedExtras.length > 0 && <span className="mx-1"></span>}
              </>
            )}
          </div>
  
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600 flex flex-wrap gap-1">
              {selectedExtras.length > 0 && (
                <>
                  <span className="font-medium font-serif text-gray-800">Extras:</span>
                  {selectedExtras.map((extra, index) => (
                    <span key={extra.id || index} className="text-darkRed font-serif">
                      {extra?.name || ''}{index < selectedExtras.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </>
              )}
            </div>
  
            <div className="flex items-center gap-3">
              <select
                value={quantity}
                onChange={(e) => onUpdateQuantity(id, parseInt(e.target.value, 10), localSelectedSize)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
  
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-400 hover:text-darkRed transition-colors p-1"
                  title="Edit ingredients"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => onRemove({ id, selectedSize: localSelectedSize })}
                  className="text-gray-400 hover:text-darkRed transition-colors p-1"
                  aria-label="Remove item"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Customize ${name}`}
        size="medium"
        footer={(
          <div className="flex justify-end gap-4">
            <Button
              text="Cancel"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            />
            <Button
              text="Save Changes"
              onClick={handleSaveChanges}
              className="bg-darkRed text-white hover:bg-lightRed"
            />
          </div>
        )}
      >
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {orderedSizes.map(([sizeKey, sizePrice]) => {
                  const normalizedSize = sizeKey.toUpperCase();
                  const sizeName = getSizeName(normalizedSize);
                  const formattedPrice = typeof sizePrice === 'number' ? sizePrice.toFixed(2) : '0.00';
    
                  return (
                    <button
                      key={sizeKey}
                      onClick={() => setLocalSelectedSize(normalizedSize)}
                      className={`px-4 py-2 rounded-full 
                        ${localSelectedSize === normalizedSize
                          ? 'bg-darkRed text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {sizeName} - ${formattedPrice}
                    </button>
                  );
                })}
              </div>
            </div>
    
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                {removedIngredients.length > 0 && (
                  <button
                    onClick={handleRestoreAllIngredients}
                    className="text-sm text-darkRed hover:underline flex items-center gap-1"
                  >
                    <FaCheck size={12} /> Restore All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {localIngredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    onClick={() => handleIngredientToggle(ingredient.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-2
                      ${!ingredient.removable
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    disabled={!ingredient.removable}
                  >
                    {ingredient?.name || ''}
                    {ingredient.removable && (
                      <span className="text-xs opacity-75">✕</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sección de ingredientes eliminados */}
            {removedIngredients.length > 0 && (
              <div>
                <h3 className="text-md font-semibold mb-2 text-gray-600">Removed Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {removedIngredients.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => handleRestoreIngredient(ingredient.id)}
                      className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-2"
                    >
                      {ingredient?.name || ''}
                      <span className="text-xs text-darkRed">+ Restore</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
    
            <div>
              <h3 className="text-lg font-semibold mb-2">Add Extras</h3>
              <div className="flex flex-wrap gap-2">
                {pizzaToppings.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => handleExtraToggle(extra)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-2
                      ${selectedExtras.some((e) => e.id === extra.id)
                        ? 'bg-darkRed text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {extra?.name || ''}
                    <span className="text-xs opacity-75">${(Number(extra?.price) || 0).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CartItem;