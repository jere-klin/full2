// ==========================
// LISTA DE PRODUCTOS CON STOCK INICIAL
// ==========================
const productos = [
    { id: 1, nombre: "Peras", precio: 800, stock: 10 },
    { id: 2, nombre: "Limones", precio: 700, stock: 15 },
    { id: 3, nombre: "Lechugas", precio: 500, stock: 5 },
    {id: 4, nombre: "Frutillas", precio: 1000, stock: 20},
    {id: 5, nombre:"tomates", precio: 1000, stock:20},
    {id: 6, nombre: "platanos", precio: 900, stock:25},
    {id:7, nombre: "manzanas rojas y verdes", precio: 1000, stock:10},
    {id:8, nombre:"mangos", precio: 1200, stock:35}
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// ==========================
// FUNCIONES DE INTERFAZ
// ==========================

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function mostrarNotificacion(mensaje) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-mensaje';
    toast.innerText = mensaje;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==========================
// LÓGICA DE ACTUALIZACIÓN DE STOCK VISUAL
// ==========================

function actualizarStockEnCatalogo() {
    productos.forEach(producto => {
        const spanStock = document.getElementById(`stock-${producto.id}`);
        if (spanStock) {
            // Buscamos cuánto de este producto hay en el carrito actualmente
            const itemEnCarrito = carrito.find(item => item.id === producto.id);
            const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
            
            // El stock disponible es: Stock Total - Lo que ya está en el carrito
            const stockDisponible = producto.stock - cantidadEnCarrito;
            
            spanStock.innerText = stockDisponible;

            // Opcional: Cambiar color si se agota
            if (stockDisponible === 0) {
                spanStock.style.color = "red";
            } else {
                spanStock.style.color = "#28a745";
            }
        }
    });
}

// ==========================
// ACCIONES DEL CARRITO
// ==========================

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadActual < producto.stock) {
        if (itemEnCarrito) {
            itemEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarInterfaz();
        mostrarNotificacion(`${producto.nombre} agregado 🛒`);
    } else {
        mostrarNotificacion(`Sin stock de ${producto.nombre} ❌`);
    }
}

function disminuirCantidad(id) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(i => i.id !== id);
        }
    }
    actualizarInterfaz();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfaz();
}

function vaciarCarrito() {
    if (confirm("¿Vaciar todo el carrito?")) {
        carrito = [];
        actualizarInterfaz();
    }
}

// ==========================
// RENDERIZADO Y PERSISTENCIA
// ==========================

function actualizarInterfaz() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarStockEnCatalogo(); // <--- Esta línea actualiza el catálogo siempre
}

function mostrarCarrito() {
    const cartList = document.getElementById('cart-list');
    const totalCont = document.getElementById('cart-total-container');
    const cartCount = document.getElementById('cart-count');

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.innerText = totalItems;

    if (carrito.length === 0) {
        cartList.innerHTML = '<p style="text-align:center; padding:20px;">Vacío</p>';
        totalCont.innerHTML = '';
        return;
    }

    cartList.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <strong>${item.nombre}</strong>
                $${item.precio} x ${item.cantidad}
            </div>
            <div class="cart-controls">
                <button onclick="agregarAlCarrito(${item.id})">+</button>
                <button onclick="disminuirCantidad(${item.id})">-</button>
                <button onclick="eliminarDelCarrito(${item.id})" style="border:none; background:none; cursor:pointer;">🗑️</button>
            </div>
        </div>
    `).join('');

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalCont.innerHTML = `<h3>Total: $${total}</h3><button class="submit" onclick="alert('Pedido procesado')">Finalizar</button>`;
}

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfaz();
});