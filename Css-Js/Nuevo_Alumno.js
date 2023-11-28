const formulario = document.getElementById('formulario');
const errorMessage = document.getElementById('error-message');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const Fnacimiento = document.getElementById('Fnacimiento').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const localidad = document.getElementById('localidad').value;
    const barrio = document.getElementById('barrio').value;
    const direccion = document.getElementById('direccion').value;
    let piso = document.getElementById('piso').value;
    let depto = document.getElementById('depto').value;
    const contEmergencia = document.getElementById('emergencia').value;
    const telEmergencia = document.getElementById('telefonoEmerg').value;
    const contraseña = document.getElementById('contraseña').value;

    let FechaFormateado = null;

    //formatea la fecha
    if (Fnacimiento) {
        FechaFormateado = new Date(Fnacimiento.split("/").reverse().join("-")).toISOString().split("T")[0];
    }

    // Verificar que piso y depto para enviar null
    piso = piso.trim() === '' ? null : piso;
    depto = depto.trim() === '' ? null : depto;

    // Función para validar si es un número
    function esNumero(valor) {
        return /^\d+$/.test(valor);
    }

    if (!esNumero(telefono)) {
        errorMessage.textContent = 'El campo Teléfono debe contener solo números';
        errorMessage.style.display = 'block';
        return;
    }

    if (piso !== null && !esNumero(piso)) {
        errorMessage.textContent = 'El campo piso debe contener solo números';
        errorMessage.style.display = 'block';
        return;
    }



    //controles para los campos en blanco
    if (!nombre || !apellido || !dni || !contEmergencia || !telEmergencia) {
        errorMessage.textContent = 'Los Campos nombre, apellido, dni, contraseña y los campos de contacto de emergencia son obligatorios';
        errorMessage.style.display = 'block'; //Mostrar el mensaje de Error

        // Mostrar toast de error si existen los elementos HTML
        const toastError = document.getElementById('toastError');
        if (toastError) {
            const terror = new bootstrap.Toast(toastError);
            terror.show();
        }

        return;
    }

    const DatosAlumnos = {
        NOMBRE: nombre,
        APELLIDO: apellido,
        FECHA_NACIMIENTO: FechaFormateado,
        DNI: dni,
        PASSWORD: contraseña,
        TELEFONO: telefono,
        EMAIL: correo,
        DIRECCION: direccion,
        PISO: piso,
        DEPTO: depto,
        BARRIO: barrio,
        LOCALIDAD: localidad,
        CONTACTO_EMERGENCIA: contEmergencia,
        CONTACTO_EMERGENCIA_TEL: telEmergencia
    }

    //realizar POST a la api
    fetch('http://localhost:8000/API/ALUMNOS/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosAlumnos)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la solicitud HTTP');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos Guardados correctamente', data);

            // Mostrar toast de éxito si existen los elementos HTML
            const toastSuccess = document.getElementById('toastSuccess');
            if (toastSuccess) {
                const toastSS = new bootstrap.Toast(toastSuccess);
                toastSS.show();
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos a la api', error);
        })
});
