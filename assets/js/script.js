// ==========================================
// 1. LÓGICA DE REGISTRO (Para crearCuenta.html)
// ==========================================
const signupForm = document.getElementById('signup-form');
const signupErrorMessage = document.getElementById('signup-error-message');

if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura de datos con tus IDs de crearCuenta.html
        const nombre = document.getElementById('nombre-usuario').value.trim();
        const email = document.getElementById('correo-electronico').value.trim();
        const password = document.getElementById('contrasena').value;
        const confirmPassword = document.getElementById('confirmar-contrasena').value;

        // Validación de contraseñas
        if (password !== confirmPassword) {
            signupErrorMessage.style.color = 'red';
            signupErrorMessage.textContent = '❌ Las contraseñas no coinciden.';
            return;
        }

        // GUARDADO EN MEMORIA: Guardamos el email como identificador principal
        localStorage.setItem('usuarioRegistrado', email); 
        localStorage.setItem('passwordRegistrada', password);
        localStorage.setItem('nombrePersona', nombre);
        localStorage.setItem('rolUsuario', 'cliente'); // Rol por defecto

        signupErrorMessage.style.color = 'green';
        signupErrorMessage.textContent = '✅ ¡Cuenta creada con éxito! Redirigiendo...';

        setTimeout(() => {
            window.location.href = 'iniciarSesion.html';
        }, 2000);
    });
}

// ==========================================
// 2. LÓGICA DE LOGIN (Para iniciarSesion.html)
// ==========================================
const loginForm = document.getElementById('login-form');
const loginErrorMessage = document.getElementById('error-message');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura de datos con tus IDs de iniciarSesion.html
        const inputUser = document.getElementById('username').value.trim();
        const inputPass = document.getElementById('password').value;

        // Recuperar datos guardados
        const USER_DB = localStorage.getItem('usuarioRegistrado');
        const PASS_DB = localStorage.getItem('passwordRegistrada');

        // --- CREDENCIALES DE ADMINISTRADOR ---
        const ADMIN_USER = 'admin';
        const ADMIN_PASS = '12345';

        

        // VALIDACIÓN LÓGICA
        if (inputUser === ADMIN_USER && inputPass === ADMIN_PASS) {
            // Entrar como Admin
            localStorage.setItem('rolUsuario', 'admin');
            localStorage.setItem('nombrePersona', 'Administrador');
            
            loginErrorMessage.style.color = 'green';
            loginErrorMessage.textContent = '✅ Modo Administrador detectado. Entrando...';
            
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);

        } else if (inputUser === USER_DB && inputPass === PASS_DB) {
            // Entrar como Usuario Registrado
            localStorage.setItem('rolUsuario', 'cliente');
            
            loginErrorMessage.style.color = 'green';
            loginErrorMessage.textContent = '✅ ¡Bienvenido de nuevo!';
            
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);

        } else {
            // Error en los datos
            loginErrorMessage.style.color = 'red';
            loginErrorMessage.textContent = '❌ Correo o contraseña incorrectos.';
        }
    });
}

// ==========================================
// 3. DETECCIÓN DE SESIÓN (Para index.html)
// ==========================================
// Este bloque se ejecuta en cualquier página para mostrar el estado de la sesión
document.addEventListener('DOMContentLoaded', () => {
    const rol = localStorage.getItem('rolUsuario');
    
    // Si estamos en index.html y es admin, mostramos el aviso
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        if (rol === 'admin') {
            const barraAdmin = document.createElement('div');
            barraAdmin.style.cssText = 'background: #2c3e50; color: #f1c40f; text-align: center; padding: 10px; font-weight: bold; border-bottom: 2px solid #f1c40f;';
            barraAdmin.innerHTML = '⚠️ SESIÓN EN ADMINISTRADOR';
            document.body.prepend(barraAdmin);
        }
    }
});
const btnCerrar = document.getElementById('cerrar-sesion');
if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
        localStorage.clear(); // Borra los datos de la memoria
        window.location.href = 'iniciarSesion.html';
    });
}

