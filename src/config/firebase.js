/**
 * @fileoverview Configuración de Firebase para la aplicación Muebles Beltrán
 * @author Muebles Beltrán
 * @version 1.0.0
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

/**
 * Configuración de Firebase utilizando variables de entorno
 * Las variables están definidas en el archivo .env
 * @type {Object}
 * @constant
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

/**
 * Verifica que todas las variables de entorno estén configuradas
 * @function
 * @throws {Error} Si alguna variable de entorno está faltando
 */
const validateConfig = () => {
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Faltan las siguientes variables de entorno: ${missingVars.join(', ')}\n` +
      'Verificá que el archivo .env esté configurado correctamente.'
    );
  }
};

// Validar configuración antes de inicializar
validateConfig();

/**
 * Inicializa la aplicación de Firebase
 * @type {FirebaseApp}
 * @constant
 */
const app = initializeApp(firebaseConfig);

/**
 * Instancia de Firestore Database para almacenar datos
 * @type {Firestore}
 * @constant
 */
export const db = getFirestore(app);

/**
 * Instancia de Firebase Storage para almacenar imágenes
 * @type {FirebaseStorage}
 * @constant
 */
export const storage = getStorage(app);

/**
 * Instancia de Firebase Auth para autenticación de administradores
 * @type {Auth}
 * @constant
 */
export const auth = getAuth(app);

/**
 * Instancia de Firebase Analytics (opcional)
 * Solo se inicializa en producción
 * @type {Analytics|null}
 * @constant
 */
export const analytics = process.env.NODE_ENV === 'production' ? getAnalytics(app) : null;

/**
 * Configuración de la aplicación obtenida de variables de entorno
 * @type {Object}
 * @constant
 */
export const appConfig = {
  whatsappNumber: process.env.REACT_APP_WHATSAPP_NUMBER || '5492994123456',
  businessEmail: process.env.REACT_APP_BUSINESS_EMAIL || 'info@mueblesbeltran.com',
  businessPhone: process.env.REACT_APP_BUSINESS_PHONE || '+54 299 412-3456'
};

/**
 * Información del proyecto Firebase
 * @type {Object}
 * @constant
 */
export const firebaseInfo = {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};

// Log de inicialización (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  console.log('🔥 Firebase inicializado correctamente');
  console.log('📊 Analytics:', analytics ? 'Habilitado' : 'Deshabilitado');
  console.log('🏪 Proyecto:', firebaseInfo.projectId);
}

export default app;