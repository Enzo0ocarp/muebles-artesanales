/**
 * @fileoverview Componente principal de la aplicación
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

// Páginas
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Admin from './pages/Admin/Admin';

// Estilos
import './App.css';

/**
 * Componente principal de la aplicación
 * Maneja el enrutamiento y la estructura general del sitio
 * 
 * @component
 * @returns {JSX.Element} Estructura principal de la aplicación
 * 
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  /**
   * Variantes de animación para las transiciones de página
   * @type {Object}
   */
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  /**
   * Configuración de transiciones para las animaciones
   * @type {Object}
   */
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-amber-50">
        <Header />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/galeria" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Gallery />
                  </motion.div>
                } 
              />
              <Route 
                path="/contacto" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Contact />
                  </motion.div>
                } 
              />
              <Route 
                path="/nosotros" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <About />
                  </motion.div>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Admin />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;