// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleRedirectResult } from './services/authService';
import { AuthProvider } from './context/AuthContext';
import RoutesComponent from './routes';
import NavBar from './components/common/NavBar.jsx';
import Footer from './components/common/Footer.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import '../src/assets/styles/tailwind.css';
import MainLayout from './layouts/MainLayout.jsx';

const App = () => {
  useEffect(() => {
    handleRedirectResult()
      .then(user => {
        if (user) {
          console.log('User signed in after redirect:', user);
        }
      })
      .catch(error => {
        console.error('Error handling redirect:', error);
      });
  }, []);

  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <MainLayout>
            <RoutesComponent />
          </MainLayout>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;