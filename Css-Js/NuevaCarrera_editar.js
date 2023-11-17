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

        const formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

            // Obtener los nuevos datos del formulario
            const nuevaDescripcion = document.getElementById('descripcion').value;
            const nuevaDescripcionPlan = document.getElementById('descripcionPlan').value;
            const nuevoPlanStartDate = document.getElementById('plan_start_date').value;
            const nuevoPlanEndDate = document.getElementById('plan_end_date').value;

            // Preparar los datos a enviar
            const datosActualizados =
            {
                DESCRIPCION: nuevaDescripcion,
                PLAN_CARRERA: nuevaDescripcionPlan,
                PLAN_START_DATE: nuevoPlanStartDate,
                PLAN_END_DATE: nuevoPlanEndDate
            };

            // Realizar la solicitud POST a la API para actualizar los datos
            fetch(`http://localhost:8000/API/CARRERAS/update/${carreraId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosActualizados)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar los datos de la carrera');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Datos actualizados:', data);
                    //Toast de Exito
                    const toastSuccess = document.getElementById('toastSuccess');
                    const bsToastSuccess = new bootstrap.Toast(toastSuccess);
                    bsToastSuccess.show();
                })
                .catch(error => {
                    console.error('Error al actualizar los detalles de la carrera:', error);
                    //toast de Error
                    const toastError = document.getElementById('toastError');
                    const bsToastError = new bootstrap.Toast(toastError);
                    bsToastError.show();

                });
        });
    })
    .catch(error => {
        console.error('Error al obtener los detalles de la carrera:', error);
    });
