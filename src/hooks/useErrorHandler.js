// hooks/useErrorHandler.js
import { useState } from 'react';

/**
 * Hook personalizado para manejar errores de manera consistente en la aplicación
 * 
 * @param {Object} options - Opciones de configuración
 * @param {Object} options.errorMessages - Mapeo de códigos de error a mensajes amigables
 * @param {string} options.defaultMessage - Mensaje de error por defecto
 * @returns {Object} - Funciones y estado para manejar errores
 */
export const useErrorHandler = (options = {}) => {
  const {
    errorMessages = {},
    defaultMessage = 'An unexpected error occurred. Please try again.'
  } = options;
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Maneja un error y establece el mensaje apropiado
   * @param {Error} error - El objeto de error a manejar
   */
  const handleError = (error) => {
    console.error('Error:', error);
    
    if (error.code && errorMessages[error.code]) {
      setError(errorMessages[error.code]);
    } else if (error.message) {
      setError(error.message);
    } else {
      setError(defaultMessage);
    }
  };
  
  /**
   * Ejecuta una función asíncrona con manejo de errores y estado de carga
   * @param {Function} asyncFunction - Función asíncrona a ejecutar
   * @param {Array} args - Argumentos para pasar a la función
   * @returns {Promise} - Resultado de la función o error
   */
  const executeWithErrorHandling = async (asyncFunction, ...args) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await asyncFunction(...args);
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Limpia el estado de error
   */
  const clearError = () => setError('');
  
  return {
    error,
    isLoading,
    handleError,
    executeWithErrorHandling,
    clearError,
    setError,
    setIsLoading
  };
};

export default useErrorHandler;
