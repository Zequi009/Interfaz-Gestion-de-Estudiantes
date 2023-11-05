document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("localidad");

    // Reemplaza la URL con la API que desees utilizar
    const apiUrl = "https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.27/download/localidades-censales.json";

    // Realiza una solicitud GET a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Procesa los datos recibidos de la API
            if (data && data.features && data.features.length > 0) {
                data.features.forEach(feature => {
                    // Obtiene el nombre de la localidad
                    const localidad = feature.properties.nombre;

                    // Crea una nueva opción para cada localidad
                    const option = document.createElement("option");
                    option.value = localidad;
                    option.text = localidad;

                    // Agrega la opción al select
                    selectElement.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error("Error al obtener datos de la API:", error);
        });
});
