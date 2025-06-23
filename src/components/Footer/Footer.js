/**
 * @fileoverview Componente Footer con información de contacto y redes
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Componente Footer que contiene información de contacto y enlaces
 * Incluye datos de la empresa, horarios y redes sociales
 * 
 * @component
 * @returns {JSX.Element} Footer de la aplicación
 * 
 * @example
 * return (
 *   <Footer />
 * )
 */
const Footer = () => {
  /**
   * Año actual para el copyright
   * @type {number}
   */
  const currentYear = new Date().getFullYear();

  /**
   * Enlaces rápidos del footer
   * @type {Array<Object>}
   * @constant
   */
  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/galeria', label: 'Galería' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/contacto', label: 'Contacto' }
  ];

  /**
   * Información de contacto
   * @type {Array<Object>}
   * @constant
   */
  const contactInfo = [
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+54 299 412-3456',
      href: 'tel:+5492994123456'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@mueblesartesanales.com',
      href: 'mailto:info@mueblesartesanales.com'
    },
    {
      icon: MapPin,
      label: 'Dirección',
      value: 'Neuquén, Argentina',
      href: '#'
    },
    {
      icon: Clock,
      label: 'Horarios',
      value: 'Lun - Vie: 8:00 - 18:00',
      href: '#'
    }
  ];

  /**
   * Enlaces de redes sociales
   * @type {Array<Object>}
   * @constant
   */
  const socialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://facebook.com',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com',
      color: 'hover:text-pink-600'
    }
  ];

  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-amber-700 p-2 rounded-lg">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <div className="font-heading">
                <h3 className="text-xl font-bold">Muebles Artesanales</h3>
                <p className="text-amber-200 text-sm">Carpintería de calidad</p>
              </div>
            </div>
            <p className="text-amber-200 text-sm leading-relaxed">
              Creamos muebles únicos y personalizados con la mejor calidad 
              y atención al detalle. Cada pieza es una obra de arte funcional.
            </p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 font-heading">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-amber-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 font-heading">
              Contacto
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <item.icon size={16} className="text-amber-300 mt-1 flex-shrink-0" />
                  <div>
                    {item.href !== '#' ? (
                      <a
                        href={item.href}
                        className="text-amber-200 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-amber-200 text-sm">
                        {item.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 font-heading">
              Síguenos
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-amber-200 ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-2">Newsletter</h5>
              <p className="text-amber-200 text-xs mb-3">
                Recibí noticias sobre nuevos productos
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="bg-amber-800 text-white placeholder-amber-300 px-3 py-2 rounded-l-lg text-sm flex-1 focus:outline-none focus:bg-amber-700"
                />
                <button className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-r-lg transition-colors duration-300 text-sm">
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Línea divisoria y copyright */}
        <motion.div
          className="border-t border-amber-800 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-200 text-sm">
            © {currentYear} Muebles Artesanales. Todos los derechos reservados.
          </p>
          <p className="text-amber-300 text-xs mt-1">
            Desarrollado con ❤️ en Neuquén, Argentina
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;