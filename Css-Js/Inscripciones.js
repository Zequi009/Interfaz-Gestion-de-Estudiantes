const selectAlumno = document.getElementById('selectAlumno')

async function fectchSedeCarrera() {
    try {
        const responseSedeCarreras = await fetch('http://localhost:8000/API/SEDECARRERA/');
        const data = await responseSedeCarreras.json();
        const selectCarrera = document.getElementById('selectSede');
        selectCarrera.innerHTML = '';

        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text = 'seleccionar una Carrera';
        optionSeleccionar.value = ''

        selectCarrera.appendChild(optionSeleccionar);

        await populateSelectWithDescriptions(data, selectCarrera);
    }
    catch (error) {
        console.error('error al traer los datos', error);

    }
}
async function populateSelectWithDescriptions(data, selectCarrera) {
    for (const carrera of data) {
        const descripcionCarrera = await obtenerDescripcionCarrera(carrera.CARRERA_ID);
        const descripcionSede = await obtenerDescripcionSede(carrera.SEDE_ID);

        //crear y añadir opciones al select con las descripciones obtenidas
        const option = document.createElement('option');
        option.value = carrera.SEDECARRERA_ID;
        option.textContent = `${descripcionCarrera} - ${descripcionSede}`;
        selectCarrera.appendChild(option);
    }
}
async function obtenerDescripcionCarrera(carreraID) {
    try {
        const response = await fetch(`http://localhost:8000/API/CARRERAS/${carreraID}`);
        const data = await response.json();
        const descripcionCarrera = data.DESCRIPCION;
        document.getElementById('carrera').value = descripcionCarrera;
        return data.DESCRIPCION;
    }
    catch (error) {
        console.error('error al obtener la descripcion de la carrera');
       
    }

}

async function obtenerDescripcionSede(sedeID){
    try{
        const response = await fetch(`http://localhost:8000/API/SEDES/${sedeID}`);
        const data = await response.json();
        const descripcionSede = data.DESCRIPCION //utilizando la DESCRIPCION de la sede
        //console.log('Descripción de la Sede:', descripcionSede)
        document.getElementById('sede').value = descripcionSede;
        return data.DESCRIPCION;
    }
    catch(error){
        console.error('error al obtener la descripcion de la sede')
    }

}

// #region trae los datos de los alumnos y los muestra en el modal
async function fetchAlumnos() {
    try {
        const responseAlumnos = await fetch(`http://localhost:8000/API/ALUMNOS/`);
        const data = await responseAlumnos.json();
        const selectAlumno = document.getElementById('selectAlumno')
        selectAlumno.innerHTML = '';

        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text = 'Seleccionar Materia';
        optionSeleccionar.value = '';
        selectAlumno.appendChild(optionSeleccionar);

        data.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.ALUMNO_ID;
            option.textContent = `${alumno.NOMBRE}-${alumno.APELLIDO}`;
            selectAlumno.appendChild(option);
        })
    }
    catch (error) {
        console.error('error al obtener el alumno')
    }
}

async function mostrarDatosAlumno(alumnoID) {
    try {

        const url = `http://localhost:8000/ALUMNOS/${alumnoID}`;
        console.log('URL de la solicitud:', url); // Aquí se imprime la URL

        const response = await fetch(`http://localhost:8000/API/ALUMNOS/${alumnoID}`);
        const data = await response.json();

        //Actualizar los campos del modal con los datos del docente seleccionado
        document.getElementById('nombre').value = data.NOMBRE;
        document.getElementById('apellido').value = data.APELLIDO;
        document.getElementById('dni').value = data.DNI;
        document.getElementById('Fnacimiento').value = data.FECHA_NACIMIENTO;
        document.getElementById('telefono').value = data.TELEFONO;
        document.getElementById('correo').value = data.EMAIL;
        document.getElementById('localidad').value = data.LOCALIDAD;
        document.getElementById('barrio').value = data.BARRIO;
        document.getElementById('direccion').value = data.DIRECCION;
        document.getElementById('piso').value = data.PISO;
        document.getElementById('depto').value = data.DEPTO;
        document.getElementById('contEmergencia').value = data.CONTACTO_EMERGENCIA;
        document.getElementById('telEmergencia').value = data.CONTACTO_EMERGECNIA_TEL;
    }
    catch (error) {
        console.error('Error al obtener datos del alumno', error)
    }
}
// #endregion
// #region Enviar el id a otra pagina par editar Alumnos
document.getElementById('editarAlumno').addEventListener('click', () => {
    const selectedAlumnoID = document.getElementById('selectAlumno').value;

    if (selectedAlumnoID) {
        window.location.href = `../Nueva carpeta/NuevoAlumno_editar.html?idAlumno=${selectedAlumnoID}`
    }
})

const formulario = document.getElementById('formulario');
const errorMessage = document.getElementById('error-message');
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const checkDocumento = document.getElementById('check1').checked ? 1 : 0;
    const checkAnalitico = document.getElementById('check2').checked ? 1 : 0;
    const checkTitulo = document.getElementById('check3').checked ? 1 : 0;
    const checkExamen = document.getElementById('check4').checked ? 1 : 0;

    const selectSedeCarrera = document.getElementById('selectSede').value;
    const selectAlumno = document.getElementById('selectAlumno').value;
    const coopImporte = document.getElementById('CoopImporte').value;
    const coopEstado = document.getElementById('CoopEstado').value;

    if(selectSedeCarrera&&selectAlumno&&coopImporte&&coopEstado)
    {
        const data = {
            SEDECARRERA_ID: selectSedeCarrera,
            ALUMNO_ID: selectAlumno,
            FOTOCOPIA_DOC_X2: checkDocumento,
            FOTOCOPIA_TITULO: checkTitulo,
            FOTOCOPIA_ANALITICO: checkAnalitico,
            EXAMEN_NIVELATORIO: checkExamen,
            COOPERADORA_TOTAL: coopImporte,
            COOPERADORA_ESTADO: coopEstado
        };
        console.log('Datos para la API:', data);
    
        fetch('http://localhost:8000/API/INSCRIPCIONES/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud HTTP');
                }
                return response.json();
            })
            .then(data => {
                console.log('Los datos se guardaron con éxito:', data);
                const toastSuccess = document.getElementById('toastSuccess');
                const toastSS = new bootstrap.Toast(toastSuccess);
                toastSS.show();

                //Redireccionar a Pagos
                const nuevaInscripcion =data.INSCRIPCION_ID
                //Controlar
                if (coppEstado!== 'pagado') {
                    const nuevaInscripcion = data.INSCRIPCION_ID;
                    setTimeout(() => {
                        window.location.href = `http://localhost/Nueva%20carpeta/CooperadoraPrimeraCarga.html?InscripcionesID=${nuevaInscripcion}`;
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error al guardar los datos:', error);
                const toastError = document.getElementById('toastError');
                const bsToastError = new bootstrap.Toast(toastError);
                bsToastError.show();
            });
    }
    else
    {
        const mensajeError = document.getElementById('mensajeError');
        mensajeError.classList.remove('d-none'); // Mostrar el mensaje de alerta
        mensajeError.classList.add('d-block'); // Asegurarse de que sea visible

    }
});

document.addEventListener('DOMContentLoaded', () => {
    fectchSedeCarrera()
    fetchAlumnos();
    const selectAlumno = document.getElementById('selectAlumno');

    selectAlumno.addEventListener('change', () => {
        const selectedOption = selectAlumno.value;
        console.log(`Opción seleccionada: ${selectedOption}`);
        mostrarDatosAlumno(selectedOption);
    });

    const selectSedeCarrera = document.getElementById('selectSede');
    selectSedeCarrera.addEventListener('change', () => {
        const selectedOption = selectSedeCarrera.value;
        console.log(`opcion seleccionada:${selectedOption}`);
    })
});
