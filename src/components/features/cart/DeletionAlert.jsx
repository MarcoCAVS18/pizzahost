// components/features/cart/DeletionAlert.jsx
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeletionAlert = ({ itemName }) => {
  useEffect(() => {
    if (itemName) {
      toast.error(`"${itemName}" has been removed from the cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { top: '120px' },
      });
    }
  }, [itemName]);

  return null;
};

export default DeletionAlert;