// src/utils/sizeUtils.js

/**
 * Obtiene el nombre del tamaño a partir de la clave
 * @param {string} sizeKey - Clave del tamaño (SMALL, MEDIUM, etc.)
 * @param {Object} sizesObject - Objeto que contiene la información de tamaños (pizzaSizes o pastaSizes)
 * @returns {string} Nombre legible del tamaño
 */
export const getSizeDisplayName = (sizeKey, sizesObject) => {
    if (!sizeKey) return '';
    
    const normalizedKey = typeof sizeKey === 'string' ? sizeKey.toUpperCase() : String(sizeKey);
    
    // Comprueba si el objeto de tamaños existe y tiene la clave normalizada
    if (sizesObject && typeof sizesObject === 'object' && sizesObject[normalizedKey]) {
      // Comprueba si el objeto de tamaño tiene una propiedad 'name'
      if (sizesObject[normalizedKey].name && typeof sizesObject[normalizedKey].name === 'string') {
        return sizesObject[normalizedKey].name;
      }
    }
    
    // Si no podemos obtener un nombre válido, devolvemos la clave como fallback
    return normalizedKey;
  };
  
  /**
   * Obtiene el precio de un tamaño específico
   * @param {string} sizeKey - Clave del tamaño (SMALL, MEDIUM, etc.)
   * @param {Object} sizesObject - Objeto que contiene la información de tamaños
   * @param {number} defaultPrice - Precio por defecto si no se encuentra
   * @returns {number} Precio del tamaño
   */
  export const getSizePrice = (sizeKey, sizesObject, defaultPrice = 0) => {
    if (!sizeKey) return defaultPrice;
    
    const normalizedKey = typeof sizeKey === 'string' ? sizeKey.toUpperCase() : String(sizeKey);
    
    // Comprueba si el objeto de tamaños existe y tiene la clave normalizada
    if (sizesObject && typeof sizesObject === 'object' && sizesObject[normalizedKey]) {
      // Comprueba si el objeto de tamaño tiene una propiedad 'price' numérica
      if (sizesObject[normalizedKey].price !== undefined && 
          !isNaN(Number(sizesObject[normalizedKey].price))) {
        return Number(sizesObject[normalizedKey].price);
      }
    }
    
    // Si no podemos obtener un precio válido, devolvemos el precio por defecto
    return defaultPrice;
  };
  
  /**
   * Determina qué objeto de tamaños usar según la categoría del producto
   * @param {string} category - Categoría del producto (pizza, pasta, etc.)
   * @param {Object} pizzaSizes - Objeto con tamaños de pizza
   * @param {Object} pastaSizes - Objeto con tamaños de pasta
   * @returns {Object} Objeto de tamaños correspondiente a la categoría
   */
  export const getSizesObjectByCategory = (category, pizzaSizes, pastaSizes) => {
    if (!category) return {};
    
    const normalizedCategory = category.toLowerCase();
    
    if (normalizedCategory === 'pizza') {
      return pizzaSizes || {};
    } else if (normalizedCategory === 'pasta') {
      return pastaSizes || {};
    }
    
    // Para otras categorías que no tienen tamaños específicos
    return {};
  };