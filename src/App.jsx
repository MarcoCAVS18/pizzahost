// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleRedirectResult } from './services/authService';
import { AuthProvider } from './context/AuthContext';
import RoutesComponent from './routes';
import NavBar from './components/common/NavBar.jsx';
import Footer from './components/common/Footer.jsx';
import '../src/assets/styles/tailwind.css';

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
        <NavBar />
        <RoutesComponent />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;