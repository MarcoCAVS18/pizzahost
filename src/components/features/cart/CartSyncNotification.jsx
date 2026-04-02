// src/components/features/cart/CartSyncNotification.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FaSync, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// Status constants
const SYNC_STATUS = {
  SYNCING: 'syncing',
  SYNCED: 'synced',
  ERROR: 'error',
  IDLE: 'idle'
};

const CartSyncNotification = ({ isSynced = true, syncError = false }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(SYNC_STATUS.IDLE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show notifications for logged-in users
    if (!user) {
      setVisible(false);
      return;
    }

    if (syncError) {
      setStatus(SYNC_STATUS.ERROR);
      setVisible(true);
    } else if (!isSynced) {
      setStatus(SYNC_STATUS.SYNCING);
      setVisible(true);
    } else {
      setStatus(SYNC_STATUS.SYNCED);
      setVisible(true);
      
      // Hide "synced" message after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user, isSynced, syncError]);

  // Don't render anything if not visible or no user
  if (!visible || !user) {
    return null;
  }

  let icon;
  let message;
  let bgColor;
  
  switch (status) {
    case SYNC_STATUS.SYNCING:
      icon = <FaSync className="animate-spin text-blue-500" />;
      message = "Syncing your cart...";
      bgColor = "bg-blue-50 border-blue-200";
      break;
      
    case SYNC_STATUS.SYNCED:
      icon = <FaCheck className="text-green-500" />;
      message = "Cart synced successfully!";
      bgColor = "bg-green-50 border-green-200";
      break;
      
    case SYNC_STATUS.ERROR:
      icon = <FaExclamationTriangle className="text-amber-500" />;
      message = "Failed to sync cart. Retrying...";
      bgColor = "bg-amber-50 border-amber-200";
      break;
      
    default:
      return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 py-2 px-4 rounded-md shadow-md border ${bgColor} transition-all duration-300 opacity-90 hover:opacity-100`}>
      {icon}
      <span className="text-sm font-serif">{message}</span>
    </div>
  );
};

export default CartSyncNotification;