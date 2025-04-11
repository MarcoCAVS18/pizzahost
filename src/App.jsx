import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleRedirectResult } from './services/authService';
import { AuthProvider } from './context/AuthContext';
import RoutesComponent from './routes';
import NavBar from './components/common/NavBar.jsx';
import Footer from './components/common/Footer.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import '../src/assets/styles/tailwind.css';
import MainLayout from './layouts/MainLayout.jsx';

// Importar componente de herramientas de desarrollo
import DevelopmentTools from './components/dev/DevelopmentTools';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleRedirectResult();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <MainLayout isLoading={isLoading}>
            <RoutesComponent setIsLoading={setIsLoading} />
          </MainLayout>
          {!isLoading && <Footer />}
          
          {/* Añadir herramientas de desarrollo */}
          {process.env.NODE_ENV === 'development' && <DevelopmentTools />}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;