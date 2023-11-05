// Función para cargar el código HTML del carrusel en una página
function loadCarousel() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'carousel.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const carouselContainer = document.getElementById('carousel-container');
        carouselContainer.innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  }
  
  // Llama a la función para cargar el carrusel en una página específica
  loadCarousel();
  