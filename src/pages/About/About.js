/**
 * @fileoverview Página sobre nosotros con historia y valores de la empresa
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Award, 
  Users, 
  Leaf, 
  Clock, 
  Star,
  Hammer,
  Shield,
  Target
} from 'lucide-react';

/**
 * Componente de la página "Sobre Nosotros"
 * Cuenta la historia, valores y filosofía de la empresa
 * 
 * @component
 * @returns {JSX.Element} Página sobre nosotros
 * 
 * @example
 * return (
 *   <About />
 * )
 */
const About = () => {
  /**
   * Valores principales de la empresa
   * @type {Array<Object>}
   * @constant
   */
  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Cada mueble es creado con amor y dedicación, poniendo el corazón en cada detalle.',
      color: 'text-red-500'
    },
    {
      icon: Award,
      title: 'Calidad',
      description: 'Utilizamos los mejores materiales y técnicas para garantizar durabilidad y belleza.',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: 'Servicio',
      description: 'Trabajamos de la mano con nuestros clientes para hacer realidad sus sueños.',
      color: 'text-blue-500'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidad',
      description: 'Comprometidos con el medio ambiente, usamos maderas certificadas y procesos responsables.',
      color: 'text-green-500'
    }
  ];

  /**
   * Logros y estadísticas de la empresa
   * @type {Array<Object>}
   * @constant
   */
  const achievements = [
    {
      icon: Clock,
      number: '15+',
      label: 'Años de Experiencia',
      description: 'Perfeccionando nuestro arte desde 2009'
    },
    {
      icon: Users,
      number: '200+',
      label: 'Clientes Satisfechos',
      description: 'Familias que confían en nuestro trabajo'
    },
    {
      icon: Hammer,
      number: '500+',
      label: 'Proyectos Completados',
      description: 'Muebles únicos entregados con éxito'
    },
    {
      icon: Star,
      number: '4.9/5',
      label: 'Puntuación Promedio',
      description: 'Calificación de nuestros clientes'
    }
  ];

  /**
   * Procesos de trabajo
   * @type {Array<Object>}
   * @constant
   */
  const process = [
    {
      step: 1,
      title: 'Consulta Inicial',
      description: 'Escuchamos tus ideas y necesidades. Analizamos el espacio y definimos el proyecto.',
      icon: Users
    },
    {
      step: 2,
      title: 'Diseño y Presupuesto',
      description: 'Creamos el diseño personalizado y te presentamos un presupuesto detallado.',
      icon: Target
    },
    {
      step: 3,
      title: 'Fabricación',
      description: 'Nuestros artesanos trabajan con precisión usando las mejores técnicas y materiales.',
      icon: Hammer
    },
    {
      step: 4,
      title: 'Entrega e Instalación',
      description: 'Instalamos tu mueble con cuidado y te enseñamos su mantenimiento.',
      icon: Shield
    }
  ];

  /**
   * Variantes de animación
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
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-wood text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Nuestra Historia
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 leading-relaxed">
              Desde 2009 transformamos espacios con muebles únicos, 
              combinando tradición artesanal con diseño contemporáneo.
            </p>
          </motion.div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 opacity-20">
          <Hammer size={100} className="text-amber-300" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Heart size={80} className="text-amber-300" />
        </div>
      </section>

      {/* Historia Principal */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-heading">
                Todo comenzó con una pasión
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Mi papá comenzó este emprendimiento en su garage, con herramientas básicas 
                  y un sueño: crear muebles que no solo fueran funcionales, sino que contaran 
                  la historia de cada familia.
                </p>
                <p>
                  Lo que empezó como un hobby de fin de semana se convirtió en su verdadera 
                  vocación. Cada proyecto era una oportunidad de aprender algo nuevo, de 
                  perfeccionar una técnica, de hacer feliz a una familia más.
                </p>
                <p>
                  Hoy, 15 años después, seguimos con la misma filosofía: cada mueble es único, 
                  cada cliente es especial, y cada proyecto es una oportunidad de crear algo 
                  extraordinario que durará generaciones.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src="/images/workshop-1.jpg"
                    alt="Taller de carpintería"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood flex items-center justify-center">
                    <span className="text-white font-medium">Nuestro Taller</span>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src="/images/craftsman-1.jpg"
                    alt="Artesano trabajando"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood flex items-center justify-center">
                    <span className="text-white font-medium">Artesanía</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src="/images/materials-1.jpg"
                    alt="Materiales de calidad"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood flex items-center justify-center">
                    <span className="text-white font-medium">Materiales</span>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src="/images/finished-1.jpg"
                    alt="Mueble terminado"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood flex items-center justify-center">
                    <span className="text-white font-medium">Resultado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada proyecto que emprendemos
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${value.color}`}>
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Logros */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Nuestros Logros
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Números que reflejan nuestro compromiso con la excelencia
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
                  <achievement.icon size={40} className="text-amber-700" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {achievement.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Nuestro Proceso
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desde la primera consulta hasta la entrega final, cada paso está cuidadosamente planificado
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-6 md:p-8"
                  variants={fadeInUp}
                >
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center">
                        <step.icon size={32} className="text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{step.step}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sus palabras son nuestro mejor respaldo
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "María González",
                project: "Cocina Integral",
                quote: "Superaron todas mis expectativas. La atención al detalle es increíble y el resultado final es exactamente lo que soñaba para mi hogar.",
                rating: 5
              },
              {
                name: "Carlos Rodríguez",
                project: "Oficina Completa",
                quote: "Profesionales de primera. Cumplieron con los tiempos prometidos y la calidad es excepcional. Sin dudas los recomiendo.",
                rating: 5
              },
              {
                name: "Ana Martínez",
                project: "Placard Familiar",
                quote: "Desde el primer momento se notó su experiencia. Nos asesoraron perfectamente y el resultado aprovecha cada centímetro del espacio.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6"
                variants={fadeInUp}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.project}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-wood text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 font-heading">
              ¿Querés ser parte de nuestra historia?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Contanos tu proyecto y hagamos juntos el mueble perfecto para tu hogar. 
              Cada cliente se convierte en parte de nuestra gran familia.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="/contacto"
                className="bg-white text-amber-800 hover:bg-amber-50 font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Comenzar mi Proyecto
              </a>
              <a
                href="/galeria"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-800 font-medium py-4 px-8 rounded-lg transition-all duration-300"
              >
                Ver Nuestros Trabajos
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;