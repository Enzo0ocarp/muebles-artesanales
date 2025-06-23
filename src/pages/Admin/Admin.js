/**
 * @fileoverview Panel de administración para gestión de contenido
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Upload, 
  X, 
  Save, 
  Trash2, 
  Edit, 
  Eye, 
  Plus,
  Image as ImageIcon,
  Mail,
  Users,
  Folder,
  LogOut,
  Key
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage, auth } from '../../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * Componente del panel de administración
 * Permite gestionar proyectos, imágenes y consultas de contacto
 * 
 * @component
 * @returns {JSX.Element} Panel de administración
 * 
 * @example
 * return (
 *   <Admin />
 * )
 */
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Hook para formulario de login
   */
  const { 
    register: registerLogin, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors } 
  } = useForm();

  /**
   * Hook para formulario de proyecto
   */
  const { 
    register: registerProject, 
    handleSubmit: handleProjectSubmit, 
    reset: resetProject, 
    setValue,
    formState: { errors: projectErrors } 
  } = useForm();

  /**
   * Categorías disponibles para proyectos
   * @type {Array<string>}
   * @constant
   */
  const categories = ['cocina', 'dormitorio', 'living', 'oficina', 'baño'];

  /**
   * Pestañas del panel de administración
   * @type {Array<Object>}
   * @constant
   */
  const tabs = [
    { id: 'projects', label: 'Proyectos', icon: Folder },
    { id: 'contacts', label: 'Consultas', icon: Mail },
    { id: 'stats', label: 'Estadísticas', icon: Users }
  ];

  /**
   * Verifica el estado de autenticación al cargar
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Carga datos cuando está autenticado
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadContacts();
    }
  }, [isAuthenticated]);

  /**
   * Maneja el login del administrador
   * @param {Object} data - Datos del formulario de login
   * @async
   * @function
   */
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el logout del administrador
   * @async
   * @function
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setActiveTab('projects');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  /**
   * Carga la lista de proyectos desde Firebase
   * @async
   * @function
   */
  const loadProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  /**
   * Carga la lista de consultas desde Firebase
   * @async
   * @function
   */
  const loadContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()));
    } catch (error) {
      console.error('Error al cargar consultas:', error);
    }
  };

  /**
   * Sube múltiples imágenes a Firebase Storage
   * @param {FileList} files - Archivos de imagen a subir
   * @returns {Promise<Array<string>>} URLs de las imágenes subidas
   * @async
   * @function
   */
  const uploadImages = async (files) => {
    const imageUrls = [];
    setUploadingImages(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      }
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      alert('Error al subir las imágenes');
    } finally {
      setUploadingImages(false);
    }

    return imageUrls;
  };

  /**
   * Maneja el envío del formulario de proyecto
   * @param {Object} data - Datos del formulario
   * @async
   * @function
   */
  const handleProjectSubmit = async (data) => {
    try {
      setLoading(true);
      
      let imageUrls = [];
      const files = data.images;
      
      if (files && files.length > 0) {
        imageUrls = await uploadImages(files);
      }

      const projectData = {
        title: data.title,
        category: data.category,
        description: data.description,
        client: data.client,
        date: data.date,
        materials: data.materials.split(',').map(m => m.trim()),
        images: editingProject ? [...(editingProject.images || []), ...imageUrls] : imageUrls,
        updatedAt: new Date()
      };

      if (editingProject) {
        // Actualizar proyecto existente
        await updateDoc(doc(db, 'projects', editingProject.id), projectData);
      } else {
        // Crear nuevo proyecto
        projectData.createdAt = new Date();
        await addDoc(collection(db, 'projects'), projectData);
      }

      await loadProjects();
      setShowProjectModal(false);
      setEditingProject(null);
      resetProject();
      
    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      alert('Error al guardar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Elimina un proyecto
   * @param {string} projectId - ID del proyecto a eliminar
   * @async
   * @function
   */
  const deleteProject = async (projectId) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return;

    try {
      await deleteDoc(doc(db, 'projects', projectId));
      await loadProjects();
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      alert('Error al eliminar el proyecto');
    }
  };

  /**
   * Abre el modal para editar un proyecto
   * @param {Object} project - Proyecto a editar
   * @function
   */
  const editProject = (project) => {
    setEditingProject(project);
    setValue('title', project.title);
    setValue('category', project.category);
    setValue('description', project.description);
    setValue('client', project.client);
    setValue('date', project.date);
    setValue('materials', project.materials.join(', '));
    setShowProjectModal(true);
  };

  /**
   * Elimina una consulta de contacto
   * @param {string} contactId - ID de la consulta
   * @async
   * @function
   */
  const deleteContact = async (contactId) => {
    if (!window.confirm('¿Eliminar esta consulta?')) return;

    try {
      await deleteDoc(doc(db, 'contacts', contactId));
      await loadContacts();
    } catch (error) {
      console.error('Error al eliminar consulta:', error);
    }
  };

  // Pantalla de login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center bg-amber-700 rounded-full">
              <Key className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Panel de Administración
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Acceso restringido para administradores
            </p>
          </div>
          
          <form onSubmit={handleLoginSubmit(handleLogin)} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                {...registerLogin('email', { required: 'Email requerido' })}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Email"
              />
              {loginErrors.email && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                type="password"
                {...registerLogin('password', { required: 'Contraseña requerida' })}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Contraseña"
              />
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Header del Admin */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 font-heading">
              Panel de Administración
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navegación de pestañas */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido de las pestañas */}
      <div className="container mx-auto px-4 py-8">
        {/* Pestaña de Proyectos */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Gestión de Proyectos
              </h2>
              <button
                onClick={() => setShowProjectModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Nuevo Proyecto</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-200 relative">
                    {project.images && project.images[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {project.images?.length || 0} imágenes
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <Folder size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No hay proyectos cargados</p>
              </div>
            )}
          </div>
        )}

        {/* Pestaña de Consultas */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Consultas de Contacto ({contacts.length})
            </h2>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  className="bg-white rounded-lg shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                        <span className="text-sm text-gray-500">
                          {contact.timestamp?.toDate().toLocaleDateString()}
                        </span>
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          {contact.projectType}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Email: {contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-gray-600">Teléfono: {contact.phone}</p>
                          )}
                          {contact.budget && (
                            <p className="text-sm text-gray-600">Presupuesto: {contact.budget}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{contact.message}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Eliminar consulta"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {contacts.length === 0 && (
              <div className="text-center py-12">
                <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No hay consultas recibidas</p>
              </div>
            )}
          </div>
        )}

        {/* Pestaña de Estadísticas */}
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Estadísticas del Sitio
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Folder size={32} className="mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-gray-800">{projects.length}</div>
                <div className="text-gray-600">Proyectos</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Mail size={32} className="mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-800">{contacts.length}</div>
                <div className="text-gray-600">Consultas</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <ImageIcon size={32} className="mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {projects.reduce((total, p) => total + (p.images?.length || 0), 0)}
                </div>
                <div className="text-gray-600">Imágenes</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Users size={32} className="mx-auto text-orange-600 mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {new Set(contacts.map(c => c.email)).size}
                </div>
                <div className="text-gray-600">Clientes Únicos</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Proyecto */}
      <AnimatePresence>
        {showProjectModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowProjectModal(false);
              setEditingProject(null);
              resetProject();
            }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h2>
                <button
                  onClick={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                    resetProject();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit(handleProjectSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Proyecto *
                  </label>
                  <input
                    type="text"
                    {...registerProject('title', { required: 'Título requerido' })}
                    className="form-input"
                    placeholder="Ej: Cocina Integral Moderna"
                  />
                  {projectErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{projectErrors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    {...registerProject('category', { required: 'Categoría requerida' })}
                    className="form-input"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {projectErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{projectErrors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente *
                  </label>
                  <input
                    type="text"
                    {...registerProject('client', { required: 'Cliente requerido' })}
                    className="form-input"
                    placeholder="Nombre del cliente"
                  />
                  {projectErrors.client && (
                    <p className="text-red-500 text-sm mt-1">{projectErrors.client.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    {...registerProject('date', { required: 'Fecha requerida' })}
                    className="form-input"
                  />
                  {projectErrors.date && (
                    <p className="text-red-500 text-sm mt-1">{projectErrors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materiales (separados por coma) *
                  </label>
                  <input
                    type="text"
                    {...registerProject('materials', { required: 'Materiales requeridos' })}
                    className="form-input"
                    placeholder="Ej: MDF, Granito, Acero inoxidable"
                  />
                  {projectErrors.materials && (
                    <p className="text-red-500 text-sm mt-1">{projectErrors.materials.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imágenes {!editingProject && '*'}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...registerProject('images', { 
                      required: !editingProject ? 'Al menos una imagen requerida' : false 
                    })}
                    className="form-input"
                  />
                  {projectErrors.images && (
                    <p className="text-red-500 text-sm mt-1">{projectErrors.images.message}</p>
                  )}
                  {editingProject && editingProject.images && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Imágenes actuales: {editingProject.images.length}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectModal(false);
                      setEditingProject(null);
                      resetProject();
                    }}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploadingImages}
                    className="btn-primary flex items-center space-x-2"
                  >
                    {loading || uploadingImages ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>
                          {uploadingImages ? 'Subiendo imágenes...' : 'Guardando...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>{editingProject ? 'Actualizar' : 'Guardar'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;