import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes'; 
import NavBar from './components/common/NavBar.jsx'; 
import '../src/assets/styles/tailwind.css'

const App = () => (
  <Router>
    <NavBar />  
    <RoutesComponent />  
  </Router>
);

export default App;
