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
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
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

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              className="bg-amber-700 p-2 rounded-lg group-hover:bg-amber-800 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Hammer className="h-6 w-6 text-white" />
            </motion.div>
            <div className="font-heading">
              <h1 className="text-xl font-bold text-amber-900">
                Muebles Beltran
              </h1>
              <p className="text-sm text-amber-700 -mt-1">
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
                className={`font-medium transition-all duration-300 hover:text-amber-700 relative ${
                  isActiveRoute(link.path)
                    ? 'text-amber-700'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                {link.label}
                {isActiveRoute(link.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-700"
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
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
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
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-2">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 font-medium transition-colors duration-300 hover:bg-amber-50 ${
                        isActiveRoute(link.path)
                          ? 'text-amber-700 bg-amber-50 border-r-2 border-amber-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;