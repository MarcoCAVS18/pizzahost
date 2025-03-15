import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeletionAlert = ({ itemName }) => {
  if (itemName) {
    toast.success(`"${itemName}" has been removed from the cart!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  return null; 
};

export default DeletionAlert;
