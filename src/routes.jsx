// routes.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import UserLog from './pages/UserLog';
import Wishlist from './pages/Wishlist';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from './pages/UserDashboard';



const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/user" element={<UserLog />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route 
      path="/dashboard" 
      element={
        <PrivateRoute>
          <UserDashboard />
        </PrivateRoute>
      } 
    />

    <Route 
      path="/cart" 
      element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } 
    />
    <Route 
      path="/wishlist" 
      element={
        <PrivateRoute>
          <Wishlist />
        </PrivateRoute>
      } 
    />
    <Route 
      path="/checkout" 
      element={
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      } 
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesComponent;
