document.addEventListener('DOMContentLoaded', () => {
    fetchSedeCarrera();
    fetchAlumnos();
    const selectAlumno = document.getElementById('selectAlumno');
    selectAlumno.addEventListener('change',()=>{
        const selectedOption = selectAlumno.value;
        console.log(`Opción seleccionada: ${selectedOption}`);
        mostrarDatosAlumno(selectedOption);
    });

});
const selectSedeCarrera = document.getElementById('selectSede');
const selectAlumno = document.getElementById('selectAlumno')

// #region Traer los datos de SEDECARRERA y mostrarlos en el select
async function fetchSedeCarrera() {
    try {
        const responseSedeCarreras = await fetch('http://localhost:8000/API/SEDECARRERA/')
        const data = await responseSedeCarreras.json();

        selectSedeCarrera.innerHTML = '';

        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text = 'Seleccionar una Carrera';
        optionSeleccionar.value = '';

        selectSedeCarrera.appendChild(optionSeleccionar)

        //llamando a una funcion para buscar las descripciones por los select

        await selectDescripcion(data, selectSedeCarrera);
    }
    catch (error) {
        console.error('Error en las Carreras', error)
    }
}
async function selectDescripcion(data, SedeCarrera) {
    for (const carrera of data) {
        //realiza las llamadas paa obterner las descripciones usando los IDs de la carrera y la sede
        const descripcionCarrera = await obtenerDescripcionCarrera(carrera.CARRERA_ID);
        const descripcionSede = await obtenerDescripcionSede(carrera.SEDE_ID);


        //Crear y añadir opciones al select con las descripciones
        const option = document.createElement('option');
        option.value = carrera.SEDECARREA_ID;
        option.textContent = `${descripcionCarrera}-${descripcionSede}`;
        selectSedeCarrera.appendChild(option)
    }
}
//busca las descripciones en Carreras
async function obtenerDescripcionCarrera(carreraID) {
    try {
        const response = await fetch(`http://localhost:8000/API/CARRERAS/${carreraID}`);
        const data = await response.json();
        const descripcionCarrera = data.DESCRIPCION;
        // document.getElementById('carrera').value = descripcionCarrera;
        return data.DESCRIPCION;
    }
    catch (error) {
        console.error('error al obtener la descripcion de la carrera, error')
        return `Error: Descripcion no disponible para la carrera:$(carreraID)`
    }
}

//buscar las descripciones en Sedes
async function obtenerDescripcionSede(sedeID) {
    try {
        const response = await fetch(`http://localhost:8000/API/SEDES/${sedeID}`)
        const data = await response.json();
        const descripcionSede = data.DESCRIPCION
        // document.getElementById('sede').value = descripcionSede;
        return data.DESCRIPCION;
    }
    catch (error) { }
}
// #endregion

// #region Trae los datos de Alumnos los muestra en el select y en el modal
async function fetchAlumnos(){
    try{
        const responseAlumnos = await fetch(`http://localhost:8000/API/ALUMNOS/`);
        const data = await responseAlumnos.json();
        const selectAlumno = document.getElementById('selectAlumno')
        selectAlumno.innerHTML ='';
        
        const optionSeleccionar = document.createElement('option');
        optionSeleccionar.text='Seleccionar Materia';
        optionSeleccionar.value = '';
        selectAlumno.appendChild(optionSeleccionar);

        data.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.ALUMNO_ID;
            option.textContent = `${alumno.NOMBRE}-${alumno.APELLIDO}`;
            selectAlumno.appendChild(option);
        })
    }
    catch(error){
        console.error('error al obtener el alumno')
    }
}

async function mostrarDatosAlumno(alumnoID){
    try{

        const url = `http://localhost:8000/ALUMNOS/${alumnoID}`;
        console.log('URL de la solicitud:', url); // Aquí se imprime la URL

        const response= await fetch(`http://localhost:8000/API/ALUMNOS/${alumnoID}`);
        const data = await response.json();

        //Actualizar los campos del modal con los datos del docente seleccionado
        document.getElementById('nombre').value=data.NOMBRE;
        document.getElementById('apellido').value=data.APELLIDO;
        document.getElementById('dni').value = data.DNI;
        document.getElementById('Fnacimiento').value =data.FECHA_NACIMIENTO;
        document.getElementById('telefono').value = data.TELEFONO;
        document.getElementById('correo').value = data.EMAIL;
        document.getElementById('localidad').value = data.LOCALIDAD;
        document.getElementById('barrio').value = data.BARRIO;
        document.getElementById('direccion').value = data.DIRECCION;
        document.getElementById('piso').value=data.PISO;
        document.getElementById('depto').value= data.DEPTO;
        document.getElementById('contEmergencia').value = data.CONTACTO_EMERGENCIA;
        document. getElementById('telEmergencia').value = data.CONTACTO_EMERGECNIA_TEL;
    }
    catch(error){
        console.error('Error al obtener datos del alumno', error)
    }
}
// #endregion
document.getElementById('editarAlumno').addEventListener('click',()=>{
    const selectedAlumnoID = document.getElementById('selectAlumno').value;

    if(selectedAlumnoID){
        window.location.href=`../Nueva carpeta/NuevoAlumno_editar.html?idAlumno=${selectedAlumnoID}`
    }
})