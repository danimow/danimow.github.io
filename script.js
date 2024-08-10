// Diccionario de precios
const precios = {
    cerveza: 3,
    cubata: 5,
    cubalitro: 10,
    refresco: 2,
    mojito: 5
};

// Generar elementos dinámicamente
function generarElementos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    for (const [clave, valor] of Object.entries(precios)) {
        const div = document.createElement('div');
        div.className = 'campo';

        div.innerHTML = `
            <label for="${clave}">${clave.charAt(0).toUpperCase() + clave.slice(1)} (${valor}€):</label>
            <div class="btn-group">
                <button onclick="modificarCantidad('${clave}', -1)">-</button>
                <input type="number" id="${clave}" value="0" min="0" readonly>
                <button onclick="modificarCantidad('${clave}', 1)">+</button>
            </div>
        `;

        contenedor.appendChild(div);
    }

    calcularPrecioTotal(); // Inicializar el cálculo total
}

// Función para modificar la cantidad
function modificarCantidad(id, cambio) {
    const input = document.getElementById(id);
    const nuevaCantidad = parseInt(input.value) + cambio;
    if (nuevaCantidad >= 0) {
        input.value = nuevaCantidad;
        calcularPrecioTotal();
    }
}

// Función para calcular el precio total
function calcularPrecioTotal() {
    let total = 0;

    for (const [clave, valor] of Object.entries(precios)) {
        const cantidad = parseInt(document.getElementById(clave).value) || 0;
        total += cantidad * valor;
    }

    document.getElementById('precioTotal').textContent = `Precio Total: ${total}€`;

    calcularCambio();
}

// Función para calcular el cambio
function calcularCambio() {
    const total = parseFloat(document.getElementById('precioTotal').textContent.replace('Precio Total: ', '').replace('€', '')) || 0;
    const dineroCliente = parseFloat(document.getElementById('dineroCliente').value) || 0;

    const cambio = dineroCliente - total;

    document.getElementById('cambio').textContent = `Cambio: ${cambio >= 0 ? cambio : 0}€`;
}

// Función para reiniciar los campos
function reiniciarCampos() {
    for (const clave of Object.keys(precios)) {
        document.getElementById(clave).value = 0;
    }
    document.getElementById('dineroCliente').value = 0;

    calcularPrecioTotal();
}

// Generar los elementos al cargar la página
window.onload = generarElementos;
