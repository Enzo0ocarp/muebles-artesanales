/**
 * @fileoverview Página principal del sitio web
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Award, Clock } from 'lucide-react';

/**
 * Componente de la página principal
 * Incluye hero section, características destacadas y llamadas a la acción
 * 
 * @component
 * @returns {JSX.Element} Página de inicio
 * 
 * @example
 * return (
 *   <Home />
 * )
 */
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Imágenes para el hero carousel (placeholder URLs)
   * @type {Array<string>}
   * @constant
   */
  const heroImages = [
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.jpg'
  ];

  /**
   * Estadísticas de la empresa
   * @type {Array<Object>}
   * @constant
   */
  const stats = [
    {
      icon: Users,
      number: '200+',
      label: 'Clientes Satisfechos',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Años de Experiencia',
      color: 'text-green-600'
    },
    {
      icon: Star,
      number: '500+',
      label: 'Proyectos Completados',
      color: 'text-yellow-600'
    },
    {
      icon: Clock,
      number: '24h',
      label: 'Tiempo de Respuesta',
      color: 'text-purple-600'
    }
  ];

  /**
   * Características principales del servicio
   * @type {Array<Object>}
   * @constant
   */
  const features = [
    {
      title: 'Diseño Personalizado',
      description: 'Cada mueble es único y adaptado a tus necesidades específicas',
      image: '/images/feature-design.jpg'
    },
    {
      title: 'Materiales de Calidad',
      description: 'Utilizamos las mejores maderas y herrajes para garantizar durabilidad',
      image: '/images/feature-materials.jpg'
    },
    {
      title: 'Craftmanship Artesanal',
      description: 'Técnicas tradicionales combinadas con herramientas modernas',
      image: '/images/feature-craft.jpg'
    }
  ];

  /**
   * Categorías de muebles disponibles
   * @type {Array<Object>}
   * @constant
   */
  const categories = [
    {
      name: 'Cocinas',
      description: 'Bajomesadas y alacenas personalizadas',
      image: '/images/category-cocina.jpg',
      count: '50+ proyectos'
    },
    {
      name: 'Dormitorios',
      description: 'Placards y muebles para descanso',
      image: '/images/category-dormitorio.jpg',
      count: '80+ proyectos'
    },
    {
      name: 'Living',
      description: 'Muebles para sala de estar',
      image: '/images/category-living.jpg',
      count: '60+ proyectos'
    },
    {
      name: 'Oficina',
      description: 'Escritorios y bibliotecas',
      image: '/images/category-oficina.jpg',
      count: '40+ proyectos'
    }
  ];

  /**
   * Efecto para cambiar slides automáticamente
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0
              }}
              transition={{ duration: 1.5 }}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Muebles que cuentan
            <span className="text-amber-400"> tu historia</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Diseñamos y creamos muebles únicos que se adaptan perfectamente a tu hogar
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/galeria"
              className="btn-primary inline-flex items-center justify-center group"
            >
              Ver Galería
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contacto"
              className="btn-secondary inline-flex items-center justify-center"
            >
              Solicitar Presupuesto
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <stat.icon size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combinamos tradición artesanal con innovación para crear muebles excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 text-center card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood rounded-lg hidden items-center justify-center">
                    <span className="text-white font-medium">{feature.title}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
              Nuestras Especialidades
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creamos muebles para cada ambiente de tu hogar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="aspect-square bg-gray-200 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood hidden items-center justify-center absolute inset-0">
                    <span className="text-white font-medium text-lg">{category.name}</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/galeria"
              className="btn-primary inline-flex items-center group"
            >
              Ver Todos los Proyectos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
              ¿Tenés un proyecto en mente?
            </h2>
            <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
              Contactanos y convertiremos tu idea en realidad. 
              Presupuesto sin compromiso en 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="bg-white text-amber-800 hover:bg-amber-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Solicitar Presupuesto
              </Link>
              <a
                href="tel:+5492994123456"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-800 font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                Llamar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;