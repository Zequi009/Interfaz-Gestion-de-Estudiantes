const urlParams = new URLSearchParams(window.location.search);
const idAlumno = urlParams.get('idAlumno')

fetch(`http://localhost:8000/API/ALUMNOS/${idAlumno}`)
    .then(response => response.json())
    .then(dataAlumnos => {

        document.getElementById('nombre').value = dataAlumnos.NOMBRE;
        document.getElementById('apellido').value = dataAlumnos.APELLIDO;
        document.getElementById('dni').value = dataAlumnos.DNI;
        document.getElementById('Fnacimiento').value = dataAlumnos.FECHA_NACIMIENTO;
        document.getElementById('telefono').value = dataAlumnos.TELEFONO;
        document.getElementById('correo').value = dataAlumnos.EMAIL;
        document.getElementById('localidad').value = dataAlumnos.LOCALIDAD;
        document.getElementById('barrio').value = dataAlumnos.BARRIO;
        document.getElementById('direccion').value = dataAlumnos.DIRECCION;
        document.getElementById('piso').value = dataAlumnos.PISO;
        document.getElementById('depto').value = dataAlumnos.DEPTO;
        document.getElementById('emergencia').value = dataAlumnos.CONTACTO_EMERGENCIA;
        document.getElementById('telefonoEmerg').value = dataAlumnos.CONTACTO_EMERGENCIA_TEL;
        document.getElementById('contraseña').value = dataAlumnos.PASSWORD;

        const formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', function (event) {
            event.preventDefault()

            //obtener los datos actuales del formulario
            const nuevoNombre = document.getElementById('nombre').value;
            const nuevoApellido = document.getElementById('apellido').value;
            const nuevoDni = document.getElementById('dni').value;
            const nuevoFnacimiento = document.getElementById('Fnacimiento').value;
            const nuevoTelefono = document.getElementById('telefono').value;
            const nuevoCorreo = document.getElementById('correo').value;
            const nuevoLocalidad = document.getElementById('localidad').value;
            const nuevoBarrio = document.getElementById('barrio').value;
            const nuevoDireccion = document.getElementById('direccion').value;
            const nuevoPiso = document.getElementById('piso').value;
            const nuevoDepto = document.getElementById('depto').value;
            const nuevoEmergencia = document.getElementById('emergencia').value;
            const nuevoTelefonoEmerg = document.getElementById('telefonoEmerg').value;
            const nuevoContraseña = document.getElementById('contraseña').value;

            const dataActualizada = {
                NOMBRE: nuevoNombre,
                APELLIDO: nuevoApellido,
                DNI: nuevoDni,
                TELEFONO: nuevoTelefono,
                EMAIL: nuevoCorreo,
                LOCALIDAD: nuevoLocalidad,
                BARRIO: nuevoBarrio,
                DIRRECION: nuevoDireccion,
                PISO: nuevoPiso,
                DEPTO: nuevoDepto,
                CONTACTO_EMERGENCIA: nuevoEmergencia,
                CONTACTO_EMERGENCIA_TEL: nuevoTelefonoEmerg,
                PASSWORD: nuevoContraseña
            }
            if (nuevoFnacimiento) {
                const FechaFormateado = new Date(nuevoFnacimiento.split("/").reverse().join("-")).toISOString().split("T")[0];
                dataActualizada.FECHA_NACIMIENTO = FechaFormateado;
            }
            fetch(`http://localhost:8000/API/ALUMNOS/update/${idAlumno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataActualizada)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar la solidictud HTTP', response);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('datos actualizados con exito', data);

                    const toastSuccess = document.getElementById('toastSuccess');
                    const bsToastSuccess = new bootstrap.Toast(toastSuccess);
                    bsToastSuccess.show();
                })
                .catch(error => {
                    console.error('error al actualizar los datos', error)

                    const toastError = document.getElementById('toastError');
                    const bsToastError = new bootstrap.Toast(toastError);
                    bsToastError.show();
                })
        });

    })
    .catch(error => {
        console.error('Error al obtener los detalles del Alumno', error);
    });