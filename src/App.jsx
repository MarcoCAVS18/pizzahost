import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes'; 
import NavBar from './components/common/NavBar.jsx'; 
import Footer from './components/common/Footer.jsx';
import '../src/assets/styles/tailwind.css'

const App = () => (
  <Router>
    <NavBar />  
    <RoutesComponent />  
    <Footer />
  </Router>
);

export default App;
