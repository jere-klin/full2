const productosAdmin = [
    { id: 1, nombre: "Peras", precio: 800, stock: 10 },
    { id: 2, nombre: "Limones", precio: 700, stock: 15 },
    { id: 3, nombre: "Lechugas", precio: 500, stock: 5 }
];

function cargarProductosAdmin() {
    const tabla = document.getElementById('admin-product-list');
    tabla.innerHTML = productosAdmin.map(p => `
        <tr>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td><input type="number" value="${p.stock}" id="stock-input-${p.id}" style="width: 50px;"></td>
            <td><button onclick="guardarCambios(${p.id})" class="btn-destacado">Actualizar</button></td>
        </tr>
    `).join('');
}

function guardarCambios(id) {
    const nuevoStock = document.getElementById(`stock-input-${id}`).value;
    // Aquí podrías actualizar el array o mandarlo a una base de datos
    alert(`Producto ${id} actualizado a ${nuevoStock} unidades.`);
}

function cerrarSesion() {
    localStorage.removeItem('usuarioRol');
    window.location.href = "iniciarSesion.html";
}

// Seguridad: Si no es admin, lo saca de la página
if (localStorage.getItem('usuarioRol') !== 'admin') {
    window.location.href = "index.html";
}

cargarProductosAdmin();