import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleRedirectResult } from './services/authService';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import RoutesComponent from './routes';
import NavBar from './components/common/NavBar.jsx';
import Footer from './components/common/Footer.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import '../src/assets/styles/tailwind.css';
import MainLayout from './layouts/MainLayout.jsx';

// Import development tools component
import DevelopmentTools from './components/dev/DevelopmentTools';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleRedirectResult();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <MainLayout isLoading={isLoading}>
              <RoutesComponent setIsLoading={setIsLoading} />
            </MainLayout>
            {!isLoading && <Footer />}
            
            {/* Add development tools */}
            {process.env.NODE_ENV === 'development' && <DevelopmentTools />}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;