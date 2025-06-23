/**
 * @fileoverview Página de contacto con formulario y información
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Facebook,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Componente de la página de contacto
 * Incluye formulario de contacto, información de la empresa y mapa
 * 
 * @component
 * @returns {JSX.Element} Página de contacto
 * 
 * @example
 * return (
 *   <Contact />
 * )
 */
const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Hook de react-hook-form para manejo del formulario
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  /**
   * Información de contacto de la empresa
   * @type {Array<Object>}
   * @constant
   */
  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['+54 299 412-3456', 'Whatsapp disponible'],
      action: () => window.open('https://wa.me/5492994123456', '_blank'),
      actionLabel: 'Enviar WhatsApp'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@mueblesartesanales.com', 'Respuesta en 24hs'],
      action: () => window.open('mailto:info@mueblesartesanales.com'),
      actionLabel: 'Enviar Email'
    },
    {
      icon: MapPin,
      title: 'Dirección',
      details: ['Neuquén Capital', 'Argentina'],
      action: null,
      actionLabel: null
    },
    {
      icon: Clock,
      title: 'Horarios',
      details: ['Lun - Vie: 8:00 - 18:00', 'Sab: 9:00 - 13:00'],
      action: null,
      actionLabel: null
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
      name: 'Facebook',
      url: 'https://facebook.com',
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://instagram.com',
      color: 'text-pink-600 hover:text-pink-700'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      url: 'https://wa.me/5492994123456',
      color: 'text-green-600 hover:text-green-700'
    }
  ];

  /**
   * Maneja el envío del formulario
   * @param {Object} data - Datos del formulario
   * @async
   * @function
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Agregar timestamp y datos adicionales
      const formData = {
        ...data,
        timestamp: new Date(),
        status: 'nuevo',
        source: 'web'
      };

      // Intentar guardar en Firebase
      await addDoc(collection(db, 'contacts'), formData);
      
      setSubmitStatus({
        type: 'success',
        message: '¡Mensaje enviado correctamente! Te contactaremos pronto.'
      });
      
      reset(); // Limpiar formulario
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error al enviar el mensaje. Por favor, intentá de nuevo o contactanos por WhatsApp.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Variantes de animación para elementos
   * @type {Object}
   */
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-wood text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Contactanos
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Estamos listos para hacer realidad tu proyecto. 
              Contanos tu idea y te ayudamos a diseñar la solución perfecta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario de Contacto */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-heading">
                Solicitar Presupuesto
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { 
                      required: 'El nombre es obligatorio',
                      minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                    })}
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Ingresá un email válido'
                      }
                    })}
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="form-input"
                    placeholder="+54 299 123-4567"
                  />
                </div>

                {/* Tipo de Proyecto */}
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Proyecto *
                  </label>
                  <select
                    id="projectType"
                    {...register('projectType', { required: 'Seleccioná el tipo de proyecto' })}
                    className={`form-input ${errors.projectType ? 'border-red-500' : ''}`}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="cocina">Cocina (Bajomesada, Alacena)</option>
                    <option value="dormitorio">Dormitorio (Placard, Cómoda)</option>
                    <option value="living">Living (Biblioteca, Mesa)</option>
                    <option value="oficina">Oficina (Escritorio, Estantería)</option>
                    <option value="baño">Baño (Vanitory, Botiquín)</option>
                    <option value="otro">Otro (especificar en mensaje)</option>
                  </select>
                  {errors.projectType && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                  )}
                </div>

                {/* Presupuesto Aproximado */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Presupuesto Aproximado
                  </label>
                  <select
                    id="budget"
                    {...register('budget')}
                    className="form-input"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="hasta-100k">Hasta $100.000</option>
                    <option value="100k-300k">$100.000 - $300.000</option>
                    <option value="300k-500k">$300.000 - $500.000</option>
                    <option value="500k-mas">Más de $500.000</option>
                    <option value="consultar">Preferiero consultar</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    {...register('message', { 
                      required: 'El mensaje es obligatorio',
                      minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
                    })}
                    className={`form-textarea ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Contanos sobre tu proyecto: medidas aproximadas, estilo preferido, materiales, etc."
                    rows={5}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Mensaje de estado */}
                {submitStatus && (
                  <motion.div
                    className={`p-4 rounded-lg flex items-center space-x-2 ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{submitStatus.message}</span>
                  </motion.div>
                )}

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </form>

              {/* Nota de privacidad */}
              <p className="text-sm text-gray-500 mt-4">
                * Campos obligatorios. Tus datos son confidenciales y solo los usamos para contactarte sobre tu proyecto.
              </p>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Cards de contacto */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 text-center"
                    variants={fadeInUp}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                      <info.icon className="text-amber-700" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {info.action && (
                      <button
                        onClick={info.action}
                        className="text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors"
                      >
                        {info.actionLabel}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Redes Sociales */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Síguenos en Redes
                </h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} transition-colors transform hover:scale-110`}
                      aria-label={social.name}
                    >
                      <social.icon size={32} />
                    </a>
                  ))}
                </div>
                <p className="text-center text-gray-600 text-sm mt-4">
                  Seguinos para ver nuestros trabajos más recientes y tips de decoración
                </p>
              </motion.div>

              {/* Mapa */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                variants={fadeInUp}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Nuestra Ubicación
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Estamos ubicados en Neuquén Capital. Trabajamos en toda la región patagónica.
                  </p>
                </div>
                
                {/* Placeholder para mapa */}
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p className="font-medium">Mapa Interactivo</p>
                    <p className="text-sm">Neuquén, Argentina</p>
                  </div>
                </div>
              </motion.div>

              {/* Horarios Destacados */}
              <motion.div
                className="bg-amber-50 rounded-xl border border-amber-200 p-6"
                variants={fadeInUp}
              >
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  💡 ¿Sabías que...?
                </h3>
                <ul className="space-y-2 text-amber-700 text-sm">
                  <li>• Ofrecemos presupuesto gratuito sin compromiso</li>
                  <li>• Trabajamos con garantía de 2 años en todos nuestros muebles</li>
                  <li>• Utilizamos solo maderas certificadas y herrajes de calidad</li>
                  <li>• Tiempo de entrega promedio: 3-4 semanas</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-heading">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Respuestas a las consultas más comunes
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  question: "¿Cuánto tiempo demora un proyecto?",
                  answer: "El tiempo de ejecución depende de la complejidad del proyecto. En promedio, una cocina completa demora 3-4 semanas, mientras que muebles más simples pueden estar listos en 1-2 semanas."
                },
                {
                  question: "¿Trabajan con diseños personalizados?",
                  answer: "¡Por supuesto! Cada proyecto es único. Trabajamos contigo desde el diseño inicial hasta la instalación final, adaptándonos a tus necesidades específicas y al espacio disponible."
                },
                {
                  question: "¿Qué tipos de madera utilizan?",
                  answer: "Trabajamos con una amplia variedad de materiales: MDF, melamina, madera maciza (roble, paraíso, nogal), y materiales especiales según el proyecto. Te asesoramos sobre la mejor opción para tu presupuesto y necesidades."
                },
                {
                  question: "¿Incluyen la instalación?",
                  answer: "Sí, todos nuestros proyectos incluyen la instalación profesional. Nuestro equipo se encarga del armado y colocación, dejando todo perfectamente terminado y funcional."
                },
                {
                  question: "¿Ofrecen garantía?",
                  answer: "Todos nuestros muebles tienen garantía de 2 años contra defectos de fabricación. Además, ofrecemos servicio de mantenimiento y reparaciones."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6"
                  variants={fadeInUp}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-wood text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-heading">
              ¿Preferís contacto directo?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Llamanos o envianos un WhatsApp para una respuesta inmediata
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+5492994123456"
                className="bg-white text-amber-800 hover:bg-amber-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>+54 299 412-3456</span>
              </a>
              <a
                href="https://wa.me/5492994123456?text=Hola! Me interesa solicitar un presupuesto para un mueble"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;