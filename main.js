// Idea de colocar carrusel
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-item');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  let currentIndex = 0;

  function showSlide(index) {
      if (index >= slides.length) {
          currentIndex = 0;
      } else if (index < 0) {
          currentIndex = slides.length - 1;
      } else {
          currentIndex = index;
      }
      const offset = -currentIndex * 100;
      document.querySelector('.carousel-slide').style.transform = `translateX(${offset}%)`;
  }

  nextButton.addEventListener('click', () => {
      showSlide(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
      showSlide(currentIndex - 1);
  });

  // Cambia cada 6 segundos
  setInterval(() => {
      showSlide(currentIndex + 1);
  }, 6000);

  showSlide(0);
});

// URL API Fake Users
const apiUrl = 'https://dummyjson.com/users';

// Función para crear las cards 
function crearCards(usuarios) {
  const contenedorCards = document.getElementById('contenedor-cards');
  contenedorCards.innerHTML = ''; 

  usuarios.forEach(usuario => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
          <h3>${usuario.firstName} ${usuario.lastName}</h3>
          <p>Email: ${usuario.email}</p>
          <p>Teléfono: ${usuario.phone}</p>
      `;

      contenedorCards.appendChild(card);
  });
}

// Función para cargar usuarios desde la API
function cargarUsuarios() {
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          crearCards(data.users); 

          // Configurar el buscador
          const buscador = document.getElementById('buscador');
          buscador.addEventListener('input', (e) => {
              const textoBusqueda = e.target.value.toLowerCase();
              const usuariosFiltrados = data.users.filter(usuario => 
                  `${usuario.firstName} ${usuario.lastName}`.toLowerCase().includes(textoBusqueda)
              );
              crearCards(usuariosFiltrados); // Crear las cards con los usuarios filtrados

              // Resaltar las tarjetas coincidentes para que al colocar un nombre se resalte en verde el usuario 
              const cards = document.querySelectorAll('.card');
              cards.forEach(card => {
                  const nombre = card.querySelector('h3').textContent.toLowerCase();
                  if (nombre.includes(textoBusqueda) && textoBusqueda !== '') {
                      card.classList.add('resaltar');
                  } else {
                      card.classList.remove('resaltar');
                  }
              });
          });
      })
      .catch(error => {
          console.error('Error al cargar los usuarios:', error);
      });
}


document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios(); 
});
