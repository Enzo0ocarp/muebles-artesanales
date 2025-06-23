/**
 * @fileoverview Botón flotante de WhatsApp para contacto directo
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente de botón flotante de WhatsApp
 * Permite contacto directo con el dueño del negocio
 * 
 * @component
 * @returns {JSX.Element} Botón flotante de WhatsApp
 * 
 * @example
 * return (
 *   <WhatsAppButton />
 * )
 */
const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * Número de WhatsApp (reemplazar con el número real)
   * Formato internacional sin + ni espacios
   * @type {string}
   * @constant
   */
  const WHATSAPP_NUMBER = "5492994123456"; // Reemplazar con número real

  /**
   * Mensaje predeterminado para WhatsApp
   * @type {string}
   * @constant
   */
  const DEFAULT_MESSAGE = "Hola! Me interesa conocer más sobre sus muebles artesanales.";

  /**
   * Controla la visibilidad del botón basada en el scroll
   */
  useEffect(() => {
    /**
     * Maneja la visibilidad del botón según la posición del scroll
     * @function
     */
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Muestra el tooltip después de 3 segundos si el botón es visible
   */
  useEffect(() => {
    let tooltipTimer;
    
    if (isVisible) {
      tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Auto-ocultar tooltip después de 5 segundos
        setTimeout(() => setShowTooltip(false), 5000);
      }, 3000);
    }

    return () => {
      if (tooltipTimer) clearTimeout(tooltipTimer);
    };
  }, [isVisible]);

  /**
   * Abre WhatsApp con mensaje predeterminado
   * @function
   */
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * Cierra el tooltip manualmente
   * @function
   */
  const closeTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-16 right-0 mb-2"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs relative">
                  <button
                    onClick={closeTooltip}
                    className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors duration-200"
                    aria-label="Cerrar mensaje"
                  >
                    <X size={12} className="text-gray-600" />
                  </button>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-green-100 p-1 rounded-full flex-shrink-0">
                      <MessageCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        ¡Consultá sin compromiso!
                      </p>
                      <p className="text-xs text-gray-600">
                        Hacé click para contactarnos por WhatsApp
                      </p>
                    </div>
                  </div>
                  
                  {/* Flecha del tooltip */}
                  <div className="absolute bottom-0 right-4 transform translate-y-full">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <motion.button
            onClick={openWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Contactar por WhatsApp"
          >
            {/* Animación de pulso */}
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
            
            <MessageCircle 
              size={28} 
              className="relative z-10 group-hover:rotate-12 transition-transform duration-300" 
            />
          </motion.button>

          {/* Efecto de ondas */}
          <motion.div
            className="absolute inset-0 bg-green-400 rounded-full opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;