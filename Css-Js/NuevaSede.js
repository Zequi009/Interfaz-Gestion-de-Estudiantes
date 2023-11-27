document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener los valores del formulario manualmente
    const descripcion = document.getElementById('descripcion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    let piso = document.getElementById('piso').value;
    let depto = document.getElementById('depto').value;
    const barrio = document.getElementById('barrio').value;
    const localidad = document.getElementById('localidad').value;
    const desde = document.getElementById('hora_desde').value;
    const hasta = document.getElementById('hora_hasta').value;
    const diaInicio = document.getElementById('dia_desde').value;
    const diaFin = document.getElementById('dia_hasta').value;

    // Validación para piso y depto
    if (piso === '') {
        piso = null; // Si piso está vacío, establece null
    }
    if (depto === '') {
        depto = null; // Si depto está vacío, establece null
    }
    if (descripcion === '' || direccion === '' || barrio === '' || localidad === '') {
        // Mostrar mensaje de error indicando campos obligatorios
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Los campos Descripción, Dirección, Barrio y Localidad son obligatorios';
        errorMessage.style.display = 'block'; // Mostrar el mensaje de error

        // Mostrar toast de error
        const toastError = document.getElementById('toastError');
        const terror = new bootstrap.Toast(toastError);
        terror.show();

        return; // Detener el envío del formulario si faltan campos obligatorios
    }

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

            // Mostrar el Toast de éxito

            const errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'none';

            const toastSuccess = document.getElementById('toastSuccess');
            const toastSS = new bootstrap.Toast(toastSuccess);
            toastSS.show();
        })
        .catch(error => {
            console.error('Error:', error.message);

            // Mostrar el Toast de error o realizar alguna otra acción
            const toastError = document.getElementById('toastError');
            const bsToastError = new bootstrap.Toast(toastError);
            bsToastError.show();
        });

});
