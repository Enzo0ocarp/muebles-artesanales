/**
 * @fileoverview Configuración de Firebase para la aplicación
 * @author Muebles Artesanales
 * @version 1.0.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

/**
 * Configuración de Firebase - Reemplazar con tus credenciales reales
 * @type {Object}
 * @constant
 */
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

/**
 * Inicializa la aplicación de Firebase
 * @type {FirebaseApp}
 * @constant
 */
const app = initializeApp(firebaseConfig);

/**
 * Instancia de Firestore Database
 * @type {Firestore}
 * @constant
 */
export const db = getFirestore(app);

/**
 * Instancia de Firebase Storage
 * @type {FirebaseStorage}
 * @constant
 */
export const storage = getStorage(app);

/**
 * Instancia de Firebase Auth
 * @type {Auth}
 * @constant
 */
export const auth = getAuth(app);

export default app;