/**
 * @fileoverview Componente Header para navegación principal
 * @author Muebles Artesanales  
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente Header que contiene la navegación principal del sitio
 * Incluye menú responsive y efectos de scroll
 * 
 * @component
 * @returns {JSX.Element} Header con navegación
 * 
 * @example
 * return (
 *   <Header />
 * )
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  /**
   * Enlaces de navegación del menú principal
   * @type {Array<Object>}
   * @constant
   */
  const navigationLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/galeria', label: 'Galería' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/contacto', label: 'Contacto' }
  ];

  /**
   * Efecto para detectar el scroll y cambiar el estilo del header
   */
  useEffect(() => {
    /**
     * Maneja el evento de scroll para cambiar el estado del header
     * @function
     */
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Cierra el menú móvil cuando cambia la ruta
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  /**
   * Alterna el estado del menú móvil
   * @function
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Verifica si una ruta está activa
   * @param {string} path - Ruta a verificar
   * @returns {boolean} True si la ruta está activa
   */
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  /**
   * Determina si estamos en la página de inicio
   * @returns {boolean} True si estamos en la página de inicio
   */
  const isHomePage = () => {
    return location.pathname === '/';
  };

  /**
   * Maneja el error de carga del logo
   * @function
   */
  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <>
      {/* Backdrop para mejorar legibilidad en TODAS las páginas */}
      {!isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-40 pointer-events-none" />
      )}
      
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-lg shadow-xl border-b border-amber-100/50' 
            : 'bg-black/30 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative z-10">
              <motion.div

                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!logoError ? (
                  <img 
                    src="/images/logo.jpg" 
                    alt="Muebles Beltran Logo" 
                    className="h-10 w-10 object-contain"
                    onError={handleLogoError}
                  />
                ) : (
                  <Hammer className="h25 w-25 text-white" />
                )}
              </motion.div>
              <div className="font-heading">
                <h1 className={`text-xl font-bold transition-all duration-300 ${
                  isScrolled 
                    ? 'text-amber-900' 
                    : 'text-white font-semibold'
                }`}>
                  Muebles Beltran
                </h1>
                <p className={`text-sm -mt-1 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-amber-700' 
                    : 'text-amber-100 font-medium'
                }`}>
                  Carpintería de calidad
                </p>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-all duration-300 relative px-3 py-2 rounded-lg ${
                    isActiveRoute(link.path)
                      ? isScrolled
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-white bg-amber-700/80 font-semibold shadow-lg'
                      : isScrolled
                      ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50'
                      : 'text-white hover:text-white hover:bg-amber-700/60 font-medium'
                  }`}
                >
                  {link.label}
                  {isActiveRoute(link.path) && (
                    <motion.div
                      className={`absolute -bottom-1 left-3 right-3 h-0.5 rounded-full ${
                        isScrolled ? 'bg-amber-700' : 'bg-white shadow-md'
                      }`}
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Botón menú móvil */}
            <motion.button
              onClick={toggleMenu}
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-amber-50 border border-transparent hover:border-amber-200'
                  : 'text-white hover:bg-amber-700/60 bg-amber-700/40 border border-amber-600 shadow-lg'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className="md:hidden mt-4 bg-white/98 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-amber-100/50"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="py-2">
                  {navigationLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-6 py-4 font-medium transition-all duration-300 relative ${
                          isActiveRoute(link.path)
                            ? 'text-amber-700 bg-amber-50 border-r-4 border-amber-700'
                            : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50/50'
                        }`}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {isActiveRoute(link.path) && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-amber-50 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{ originX: 0 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;