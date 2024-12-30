// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='font-oldstyle italic text-2xl'>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/user" />;
  }

  return children;
};

export default PrivateRoute;