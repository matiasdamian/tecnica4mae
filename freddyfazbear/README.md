# 🍕 Freddy Fazbear's Pizzería - Sitio Web

Un sitio web completo de una pizzería temática inspirada en Five Nights at Freddy's, desarrollado completamente con HTML, CSS y JavaScript para funcionar en GitHub Pages.

## 🎯 Características

### ✨ Funcionalidades Principales
- **Sistema de Login/Registro** - Autenticación de usuarios con animación flip
- **Menú Interactivo** - Catálogo de productos con carrito de compras
- **Sistema de Delivery** - Pedidos a domicilio con selección de categorías
- **Tienda de Merchandising** - Productos temáticos con carrito
- **Sistema de Reservas** - Selección de mesas y pizzerías temáticas
- **Carrito Global** - Funcionalidad de compra en todas las páginas
- **Sistema de Pagos** - Simulación de pagos con tarjetas guardadas

### 🎨 Diseño
- **Tema Oscuro** - Estilo Five Nights at Freddy's
- **Responsive** - Adaptable a móviles y tablets
- **Animaciones** - Efectos visuales atractivos
- **Colores Temáticos** - Paleta de colores inspirada en FNAF

## 🚀 Instalación y Uso

### Para GitHub Pages:
1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch" y elige "main"
4. El sitio estará disponible en `https://tuusuario.github.io/nombre-del-repo`

### Para desarrollo local:
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! No necesitas servidor web

## 📁 Estructura del Proyecto

```
fazbear/
├── index.html              # Página principal
├── login.html              # Sistema de login/registro
├── menu.html               # Catálogo de comida
├── delivery.html           # Pedidos a domicilio
├── merch.html              # Tienda de merchandising
├── reservations.html       # Sistema de reservas
├── styles.css              # Estilos principales
├── login.css               # Estilos del login
├── script.js               # JavaScript principal
├── login-script.js         # JavaScript del login
└── README.md               # Este archivo
```

## 🎮 Funcionalidades Mockeadas

### Usuarios de Prueba:
- **Email:** demo@freddy.com | **Password:** 123456
- **Email:** admin@freddy.com | **Password:** admin123

### Características Simuladas:
- ✅ Login/Registro de usuarios
- ✅ Carrito de compras funcional
- ✅ Sistema de pagos con tarjetas
- ✅ Guardado de pedidos y compras
- ✅ Selección de mesas en reservas
- ✅ Gestión de sesiones
- ✅ Notificaciones de confirmación

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva
- **GitHub Pages** - Hosting gratuito

## 🎨 Personalización

### Cambiar Colores:
Edita las variables CSS en `styles.css`:
```css
:root {
  --c-bg: #0a0a0a;        /* Fondo principal */
  --c-card: #181818;      /* Fondo de tarjetas */
  --c-main: #ffcc00;      /* Color principal */
  --c-sub: #bbb;          /* Color secundario */
  --c-accent: #ff9900;    /* Color de acento */
}
```

### Agregar Productos:
Edita los arrays de productos en los archivos HTML correspondientes.

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🎯 Próximas Mejoras

- [ ] Integración con API real
- [ ] Base de datos persistente
- [ ] Sistema de notificaciones push
- [ ] Modo oscuro/claro
- [ ] PWA (Progressive Web App)

## 👨‍💻 Desarrollado por

Estudiante de programación - Proyecto académico

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.

---

**¡Disfruta explorando Freddy Fazbear's Pizzería! 🍕🎪**
