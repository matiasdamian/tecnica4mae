// ===============================
// 🎮 SCRIPT PRINCIPAL - FREDDY'S PIZZERÍA
// ===============================

// === DATOS MOCK ===
const USUARIOS_MOCK = [
  { id: 1, nombre: "Usuario Demo", email: "demo@freddy.com", password: "123456" },
  { id: 2, nombre: "Admin", email: "admin@freddy.com", password: "admin123" }
];

const TARJETAS_MOCK = [
  { id: 1, brand: "Visa", masked: "**** **** **** 1234", last4: "1234", holder: "Usuario Demo", exp_month: 12, exp_year: 25 }
];

// === ESTADO GLOBAL ===
let usuarioActual = null;
let carrito = [];
let pedidos = [];
let tarjetas = [...TARJETAS_MOCK];

// === UTILIDADES ===
function mostrarNotificacion(mensaje, tipo = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    padding: 15px 20px; border-radius: 8px; color: white;
    background: ${tipo === 'success' ? '#4CAF50' : '#f44336'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = mensaje;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// === SISTEMA DE USUARIOS ===
function login(email, password) {
  const usuario = USUARIOS_MOCK.find(u => u.email === email && u.password === password);
  if (usuario) {
    usuarioActual = usuario;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    mostrarNotificacion(`¡Bienvenido ${usuario.nombre}!`);
    return true;
  }
  return false;
}

function logout() {
  usuarioActual = null;
  sessionStorage.removeItem('usuario');
  mostrarNotificacion('Sesión cerrada');
  location.reload();
}

function registrar(nombre, email, password) {
  const nuevoUsuario = {
    id: USUARIOS_MOCK.length + 1,
    nombre,
    email,
    password
  };
  USUARIOS_MOCK.push(nuevoUsuario);
  mostrarNotificacion('Usuario registrado exitosamente');
  return true;
}

// === SISTEMA DE CARRITO ===
function agregarAlCarrito(nombre, precio, cantidad = 1, imagen = '') {
  const itemExistente = carrito.find(item => item.nombre === nombre);
  
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad, imagen });
  }
  
  mostrarNotificacion(`${nombre} agregado al carrito`);
  actualizarCarrito();
}

function quitarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoPanel = document.getElementById('carritoPanel');
  const itemsCarrito = document.getElementById('itemsCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  
  if (!carritoPanel || !itemsCarrito || !totalCarrito) return;
  
  itemsCarrito.innerHTML = '';
  let total = 0;
  
  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
      <span>${item.nombre} × ${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
      <button onclick="quitarDelCarrito('${item.nombre}')">✖</button>
    `;
    itemsCarrito.appendChild(itemDiv);
  });
  
  totalCarrito.textContent = `$${total.toLocaleString('es-AR')}`;
}

function toggleCart() {
  const carritoPanel = document.getElementById('carritoPanel');
  if (carritoPanel) {
    carritoPanel.style.display = carritoPanel.style.display === 'block' ? 'none' : 'block';
  }
}

// === SISTEMA DE PAGOS ===
function guardarTarjeta(datos) {
  const nuevaTarjeta = {
    id: tarjetas.length + 1,
    brand: detectarMarca(datos.number),
    masked: `**** **** **** ${datos.number.slice(-4)}`,
    last4: datos.number.slice(-4),
    holder: datos.holder_name,
    exp_month: parseInt(datos.exp_month),
    exp_year: parseInt(datos.exp_year)
  };
  
  tarjetas.push(nuevaTarjeta);
  mostrarNotificacion('Tarjeta guardada exitosamente');
  return nuevaTarjeta;
}

function detectarMarca(numero) {
  if (numero.startsWith('4')) return 'Visa';
  if (numero.startsWith('5')) return 'Mastercard';
  if (numero.startsWith('3')) return 'American Express';
  return 'Unknown';
}

function procesarPago(total, tipo = 'general') {
  if (!usuarioActual) {
    mostrarNotificacion('Debes iniciar sesión para continuar', 'error');
    return false;
  }
  
  // Simular procesamiento de pago
  const pedido = {
    id: Date.now(),
    usuario: usuarioActual.nombre,
    tipo,
    items: [...carrito],
    total,
    fecha: new Date().toLocaleString('es-AR'),
    estado: 'Confirmado'
  };
  
  pedidos.push(pedido);
  carrito = [];
  actualizarCarrito();
  
  mostrarNotificacion('¡Pago procesado exitosamente!');
  return true;
}

// === SISTEMA DE PEDIDOS ===
function guardarPedido(tipo, detalles, total, direccion = null) {
  if (!usuarioActual) {
    mostrarNotificacion('Debes iniciar sesión para continuar', 'error');
    return false;
  }
  
  const pedido = {
    id: Date.now(),
    usuario: usuarioActual.nombre,
    tipo,
    detalles: JSON.parse(detalles),
    total,
    direccion,
    fecha: new Date().toLocaleString('es-AR'),
    estado: 'Confirmado'
  };
  
  pedidos.push(pedido);
  mostrarNotificacion('Pedido guardado exitosamente');
  return true;
}

// === FUNCIONES DE UI ===
function toggleUserMenu() {
  const userMenu = document.getElementById('userMenu');
  if (userMenu) {
    userMenu.classList.toggle('show');
  }
}

function cargarDestacados() {
  const menuDestacado = document.getElementById('menuDestacado');
  const merchDestacado = document.getElementById('merchDestacado');
  
  if (menuDestacado) {
    const itemsDestacados = [
      { nombre: "Pizza Pepperoni", precio: 5900, img: "./img/peperoni.jfif" },
      { nombre: "Hamburguesa Doble", precio: 4800, img: "./img/hamburguezadoble.jfif" },
      { nombre: "Pizza Cuatro Quesos", precio: 6300, img: "./img/cuatroquesos.jfif" }
    ];
    
    menuDestacado.innerHTML = itemsDestacados.map(item => `
      <div class="card">
        <img src="${item.img}" alt="${item.nombre}">
        <h3>${item.nombre}</h3>
        <p>$${item.precio.toLocaleString('es-AR')}</p>
        <button onclick="agregarAlCarrito('${item.nombre}', ${item.precio})">Agregar al carrito</button>
      </div>
    `).join('');
  }
  
  if (merchDestacado) {
    const merchItems = [
      { nombre: "Remera Freddy", precio: 8000, img: "https://via.placeholder.com/250x180/ff9ff3/ffffff?text=Remera+Freddy" },
      { nombre: "Gorra Bonnie", precio: 6000, img: "https://via.placeholder.com/250x180/54a0ff/ffffff?text=Gorra+Bonnie" },
      { nombre: "Taza Chica", precio: 4500, img: "https://via.placeholder.com/250x180/5f27cd/ffffff?text=Taza+Chica" }
    ];
    
    merchDestacado.innerHTML = merchItems.map(item => `
      <div class="card">
        <img src="${item.img}" alt="${item.nombre}">
        <h3>${item.nombre}</h3>
        <p>$${item.precio.toLocaleString('es-AR')}</p>
        <button onclick="agregarAlCarrito('${item.nombre}', ${item.precio})">Agregar al carrito</button>
      </div>
    `).join('');
  }
}

function checkout() {
  if (carrito.length === 0) {
    mostrarNotificacion('Tu carrito está vacío', 'error');
    return;
  }
  
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const paymentModal = document.getElementById('paymentModal');
  
  if (paymentModal) {
    paymentModal.style.display = 'flex';
    cargarTarjetasGuardadas();
  }
}

function closePaymentModal() {
  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) {
    paymentModal.style.display = 'none';
  }
}

function cargarTarjetasGuardadas() {
  const savedCards = document.getElementById('savedCards');
  if (!savedCards) return;
  
  if (tarjetas.length === 0) {
    savedCards.innerHTML = '<p>No tienes tarjetas guardadas</p>';
    return;
  }
  
  savedCards.innerHTML = tarjetas.map(tarjeta => `
    <div style="background: #333; padding: 10px; margin: 5px 0; border-radius: 5px; cursor: pointer;" 
         onclick="usarTarjeta(${tarjeta.id})">
      <strong>${tarjeta.brand}</strong> ${tarjeta.masked}
    </div>
  `).join('');
}

function usarTarjeta(tarjetaId) {
  const tarjeta = tarjetas.find(t => t.id === tarjetaId);
  if (!tarjeta) return;
  
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  procesarPago(total);
  closePaymentModal();
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
  // Verificar sesión guardada
  const usuarioGuardado = sessionStorage.getItem('usuario');
  if (usuarioGuardado) {
    usuarioActual = JSON.parse(usuarioGuardado);
  }
  
  // Actualizar UI de usuario
  const userSection = document.getElementById('user-section');
  if (userSection) {
    if (usuarioActual) {
      userSection.innerHTML = `
        <div class="user-icon" onclick="toggleUserMenu()">👤</div>
        <div id="userMenu" class="user-menu">
          <p>${usuarioActual.nombre}</p>
          <a href="#" onclick="logout()">Cerrar sesión</a>
        </div>`;
    } else {
      userSection.innerHTML = `<a href="login.html" class="login-btn">Iniciar Sesión</a>`;
    }
  }
  
  // Cargar contenido destacado
  cargarDestacados();
  
  // Configurar formularios
  const cardForm = document.getElementById('cardForm');
  if (cardForm) {
    cardForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const datos = Object.fromEntries(formData);
      
      guardarTarjeta(datos);
      const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
      procesarPago(total);
      this.reset();
    });
  }
});

// === ANIMACIONES CSS ===
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
