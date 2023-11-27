document.addEventListener('DOMContentLoaded', () => {
    //Muestra los datos en el select
    fectchSedeCarrera();
    fetchMateria();
    fetchDocente();
    fetchPreceptor();
    //evento para mostrar TURNO y CODIGO dentro del modal
    const selectCarrera = document.getElementById('selectCarrera');
    selectCarrera.addEventListener('change', () => {
        const selectedOption = selectCarrera.value;
        //Llamar a la funcion para actualizar el modal con los datos correspondientes a la opcion seleccionada
        actualizarModal(selectedOption);
    });

    const selectDocente = document.getElementById('selectDocente');
    selectDocente.addEventListener('change', () => {
        // Obtener el valor seleccionado en el select
        const selectedDocenteId = selectDocente.value;

        // Llamar a una función para actualizar el modal con los datos correspondientes al docente seleccionado
        mostrarDatosDocente(selectedDocenteId);
    });

    const selectPreceptor = document.getElementById('selectPreceptor');
    selectPreceptor.addEventListener('change', () => {
        const selectedPreceptorId = selectPreceptor.value;

        showSelectedPreceptorData(selectedPreceptorId);
    })
});


// #region Traer los datos y mostrarlos en el Select.
async function fectchSedeCarrera() {
    try {
        const responseSedeCarreras = await fetch('http://localhost:8000/API/SEDECARRERA/');
        const data = await responseSedeCarreras.json();

        const selectCarrera = document.getElementById('selectCarrera');
        selectCarrera.innerHTML = '';

        const OptionSeleccionar = document.createElement('option');
        OptionSeleccionar.text = 'seleccionar Carrera';
        OptionSeleccionar.value = '';

        selectCarrera.appendChild(OptionSeleccionar);

        //Llamada a una funcion para obterner las descripciones correspondientes a sus ids

        await populateSelectWithDescriptions(data, selectCarrera);
    }
    catch (error) {
        console.error('Error en las Carreras', error);
    }
}
async function populateSelectWithDescriptions(data, selectCarrera) {
    for (const carrera of data) {
        //Realiza las llamadas para obtener las descripciones usando los IDs de la carrera y la sede
        const descripcionCarrera = await obtenerDescripcionCarrera(carrera.CARRERA_ID);
        const descripcionSede = await obtenerDescripcionSede(carrera.SEDE_ID)

        //crear y añadir opciones al select con las descripciones obtenidas
        const option = document.createElement('option');
        option.value = carrera.SEDECARRERA_ID;
        option.textContent = `${descripcionCarrera} - ${descripcionSede}`;
        selectCarrera.appendChild(option);
    }
}

async function obtenerDescripcionCarrera(carreraID) {
    try {

        //console.log('ID de Carrera:', carreraID);

        const response = await fetch(`http://localhost:8000/API/CARRERAS/${carreraID}`);
        const data = await response.json();
        const descripcionCarrera = data.DESCRIPCION //utilizando el campo DESCRIPCION de la carrera
        //console.log('Descripción de la Carrera:', descripcionCarrera);
        document.getElementById('carrera').value = descripcionCarrera;
        return data.DESCRIPCION;
    }
    catch (error) {
        console.error('error al obtener la descripcion de la Carrera', error);
        return `Error:Descripcion no disponible para la carrera: $(carreraID)`;
    }
}

async function obtenerDescripcionSede(sedeID) {
    try {

        //console.log('ID de Sede:', sedeID);

        const response = await fetch(`http://localhost:8000/API/SEDES/${sedeID}`);
        const data = await response.json();
        const descripcionSede = data.DESCRIPCION //utilizando la DESCRIPCION de la sede
        //console.log('Descripción de la Sede:', descripcionSede)
        document.getElementById('sede').value = descripcionSede;
        return data.DESCRIPCION;
    }
    catch (error) {
        console.error('error al obtener la descripcion de la Sede', error);
        return `Error:Descripcion no disponible para la sede: $(carreraID)`;
    }
}
// #endregion
// #region MUestra los datos de TURNO Y CODIGO_CARRERA
async function actualizarModal(seleccion) {
    try {
        //realiza una llamada a tu api para obtener los datos segun la seleccion 
        const response = await fetch(`http://localhost:8000/API/SEDECARRERA/${seleccion}`);
        const data = await response.json();

        const turnoTraducido = traducirTurno(data.TURNO)

        console.log('Datos de la selección en el selectCarrera:', data);
        //Actualiza los campos del modal con los datos obtenidos

        document.getElementById('turno').value = turnoTraducido;
        document.getElementById('codigo').value = data.CODIGO_CARRERA;


    }
    catch (error) {
        console.error('Error al actualizar el modal', error);
    }
}

function traducirTurno(numeroTurno) {
    switch (numeroTurno) {
        case '1':
            return 'mañana';
        case '2':
            return 'tarde';
        case '3':
            return 'noche';
        default:
            return 'Desconocido';
    }
}

// #endregion
// #region Muestra los datos en el select de Materias y en el modal
async function fetchMateria() {
    try {
        const responseMaterias = await fetch('http://localhost:8000/API/MATERIAS/');
        const data = await responseMaterias.json();

        const selectMateria = document.getElementById('selectMateria');
        selectMateria.innerHTML = '';
        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text = 'seleccionar Materia';
        optionSeleccionar.value = '';
        selectMateria.appendChild(optionSeleccionar);

        data.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia.MATERIA_ID;
            option.textContent = materia.DESCRIPCION;
            selectMateria.appendChild(option);
        })

    }
    catch (error) {
        console.error('error al obtener las materias', error);
    }
}

async function cargarDatosMateria() {
    const selectMateria = document.getElementById('selectMateria');
    const selectedMateriaID = selectMateria.value;
    try {
        const response = await fetch(`http://localhost:8000/API/MATERIAS/${selectedMateriaID}`);
        const data = await response.json();

        // Actualizar los campos del modal con los datos de la materia
        document.getElementById('descripcion').value = data.DESCRIPCION;
        document.getElementById('resolucion').value = data.COD_RESOLUCION;
        document.getElementById('año').value = data.CARRERA_ANIO;

    } catch (error) {
        console.error('Error al cargar datos de la materia', error);
    }
}
document.getElementById('modalMateria').addEventListener('shown.bs.modal', function () {
    cargarDatosMateria();
});
// #endregion
// #region Traer los datos y mostrarlos en un select y despues en un Modal DOCENTE
async function fetchDocente() {
    try {
        const responseDocente = await fetch('http://localhost:8000/API/DOCENTES/')
        const data = await responseDocente.json();

        const selectDocente = document.getElementById('selectDocente');
        selectDocente.innerHTML = '';
        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text = 'seleccionar Docente';
        optionSeleccionar.value = '';
        selectDocente.appendChild(optionSeleccionar);

        data.forEach(docente => {
            const option = document.createElement('option');
            option.value = docente.DOCENTE_ID;
            option.textContent = `${docente.NOMBRE} ${docente.APELLIDO}`; // Combinar nombre y apellido
            selectDocente.appendChild(option);

        })
    }
    catch (error) {
        console.error('error al obtener los docente', error)
    }
}

async function mostrarDatosDocente(docenteId) {
    try {
        const response = await fetch(`http://localhost:8000/API/DOCENTES/${docenteId}`);
        const data = await response.json();

        // Actualizar los campos del modal con los datos del docente seleccionado
        document.getElementById('nombre').value = data.NOMBRE;
        document.getElementById('apellido').value = data.APELLIDO;
        document.getElementById('dni').value = data.DNI;
        document.getElementById('fechaNacimento').value = data.FECHA_NACIMIENTO;
        document.getElementById('email').value = data.EMAIL;
        document.getElementById('telefono').value = data.TELEFONO;

        // Aquí puedes agregar más campos si es necesario
    } catch (error) {
        console.error('Error al obtener datos del docente', error);
    }
}
// #endregion
// #region Trae los Datos del preceptor los muestra en el select y despues en el modal
async function fetchPreceptor() {
    try {

        const responsePre = await fetch('http://localhost:8000/API/PRECEPTORES')
        const data = await responsePre.json();
        const selectPreceptor = document.getElementById('selectPreceptor');
        selectPreceptor.innerhtml = '';
        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text = 'seleccionar Preceptor';
        optionSeleccionar.value = '';
        selectPreceptor.appendChild(optionSeleccionar);

        data.forEach(preceptor => {
            const option = document.createElement('option');
            option.value = preceptor.PRECEPTOR_ID;
            option.textContent = `${preceptor.NOMBRE} ${preceptor.APELLIDO}` //combinar nombre y apellido
            selectPreceptor.appendChild(option);
        })
    }
    catch (error) {
        console.error('error al obtener los preceptores', error);
    }
}

async function showSelectedPreceptorData() {
    const selectPreceptor = document.getElementById('selectPreceptor');
    const selectedPreceptorId = selectPreceptor.value;

    if (selectedPreceptorId) {
        try {
            const response = await fetch(`http://localhost:8000/API/PRECEPTORES/${selectedPreceptorId}`);
            const preceptorData = await response.json();

            console.log(preceptorData);
            document.getElementById('nombrePre').value = preceptorData.NOMBRE;
            document.getElementById('apellidoPre').value = preceptorData.APELLIDO;
            document.getElementById('dniPre').value = preceptorData.DNI;
            document.getElementById('fechaNacimentoPre').value = preceptorData.FECHA_NACIMIENTO;
            document.getElementById('emailPre').value = preceptorData.EMAIL;
            document.getElementById('telefonoPre').value = preceptorData.TELEFONO;
        } catch (error) {
            console.error('Error al obtener los datos del preceptor', error);
        }
    } else {
        // Limpiar los campos si no se selecciona ningún preceptor
        document.getElementById('nombrePre').value = '';
        document.getElementById('apellidoPre').value = '';
        document.getElementById('dniPre').value = '';
        document.getElementById('fechaNacimentoPre').value = '';
        document.getElementById('emailPre').value = '';
        document.getElementById('telefonoPre').value = '';
    }
}

// #endregion

// #region boton editar SedeCarrera
document.getElementById('editarSedeCarrera').addEventListener('click', () => {
    const selectedId = document.getElementById('selectCarrera').value; // Obtener el ID seleccionado

    if (selectedId) {
        window.location.href = `../Nueva carpeta/SedeCarrera_editar.html?idSedeCarrera=${selectedId}`; // Redirigir a la página destino con el parámetro
    }
});
// #endregion
// #region boton editarMateria
document.getElementById('editarMateria').addEventListener('click', () => {
    const selectedId = document.getElementById('selectMateria').value; //obtener el id Seleccionado

    if (selectedId) {
        window.location.href = `../Nueva carpeta/NuevaMateria_editar.html?idSedeCarrera=${selectedId}`
    }
});
// #endregion
// #region boton editarDocente
document.getElementById('editarDocente').addEventListener('click', () => {
    const selectedId = document.getElementById('selectDocente').value; // Obtener el id seleccionado

    if (selectedId) {
        window.location.href = `../Nueva carpeta/NuevoDocente_editar.html?idSedeCarrera=${selectedId}`;
    }
});

// #endregion
// #region boton editarPersonal

document.getElementById('editarPersonal').addEventListener('click', () => {
    const selectedId = document.getElementById('selectPreceptor').value; // Obtener el id seleccionado

    if (selectedId) {
        window.location.href = `../Nueva carpeta/NuevoPersonal_editar.html?idSedeCarrera=${selectedId}`;
    }
});
//#endregion

const formulario = document.getElementById('formulario');
const errorMessage = document.getElementById('error-message')

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const checkbox = document.getElementById('inputReg');

    checkbox.addEventListener('change', function() {
        const valor = this.checked ? 1 : 0;
        console.log('Valor:', valor);
    });
    
    //capturar valores de los campos del formulario 
    const carrera = document.getElementById('selectCarrera').value;
    const materia = document.getElementById('selectMateria').value;
    const docente = document.getElementById('selectDocente').value;
    const preceptor = document.getElementById('selectPreceptor').value;
    const curso = document.getElementById('inputCurso').value;
    const cicloLectivo = document.getElementById('inputCiclo').value; 

    //validar envio de chebox sin cambio

    const checkRegu= document.getElementById('inputReg');
    const regularidad = checkRegu.checked? 1:0 ;

    // Validar que la regularidad y el ciclo lectivo sean valores numéricos
    if (isNaN(cicloLectivo)) {
        errorMessage.textContent = 'Por favor, ingresa valores numéricos para regularidad y ciclo lectivo.';
        errorMessage.style.display = 'block';

        // Mostrar el Toast de error o realizar alguna otra acción
        const toastError = document.getElementById('toastError');
        const bsToastError = new bootstrap.Toast(toastError);
        bsToastError.show();
        return;
    }

    //validar que los select no esten vacios
    if(carrera=== ''|| materia=== ''){
        errorMessage.textContent='No ha seleccionado ninguna Sede y Carrera.';
        errorMessage.style.display='block';
        // Mostrar el Toast de error o realizar alguna otra acción
        const toastError = document.getElementById('toastError');
        const bsToastError = new bootstrap.Toast(toastError);
        bsToastError.show();
        return;
    }

    //validar que el ciclo lectivo no este vacio

    if(cicloLectivo===''){
        errorMessage.textContent = 'No ha ingresado el Ciclo Lectivo';
        errorMessage.style.display='block';
        // Mostrar el Toast de error o realizar alguna otra acción
        const toastError = document.getElementById('toastError');
        const bsToastError = new bootstrap.Toast(toastError);
        bsToastError.show();
        return;
    }

    // Ocultar el mensaje de error si no hay problemas
    errorMessage.style.display = 'none';

    const datos = {
        CARRERA_ID: carrera,
        MATERIA_ID: materia,
        DOCENTE_ID: docente||null,
        PRECEPTOR_ID: preceptor||null,
        CURSO: curso,
        REGULARIZABLE: regularidad,
        CICLO_LECTIVO: cicloLectivo
    }
    console.log('datos enviados a la api', datos)

    //enviar datos a la api

    fetch('http://localhost:8000/API/MATERIACARRERA/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('error en la solicitud HTTP')
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos guardados con exito', data);

            //redireccionar a Horarios
            const nuevaSedeCarreraID = data.id;

            const toastSuccess = document.getElementById('toastSuccess');
            const toastSS = new bootstrap.Toast(toastSuccess);
            toastSS.show();

            setTimeout(() => {
                window.location.href = `../Nueva carpeta/Horarios.html?SEDECARRERA_ID=${nuevaSedeCarreraID}`
            }, 3000);
        })
        .catch(error => {   
            console.error('Error al enviar datos a la Api', error.message);
            // Mostrar el Toast de error o realizar alguna otra acción
            const toastError = document.getElementById('toastError');
            const bsToastError = new bootstrap.Toast(toastError);
            bsToastError.show();
        });

});