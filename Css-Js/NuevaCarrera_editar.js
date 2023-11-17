const urlParams = new URLSearchParams(window.location.search);
const carreraId = urlParams.get('id');

// Hacer una solicitud GET a la API para obtener los detalles de la carrera
fetch(`http://localhost:8000/API/CARRERAS/${carreraId}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('descripcion').value = data.DESCRIPCION;
    document.getElementById('descripcionPlan').value = data.PLAN_CARRERA;
    document.getElementById('plan_start_date').value = data.PLAN_START_DATE;
    document.getElementById('plan_end_date').value = data.PLAN_END_DATE;
  })
  .catch(error => {
    console.error('Error al obtener los detalles de la carrera:', error);
  });
