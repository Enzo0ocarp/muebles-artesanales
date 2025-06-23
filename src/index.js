/**
 * @fileoverview Punto de entrada principal de la aplicación React
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Punto de entrada principal de la aplicación
 * Renderiza el componente App en el DOM
 * 
 * @function
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Función para medir el rendimiento de la aplicación
 * Si se pasa una función, registra los resultados (ej: reportWebVitals(console.log))
 * o envía a un endpoint de analytics. Más info: https://bit.ly/CRA-vitals
 */
reportWebVitals();