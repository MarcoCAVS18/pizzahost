// src/components/features/dashboard/CartSyncSettings.jsx
import React, { useState } from 'react';
import { FaSync, FaCloudUploadAlt, FaCloudDownloadAlt, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../hooks/useCart';
import { clearUserCart, saveUserCart, getUserCart } from '../../../services/cartService';
import Button from '../../ui/Button';

const CartSyncSettings = () => {
  const { user } = useAuth();
  const { items, loadCartFromFirebase, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  
  // Function to handle uploading the current cart to Firebase
  const handleUploadCart = async () => {
    if (!user?.uid) return;
    
    setIsLoading(true);
    setSyncStatus('uploading');
    
    try {
      await saveUserCart(user.uid, items);
      setSyncStatus('uploaded');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch (error) {
      console.error('Error uploading cart:', error);
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle downloading the cart from Firebase
  const handleDownloadCart = async () => {
    if (!user?.uid) return;
    
    setIsLoading(true);
    setSyncStatus('downloading');
    
    try {
      const firebaseCart = await getUserCart(user.uid);
      loadCartFromFirebase(firebaseCart);
      setSyncStatus('downloaded');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch (error) {
      console.error('Error downloading cart:', error);
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to clear the cart from Firebase
  const handleClearCloudCart = async () => {
    if (!user?.uid) return;
    
    if (!window.confirm('Are you sure you want to clear your cloud cart? This action cannot be undone.')) {
      return;
    }
    
    setIsLoading(true);
    setSyncStatus('clearing');
    
    try {
      await clearUserCart(user.uid);
      setSyncStatus('cleared');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch (error) {
      console.error('Error clearing cloud cart:', error);
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusMessage = () => {
    switch (syncStatus) {
      case 'uploading': return 'Uploading cart to cloud...';
      case 'uploaded': return 'Cart uploaded successfully!';
      case 'downloading': return 'Downloading cart from cloud...';
      case 'downloaded': return 'Cart downloaded successfully!';
      case 'clearing': return 'Clearing cloud cart...';
      case 'cleared': return 'Cloud cart cleared successfully!';
      case 'error': return 'An error occurred. Please try again.';
      default: return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4">
      <h3 className="font-serif text-xl font-semibold mb-4">Cart Synchronization</h3>
      
      <p className="text-gray-600 mb-6 font-serif">
        Your cart is automatically synchronized across all your devices when you're signed in.
        You can manually manage your cart synchronization with the options below.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Button
          text="Upload Cart"
          onClick={handleUploadCart}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
          textColor="text-darkRed"
          bgColor="bg-transparent"
          hoverColor="hover:bg-darkRed/5"
        >
          <FaCloudUploadAlt className="mr-2" />
        </Button>
        
        <Button
          text="Download Cart"
          onClick={handleDownloadCart}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
          textColor="text-darkRed"
          bgColor="bg-transparent"
          hoverColor="hover:bg-darkRed/5"
        >
          <FaCloudDownloadAlt className="mr-2" />
        </Button>
        
        <Button
          text="Clear Cloud Cart"
          onClick={handleClearCloudCart}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
          textColor="text-darkRed"
          bgColor="bg-transparent"
          hoverColor="hover:bg-darkRed/5"
        >
          <FaTrash className="mr-2" />
        </Button>
      </div>
      
      {syncStatus && (
        <div className={`text-center p-3 rounded-md mt-4 ${
          syncStatus.includes('error')
            ? 'bg-red-50 text-red-700'
            : syncStatus.includes('uploaded') || syncStatus.includes('downloaded') || syncStatus.includes('cleared')
              ? 'bg-green-50 text-green-700'
              : 'bg-blue-50 text-blue-700'
        }`}>
          <p className="font-serif flex items-center justify-center gap-2">
            {isLoading && <FaSync className="animate-spin" />}
            {getStatusMessage()}
          </p>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-serif font-semibold mb-2">Cart Sync Statistics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-sm text-gray-500">Local Cart Items:</span>
            <span className="block font-bold text-lg">{items.length}</span>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-sm text-gray-500">Last Sync:</span>
            <span className="block font-bold text-lg">
              {syncStatus ? 'Just now' : 'Automatic'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSyncSettings;