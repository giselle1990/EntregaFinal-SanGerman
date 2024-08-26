// Función para mostrar solo los clientes agregados manualmente
function mostrarClientes(clientes) {
    const listaClientes = document.getElementById('clientesList');
    listaClientes.innerHTML = '';  // Limpiar la lista antes de mostrar los clientes

    if (clientes.length === 0) {
        listaClientes.innerHTML = '<p>No hay clientes registrados.</p>';
        return;
    }

    clientes.forEach((cliente, index) => {
        if (cliente.nombre && cliente.edad && cliente.email && cliente.telefono) {
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
        }
    });
}
// Función para cargar datos de la API y guardarlos en localStorage
async function cargarDatosDeAPI() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        const clientesAPI = data.users.map(user => ({
            nombre: `${user.firstName} ${user.lastName}`,
            email: user.email,
            edad: user.age,
            telefono: user.phone
        }));

        // Guardar los clientes de la API en localStorage
        localStorage.setItem('clientesAPI', JSON.stringify(clientesAPI));
    } catch (error) {
        console.error('Error al cargar datos de la API:', error);
    }
}

function agregarCliente(nombre, edad, email, telefono) {
    const cliente = { nombre, edad, email, telefono };
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    
    // Evitar registrar un cliente con un email ya existente
    if (clientes.some(cliente => cliente.email === email)) {
        Swal.fire({
            title: 'Error',
            text: 'Este cliente ya está registrado.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    mostrarClientes(clientes); 

    // Mostrar SweetAlert al agregar un cliente
    Swal.fire({
        title: '¡Cliente agregado!',
        text: `${nombre} ha sido registrado exitosamente.`,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
}

function eliminarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteEliminado = clientes.splice(index, 1)[0];
    localStorage.setItem('clientes', JSON.stringify(clientes));
    mostrarClientes(clientes); // Actualizar la lista de clientes en el HTML

    // Mostrar SweetAlert al eliminar un cliente
    Swal.fire({
        title: '¡Cliente eliminado!',
        text: `${clienteEliminado.nombre} ha sido eliminado.`,
        icon: 'warning',
        confirmButtonText: 'Ok'
    });
}

// Función para registrar un cliente desde el formulario
function registrarCliente(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    agregarCliente(nombre, edad, email, telefono);
    document.getElementById('formRegistrar').reset(); // Limpiar los campos del formulario
}


document.addEventListener('DOMContentLoaded', () => {
    const formRegistrar = document.getElementById('formRegistrar');
    if (formRegistrar) {
        formRegistrar.addEventListener('submit', registrarCliente);
    }

    
    const clientesAgregados = JSON.parse(localStorage.getItem('clientes')) || [];
    mostrarClientes(clientesAgregados);


    cargarDatosDeAPI();
});
