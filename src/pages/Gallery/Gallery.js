/**
 * @fileoverview Página de galería con filtrado por categorías
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Eye, Heart } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Componente de la página de galería
 * Muestra trabajos filtrados por categoría con modal de vista detallada
 * 
 * @component
 * @returns {JSX.Element} Página de galería
 * 
 * @example
 * return (
 *   <Gallery />
 * )
 */
const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  /**
   * Categorías disponibles para filtrar
   * @type {Array<Object>}
   * @constant
   */
  const categories = [
    { id: 'todos', name: 'Todos', count: 0 },
    { id: 'cocina', name: 'Cocinas', count: 0 },
    { id: 'dormitorio', name: 'Dormitorios', count: 0 },
    { id: 'living', name: 'Living', count: 0 },
    { id: 'oficina', name: 'Oficinas', count: 0 },
    { id: 'baño', name: 'Baños', count: 0 }
  ];

  /**
   * Datos mock para desarrollo (reemplazar con datos de Firebase)
   * @type {Array<Object>}
   */
  const mockProjects = [
    {
      id: '1',
      title: 'Cocina Integral Moderna',
      category: 'cocina',
      description: 'Diseño moderno con isla central y electrodomésticos integrados',
      images: ['/images/cocina-1.jpg', '/images/cocina-1-2.jpg'],
      client: 'Familia Rodriguez',
      date: '2024-01-15',
      materials: ['Melamina', 'Granito', 'Acero inoxidable']
    },
    {
      id: '2',
      title: 'Placard Empotrado',
      category: 'dormitorio',
      description: 'Placard de tres cuerpos con espejos y cajones internos',
      images: ['/images/placard-1.jpg'],
      client: 'Juan Pérez',
      date: '2024-02-10',
      materials: ['MDF', 'Espejo', 'Herrajes alemanes']
    },
    {
      id: '3',
      title: 'Biblioteca de Roble',
      category: 'living',
      description: 'Biblioteca artesanal en madera de roble con detalles tallados',
      images: ['/images/biblioteca-1.jpg'],
      client: 'María González',
      date: '2024-01-28',
      materials: ['Roble macizo', 'Laca poliuretánica']
    },
    {
      id: '4',
      title: 'Escritorio Ejecutivo',
      category: 'oficina',
      description: 'Escritorio en L con cajoneras y espacio para computadora',
      images: ['/images/escritorio-1.jpg'],
      client: 'Estudio Jurídico López',
      date: '2024-03-05',
      materials: ['Nogal', 'Cuero', 'Herrajes bronce']
    },
    {
      id: '5',
      title: 'Mueble de Baño Flotante',
      category: 'baño',
      description: 'Vanitory suspendido con espejo y estantes laterales',
      images: ['/images/bano-1.jpg'],
      client: 'Apartamento Centro',
      date: '2024-02-20',
      materials: ['MDF hidrófugo', 'Mesada Silestone']
    },
    {
      id: '6',
      title: 'Mesa de Comedor Familiar',
      category: 'living',
      description: 'Mesa extensible para 8 personas en madera maciza',
      images: ['/images/mesa-1.jpg', '/images/mesa-1-2.jpg'],
      client: 'Familia Martínez',
      date: '2024-01-12',
      materials: ['Paraíso', 'Herrajes de extensión']
    }
  ];

  /**
   * Carga los proyectos desde Firebase o usa datos mock
   */
  useEffect(() => {
    /**
     * Obtiene proyectos desde Firestore
     * @async
     * @function
     */
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Si no hay datos en Firebase, usar datos mock
        if (projectsData.length === 0) {
          setProjects(mockProjects);
          setFilteredProjects(mockProjects);
        } else {
          setProjects(projectsData);
          setFilteredProjects(projectsData);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // En caso de error, usar datos mock
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /**
   * Filtra proyectos por categoría y término de búsqueda
   */
  useEffect(() => {
    let filtered = projects;

    // Filtrar por categoría
    if (activeCategory !== 'todos') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, activeCategory, searchTerm]);

  /**
   * Actualiza el conteo de proyectos por categoría
   */
  useEffect(() => {
    categories.forEach(category => {
      if (category.id === 'todos') {
        category.count = projects.length;
      } else {
        category.count = projects.filter(p => p.category === category.id).length;
      }
    });
  }, [projects]);

  /**
   * Cambia la categoría activa
   * @param {string} categoryId - ID de la categoría
   */
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  /**
   * Maneja el cambio en el término de búsqueda
   * @param {Event} e - Evento del input
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Abre el modal con los detalles del proyecto
   * @param {Object} project - Proyecto seleccionado
   */
  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  /**
   * Cierra el modal de detalles
   */
  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  /**
   * Alterna el estado de favorito de un proyecto
   * @param {string} projectId - ID del proyecto
   */
  const toggleFavorite = (projectId) => {
    setFavorites(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  /**
   * Variantes de animación para la grilla
   * @type {Object}
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Galería de Trabajos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explorá nuestros proyectos realizados y descubrí la calidad de nuestro trabajo artesanal
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-amber-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grilla de Proyectos */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="card overflow-hidden group cursor-pointer"
                variants={itemVariants}
                layout
                whileHover={{ y: -5 }}
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-wood hidden items-center justify-center absolute inset-0">
                    <span className="text-white font-medium text-lg">{project.title}</span>
                  </div>
                  
                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectModal(project);
                        }}
                        className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors duration-200"
                        aria-label="Ver detalles"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.id);
                        }}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          favorites.includes(project.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 hover:bg-white text-gray-800'
                        }`}
                        aria-label="Agregar a favoritos"
                      >
                        <Heart size={20} fill={favorites.includes(project.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Badge de categoría */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded-full">
                      {categories.find(cat => cat.id === project.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Cliente: {project.client}</span>
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay resultados */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-500">
              Intentá con otros términos de búsqueda o cambiá la categoría
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800 font-heading">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeProjectModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                {/* Galería de imágenes */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedProject.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${selectedProject.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-wood hidden items-center justify-center">
                        <span className="text-white font-medium">Imagen {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Información del proyecto */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Descripción
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedProject.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Materiales Utilizados
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedProject.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Detalles del Proyecto
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cliente:</span>
                        <span className="font-medium">{selectedProject.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fecha:</span>
                        <span className="font-medium">
                          {new Date(selectedProject.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoría:</span>
                        <span className="font-medium">
                          {categories.find(cat => cat.id === selectedProject.category)?.name}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="w-full btn-primary">
                        Solicitar Presupuesto Similar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;