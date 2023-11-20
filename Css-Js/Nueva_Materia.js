document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const descripcion = document.getElementById('descripcion').value;
    const resolucion = document.getElementById('resolucion').value;
    const año = document.getElementById('año').value;

    if (descripcion.length > 100) {
        console.error('La descripción supera los 100 caracteres permitidos.');
        return;
    }

    if (resolucion.length > 10) {
        console.error('La resolución supera los 10 caracteres permitidos.');
        return;
    }

    if (isNaN(año) || año <= 0) {
        console.error('El año ingresado no es un número válido.');
        return;
    }

    const formData = {
        DESCRIPCION: descripcion,
        COD_RESOLUCION: resolucion,
        CARRERA_ANIO: año
    }

    // Realizar la solicitud POST utilizando fetch
    fetch('http://localhost:8000/API/MATERIAS/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {|
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error('Error al enviar el formulario a la API: ' + JSON.stringify(error));
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta de la API:', data);
        const toastSuccess = document.getElementById('toastSuccess');
        const bsToastSuccess = new bootstrap.Toast(toastSuccess);
        bsToastSuccess.show();

    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar más detalles sobre el error, si está disponible
        if (error.message.includes('Error al enviar el formulario a la API')) {
            const errorDetails = JSON.parse(error.message.replace('Error al enviar el formulario a la API: ', ''));
            console.error('Detalles del error:', errorDetails);
        }
    });
});
