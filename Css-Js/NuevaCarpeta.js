document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const descripcion = document.getElementById('descripcion').value;
    const descripcionPlan = document.getElementById('descripcionPlan').value;
    const plan_start_date = document.getElementById('plan_start_date').value;
    const plan_end_date = document.getElementById('plan_end_date').value;


    // Crear un objeto formData con los datos a enviar
    const formData = {
        DESCRIPCION: descripcion,
        PLAN_CARRERA: descripcionPlan,
    };

    //Si los campos de Fechas con datos los conviertea al formato de la base de datos
    if(plan_start_date){
        const inicioFormateado = new Date(plan_start_date.split("/").reverse().join("-")).toISOString().split("T")[0];
        formData.PLAN_START_DATE = inicioFormateado;
    }
    if(plan_end_date){
        const finFormateado = new Date(plan_end_date.split("/").reverse().join("-")).toISOString().split("T")[0];
        formData.PLAN_END_DATE=finFormateado;
    }

    console.log('Datos a enviar a la Api:', {
        descripcion,
        descripcionPlan,
        plan_start_date: formData.PLAN_START_DATE,
        plan_end_date: formData.PLAN_END_DATE,
    });
    
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
        //Mostar Toast de exito
        const toastSuccess = document.getElementById('toastSuccess');
        const toastSS = new bootstrap.Toast(toastSuccess);
        toastSS.show();
    })
    .catch(error => {
        console.error('Error:', error.message);
        console.error('Detalle del Error:', error.response); // Muestra los detalles del Error

        //Mostrar toast de Error
        const toastError = document.getElementById('toastError');;
        const terror = new bootstrap.Toast(toastError);
        terror.show();
    });
});
