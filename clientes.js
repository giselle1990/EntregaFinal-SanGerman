// Array para almacenar clientes preexistentes
const clientesPreexistentes = [
    { nombre: 'Juan', edad: 30, email: 'juan@hotmail.com', telefono: '123456789' },
    { nombre: 'María', edad: 25, email: 'maria@hotmail.com', telefono: '12345678' },
    { nombre: 'Pedro', edad: 40, email: 'pedro@hotmail.com', telefono: '12345678' },
    { nombre: 'Ana', edad: 22, email: 'ana@hotmail.com', telefono: '12345678' },
    { nombre: 'Luis', edad: 35, email: 'luis@hotmail.com', telefono: '12345678' }
];

// Inicializar clientes en el localStorage si no existen
if (!localStorage.getItem('clientes')) {
    localStorage.setItem('clientes', JSON.stringify(clientesPreexistentes));
}

// Obtener clientes desde el localStorage
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

// Función para mostrar clientes
function mostrarClientes() {
    const listaClientes = document.getElementById('clientesList');
    listaClientes.innerHTML = '';  // Limpiar la lista antes de mostrar los clientes

    if (clientes.length === 0) {
        listaClientes.innerHTML = '<p>No hay clientes registrados.</p>';
        return;
    }

    clientes.forEach((cliente, index) => {
        const clienteItem = document.createElement('div');
        clienteItem.classList.add('cliente-item');
        clienteItem.innerHTML = `
            <strong>${cliente.nombre}</strong> - 
            Edad: ${cliente.edad}, 
            Email: ${cliente.email}, 
            Teléfono: ${cliente.telefono}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarCliente(index);

        clienteItem.appendChild(deleteButton);
        listaClientes.appendChild(clienteItem);
    });
}

// Función para eliminar clientes
function eliminarCliente(index) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este cliente?');
    if (confirmacion) {
        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        mostrarClientes();
    }
}

// Función para registrar cliente
function registrarCliente(e) {
    e.preventDefault(); // Evitar el envío del formulario

    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad').value.trim());
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || isNaN(edad) || !email || !telefono) {
        mostrarMensaje("Por favor, complete todos los campos correctamente.", "error");
        return;
    }

    if (clientes.length >= 10) {
        mostrarMensaje("No se pueden registrar más clientes.", "error");
        return;
    }

    const cliente = {
        nombre: nombre,
        edad: edad,
        email: email,
        telefono: telefono
    };

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    mostrarMensaje("Cliente registrado exitosamente.", "success");
    mostrarClientes();
    document.getElementById('formRegistrar').reset(); // Limpiar los campos del formulario
}

// Función para mostrar mensajes de éxito o error
function mostrarMensaje(mensaje, tipo) {
    const nodoPadre = document.getElementById("clientesList");
    const mensajeElemento = document.createElement('div');
    mensajeElemento.className = `mensaje ${tipo}`;
    mensajeElemento.textContent = mensaje;

    nodoPadre.appendChild(mensajeElemento);

    setTimeout(() => {
        mensajeElemento.remove();
    }, 5000);
}

// Asignar eventos una vez que el DOM se ha cargado
document.addEventListener('DOMContentLoaded', () => {
    const formRegistrar = document.getElementById('formRegistrar');
    if (formRegistrar) {
        formRegistrar.addEventListener('submit', registrarCliente);
    }

    // Mostrar clientes al cargar la página
    mostrarClientes();
});
