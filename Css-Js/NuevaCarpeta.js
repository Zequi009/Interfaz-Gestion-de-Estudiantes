document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const descripcion = document.getElementById('descripcion').value;
    const descripcionPlan = document.getElementById('descripcionPlan').value;
    const planInicio = document.getElementById('plan_start_date').value;
    const planFin = document.getElementById('plan_end_date').value;

    // Formatear las fechas a yyyy-mm-dd
    const inicioFormateado = new Date(planInicio.split("/").reverse().join("-")).toISOString().split("T")[0];
    const finFormateado = new Date(planFin.split("/").reverse().join("-")).toISOString().split("T")[0];

    console.log('Datos a enviar a la Api:', {
        descripcion,
        descripcionPlan,
        planInicio: inicioFormateado,
        planFin: finFormateado,
    });

    // Crear un objeto formData con los datos a enviar
    const formData = {
        DESCRIPCION: descripcion,
        PLAN_CARRERA: descripcionPlan,
        PLAN_START_DATE: inicioFormateado,
        PLAN_END_DATE: finFormateado,
    };

    fetch('http://localhost:8000/API/CARRERAS/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el formulario a la Api');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta de la Api:', data);

        
    })
    .catch(error => {
        console.error('Error:', error.message);
        console.error('Detalle del Error:', error.response); // Muestra los detalles del Error

    });
});
