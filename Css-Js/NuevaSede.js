document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener los valores del formulario
    const descripcion = document.getElementById('descripcion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value
    const direccion = document.getElementById('direccion').value;
    const piso = document.getElementById('piso').value;
    const depto = document.getElementById('depto').value;
    const barrio = document.getElementById('barrio').value;
    const localidad = document.getElementById('localidad').value
    const desde = document.getElementById('hora_desde').value;
    const hasta = document.getElementById('hora_hasta').value;
    const diaInicio = document.getElementById('dia_desde').value;
    const diaFin = document.getElementById('dia_hasta').value;

    // Mostrar los datos en la consola
    console.log('Datos a enviar a la API:', {
        descripcion,
        telefono,
        email,
        direccion,
        piso,
        depto,
        barrio,
        localidad,
        desde,
        hasta,
        diaInicio,
        diaFin,
    });

    // Crear un objeto con los datos del formulario
    const formData = {
        DESCRIPCION: descripcion,
        TELEFONO: telefono,
        EMAIL: email,
        DIRECCION: direccion,
        PISO: piso,
        DEPTO: depto,
        BARRIO: barrio,
        LOCALIDAD: localidad,
        HORA_DESDE: desde,
        HORA_HASTA: hasta,
        DIA_DESDE: diaInicio,
        DIA_HASTA: diaFin,
    };

    // Enviar los datos a la API
    fetch('http://localhost:8000/API/SEDES/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el formulario a la API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data); // Imprimir la respuesta en la consola
            //Mostrar el Toast exito 
            const toastSuccess = document.getElementById('toastSuccess');
            const toastSS = new bootstrap.Toast(toastSuccess);
            toastSS.show();
        })
        .catch(error => {
            console.error('Error:', error.message);
            console.error('Detalles del error:', error.response); // Agregado para mostrar detalles del error

            // Mostrar el toast de error
            const toastError = document.getElementById('toastError');
            const bsToastError = new bootstrap.Toast(toastError);
            bsToastError.show();
        });

});