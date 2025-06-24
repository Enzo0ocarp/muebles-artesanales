/**
 * @fileoverview Página de contacto con formulario funcional
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
  AlertCircle
} from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, appConfig } from '../../config/firebase';

/**
 * Componente de la página de contacto
 * Incluye formulario funcional que guarda en Firebase
 * 
 * @component
 * @returns {JSX.Element} Página de contacto
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  /**
   * Hook de formulario con React Hook Form
   */
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  /**
   * Opciones de tipo de proyecto
   * @type {Array<Object>}
   * @constant
   */
  const projectTypes = [
    { value: 'cocina', label: 'Cocina Integral' },
    { value: 'dormitorio', label: 'Dormitorio' },
    { value: 'living', label: 'Living/Comedor' },
    { value: 'oficina', label: 'Oficina/Estudio' },
    { value: 'baño', label: 'Muebles de Baño' },
    { value: 'otro', label: 'Otro proyecto' }
  ];

  /**
   * Opciones de presupuesto
   * @type {Array<Object>}
   * @constant
   */
  const budgetRanges = [
    { value: 'hasta-100k', label: 'Hasta $100.000' },
    { value: '100k-300k', label: '$100.000 - $300.000' },
    { value: '300k-500k', label: '$300.000 - $500.000' },
    { value: '500k-1m', label: '$500.000 - $1.000.000' },
    { value: 'mas-1m', label: 'Más de $1.000.000' },
    { value: 'consultar', label: 'Prefiero consultar' }
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
      // Preparar datos para Firebase
      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        projectType: data.projectType,
        budget: data.budget || null,
        message: data.message,
        timestamp: Timestamp.now(),
        status: 'nuevo'
      };

      // Guardar en Firebase
      await addDoc(collection(db, 'contacts'), contactData);

      // Éxito
      setSubmitStatus('success');
      reset(); // Limpiar formulario

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Error al enviar consulta:', error);
      setSubmitStatus('error');

      // Ocultar mensaje de error después de 5 segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Información de contacto
   * @type {Array<Object>}
   * @constant
   */
  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: appConfig.businessPhone,
      action: `tel:${appConfig.businessPhone.replace(/\s/g, '')}`
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'christianomarcontacto@gmail.com',
      action: `mailto:christianomarcontacto@gmail.com`
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Neuquén Capital, Argentina',
      action: null
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: 'Lun - Vie: 9:00 - 18:00\nSáb: 9:00 - 13:00',
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-heading mb-6">
            Contactanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tenés un proyecto en mente? Contanos sobre tu idea y te ayudamos a hacerla realidad 
            con nuestros muebles artesanales de calidad premium.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 font-heading mb-6">
              Envianos tu consulta
            </h2>

            {/* Mensaje de estado */}
            {submitStatus === 'success' && (
              <motion.div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-700">
                  ¡Gracias! Tu consulta fue enviada correctamente. Te contactaremos pronto.
                </span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="text-red-600" size={20} />
                <span className="text-red-700">
                  Hubo un error al enviar tu consulta. Por favor, intentá nuevamente.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'El nombre es requerido',
                    minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                  })}
                  className="form-input"
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className="form-input"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="form-input"
                  placeholder="+54 299 123-4567"
                />
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de proyecto *
                </label>
                <select
                  {...register('projectType', { required: 'Selecciona un tipo de proyecto' })}
                  className="form-input"
                >
                  <option value="">Selecciona una opción</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                )}
              </div>

              {/* Presupuesto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto estimado (opcional)
                </label>
                <select
                  {...register('budget')}
                  className="form-input"
                >
                  <option value="">Selecciona un rango</option>
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  {...register('message', { 
                    required: 'El mensaje es requerido',
                    minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
                  })}
                  className="form-textarea"
                  rows={4}
                  placeholder="Contanos sobre tu proyecto, medidas, materiales preferidos, etc."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Enviar Consulta</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <info.icon className="text-amber-700" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                    <div className="text-gray-600 whitespace-pre-line">
                      {info.action ? (
                        <a
                          href={info.action}
                          className="hover:text-amber-700 transition-colors duration-300"
                        >
                          {info.content}
                        </a>
                      ) : (
                        info.content
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Mapa placeholder */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 h-64"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-amber-700 mx-auto mb-2" />
                  <p className="text-gray-600">Neuquén Capital</p>
                  <p className="text-sm text-gray-500">Ubicación exacta por consulta</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;