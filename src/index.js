import React from 'react';
import ReactDOM from 'react-dom/client'; // Si usas React 18, asegúrate de usar ReactDOM.createRoot
import App from './App'; // Importa el componente App

const rootElement = document.getElementById('root'); // Aquí se monta la app

const root = ReactDOM.createRoot(rootElement); // Si usas React 18
root.render(<App />);
