/**
 * @fileoverview Botón flotante de WhatsApp
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { appConfig } from '../../config/firebase';

/**
 * Componente de botón flotante de WhatsApp
 * Permite a los usuarios contactar directamente por WhatsApp
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
  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * Abre WhatsApp con mensaje predefinido
   * @function
   */
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      '¡Hola! Me interesa conocer más sobre sus muebles artesanales. ¿Podrían brindarme información?'
    );
    const whatsappUrl = `https://wa.me/${appConfig.whatsappNumber}?text=${message}`;
    
    // Abrir en nueva ventana
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={openWhatsApp}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 whitespace-nowrap"
            >
              <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm relative">
                ¡Consultanos por WhatsApp!
                <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Animación de pulso cuando no hay hover */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-green-400 p-4 rounded-full">
          <MessageCircle size={24} className="opacity-0" />
        </div>
      </motion.div>
    </>
  );
};

export default WhatsAppButton;