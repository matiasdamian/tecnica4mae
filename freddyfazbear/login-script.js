// ===============================
// 🔐 SCRIPT DE LOGIN/REGISTRO
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form[action="php/login.php"]');
  const registroForm = document.querySelector('form[action="php/registro.php"]');
  
  // Interceptar formulario de login
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[name="email"]').value;
      const password = this.querySelector('input[name="password"]').value;
      
      // Simular login
      if (login(email, password)) {
        window.location.href = 'index.html';
      } else {
        alert('Email o contraseña incorrectos');
      }
    });
  }
  
  // Interceptar formulario de registro
  if (registroForm) {
    registroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = this.querySelector('input[name="name"]').value;
      const email = this.querySelector('input[name="email"]').value;
      const password = this.querySelector('input[name="password"]').value;
      
      // Simular registro
      if (registrar(nombre, email, password)) {
        alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        // Cambiar a formulario de login
        document.querySelector('.toggle').checked = false;
      } else {
        alert('Error al registrar usuario');
      }
    });
  }
});

// Funciones de login/registro (importadas del script principal)
function login(email, password) {
  const USUARIOS_MOCK = [
    { id: 1, nombre: "Usuario Demo", email: "demo@freddy.com", password: "123456" },
    { id: 2, nombre: "Admin", email: "admin@freddy.com", password: "admin123" }
  ];
  
  const usuario = USUARIOS_MOCK.find(u => u.email === email && u.password === password);
  if (usuario) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    return true;
  }
  return false;
}

function registrar(nombre, email, password) {
  // Simular registro exitoso
  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    email,
    password
  };
  
  sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  return true;
}
