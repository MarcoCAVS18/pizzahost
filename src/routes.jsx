import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import UserLog from './pages/UserLog';
import Wishlist from './pages/Wishlist';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from './pages/UserDashboard';

const RoutesComponent = ({ setIsLoading }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home setIsLoading={setIsLoading} />} />
      <Route path="/menu" element={<Menu setIsLoading={setIsLoading} />} />
      <Route path="/about" element={<About setIsLoading={setIsLoading} />} />
      <Route path="/contact" element={<Contact setIsLoading={setIsLoading} />} />
      <Route path='/cart' element={<Cart setIsLoading={setIsLoading}/>} />
      <Route path='/checkout' element={<Checkout setIsLoading={setIsLoading}/>} />
      
      {/* Authentication Routes */}
      <Route path="/user" element={<UserLog setIsLoading={setIsLoading}/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard setIsLoading={setIsLoading}/>
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist setIsLoading={setIsLoading}/>
          </PrivateRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;