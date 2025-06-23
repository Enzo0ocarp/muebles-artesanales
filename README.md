# 🪑 Muebles Artesanales - Sitio Web

Una aplicación web moderna desarrollada en React para mostrar trabajos de carpintería artesanal, permitir consultas de clientes y gestionar contenido a través de un panel de administración.

## 🎯 Características Principales

- **Galería Interactiva**: Visualización de proyectos organizados por categorías
- **Sistema de Contacto**: Formulario de consultas con validación y almacenamiento en Firebase
- **Panel de Administración**: Gestión completa de proyectos e imágenes
- **Botón WhatsApp Flotante**: Contacto directo con el propietario
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Animaciones Fluidas**: Experiencia de usuario mejorada con Framer Motion

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca principal de JavaScript
- **React Router Dom 6.8.1** - Navegación entre páginas
- **Framer Motion 10.0.1** - Animaciones y transiciones
- **React Hook Form 7.43.1** - Manejo de formularios
- **Tailwind CSS 3.2.7** - Framework de estilos
- **Lucide React 0.263.1** - Iconografía

### Backend y Base de Datos
- **Firebase 10.7.1** - Backend as a Service
  - Firestore - Base de datos NoSQL
  - Storage - Almacenamiento de imágenes
  - Authentication - Autenticación de administradores

### Herramientas de Desarrollo
- **JSDoc 4.0.2** - Documentación automática
- **PostCSS 8.4.21** - Procesamiento de CSS
- **Autoprefixer 10.4.14** - Compatibilidad CSS

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Header/          # Navegación principal
│   ├── Footer/          # Pie de página
│   └── WhatsAppButton/  # Botón flotante de contacto
├── pages/               # Páginas principales
│   ├── Home/           # Página de inicio
│   ├── Gallery/        # Galería de proyectos
│   ├── Contact/        # Formulario de contacto
│   ├── About/          # Sobre nosotros
│   └── Admin/          # Panel de administración
├── config/             # Configuraciones
│   └── firebase.js     # Configuración de Firebase
├── App.js              # Componente principal
├── App.css             # Estilos globales
└── index.js            # Punto de entrada
```

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/muebles-artesanales.git
cd muebles-artesanales
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Firebase
1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database
3. Habilitar Firebase Storage
4. Habilitar Authentication (Email/Password)
5. Actualizar `src/config/firebase.js` con tus credenciales:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 4. Configurar Variables de Entorno (Opcional)
Crear archivo `.env` en la raíz del proyecto:
```env
REACT_APP_FIREBASE_API_KEY=tu-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu-proyecto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=tu-app-id
```

### 5. Configurar Autenticación de Administrador
1. En Firebase Console, ir a Authentication
2. Crear un usuario administrador
3. Usar estas credenciales para acceder al panel de administración

## 🔧 Scripts Disponibles

### Desarrollo
```bash
npm start
# Ejecuta la aplicación en modo desarrollo
# Abre http://localhost:3000 en el navegador
```

### Construcción
```bash
npm run build
# Construye la aplicación para producción en la carpeta build/
```

### Documentación
```bash
npm run docs
# Genera documentación JSDoc en la carpeta docs/
```

### Testing
```bash
npm test
# Ejecuta las pruebas en modo interactivo
```

## 📖 Generar Documentación JSDoc

La documentación se genera automáticamente a partir de los comentarios JSDoc en el código:

```bash
npm run docs
```

Esto creará una carpeta `docs/` con la documentación HTML completa del proyecto.

### Visualizar Documentación
1. Ejecutar `npm run docs`
2. Abrir `docs/index.html` en un navegador
3. Navegar por la documentación de componentes y funciones

## 🎨 Personalización

### Colores y Estilos
Los colores principales se pueden modificar en:
- `src/App.css` - Variables CSS personalizadas
- `tailwind.config.js` - Configuración de Tailwind

### Información de Contacto
Actualizar en:
- `src/components/WhatsAppButton/WhatsAppButton.js` - Número de WhatsApp
- `src/components/Footer/Footer.js` - Información de contacto
- `src/pages/Contact/Contact.js` - Datos de la empresa

## 📱 Funcionalidades Principales

### Para Visitantes
- **Explorar Galería**: Ver proyectos filtrados por categoría
- **Solicitar Presupuesto**: Formulario de contacto completo
- **Contacto Directo**: Botón flotante de WhatsApp
- **Información Empresarial**: Historia, valores y proceso de trabajo

### Para Administradores
- **Gestión de Proyectos**: Crear, editar y eliminar proyectos
- **Subida de Imágenes**: Sistema de carga múltiple a Firebase Storage
- **Gestión de Consultas**: Ver y administrar formularios de contacto
- **Estadísticas**: Panel con métricas del sitio

## 🔒 Seguridad

- Autenticación Firebase para acceso administrativo
- Validación de formularios del lado cliente y servidor
- Reglas de seguridad en Firestore Database
- Sanitización de datos de entrada

## 📊 Rendimiento

- Lazy loading de imágenes
- Optimización de animaciones
- Compresión automática de assets
- Caching de recursos estáticos

## 🌐 SEO y Accesibilidad

- Meta tags optimizados
- Estructura semántica HTML5
- Alt text en todas las imágenes
- Navegación por teclado
- Contraste de colores adecuado

## 🚀 Despliegue

### Netlify (Recomendado)
1. Hacer build del proyecto: `npm run build`
2. Subir carpeta `build/` a Netlify
3. Configurar variables de entorno de Firebase

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📝 Documentación JSDoc

Todo el código está documentado siguiendo el estándar JSDoc:

```javascript
/**
 * @fileoverview Descripción del archivo
 * @author Nombre del autor
 * @version 1.0.0
 */

/**
 * Descripción de la función
 * @param {string} parametro - Descripción del parámetro
 * @returns {Object} Descripción del retorno
 * @example
 * const resultado = miFuncion('valor');
 */
function miFuncion(parametro) {
  // implementación
}
```

## 📋 Checklist de Funcionalidades

### ✅ Completadas
- [x] Estructura básica de React
- [x] Sistema de navegación
- [x] Página de inicio con hero
- [x] Galería con filtros
- [x] Formulario de contacto
- [x] Panel de administración
- [x] Integración con Firebase
- [x] Botón flotante WhatsApp
- [x] Diseño responsive
- [x] Documentación JSDoc
- [x] Animaciones Framer Motion

### 🔄 En Desarrollo
- [ ] Sistema de notificaciones
- [ ] Optimización de imágenes
- [ ] PWA (Progressive Web App)
- [ ] Tests unitarios

### 📋 Futuras Mejoras
- [ ] Chat en vivo
- [ ] Sistema de reseñas
- [ ] Blog de proyectos
- [ ] Calculadora de presupuestos
- [ ] Múltiples idiomas

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:
- Email: info@mueblesartesanales.com
- WhatsApp: +54 299 412-3456

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ en Neuquén, Argentina**