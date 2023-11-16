async function fetchCarreras() {
    try {
        const responseCarreras = await fetch('http://localhost:8000/API/CARRERAS/');
        const data = await responseCarreras.json();

        const selectCarrera = document.getElementById('selectCarrera');
        selectCarrera.innerHTML = '';

        const OptionSeleccionar = document.createElement('option');
        OptionSeleccionar.text = 'Seleccionar Carrera';
        OptionSeleccionar.value = '';

        selectCarrera.appendChild(OptionSeleccionar);

        data.forEach(carrera => {
            const option = document.createElement('option');
            option.value = carrera.CARRERA_ID;
            option.textContent = carrera.DESCRIPCION;
            selectCarrera.appendChild(option);
        });

    }
    catch (error) {
        console.error('Error al obtener las Carreras:', error);
    }
}

async function fetchSedes() {
    try {
        const responseSedes = await fetch('http://localhost:8000/API/SEDES/');
        const data = await responseSedes.json();

        const selectSede = document.getElementById('selectSede');
        selectSede.innerHTML = '';

        const OptionSeleccionar = document.createElement('option');
        OptionSeleccionar.text = 'Seleccionar Sede';
        OptionSeleccionar.value = '';

        selectSede.appendChild(OptionSeleccionar);

        data.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede.SEDE_ID;
            option.textContent = sede.DESCRIPCION;
            selectSede.appendChild(option);
        });
    }
    catch(error){
        console.error('Error al obtener las sedes', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //Muestra carga los datos a los select
    fetchCarreras();
    fetchSedes();

document.getElementById('selectSede').addEventListener('change', mostrarDatosSede);
document.getElementById('selectCarrera').addEventListener('change', mostrarDatosCarrera);
});
async function mostrarDatosSede(){
    const sedeSeleccionada = document.getElementById('selectSede').value
    //logica para obtener los datos de la sede selccionada

    try{
        //reliza la peticion a la Api para obtener los datos de la sede
        const response = await fetch (`http://localhost:8000/API/SEDES/${sedeSeleccionada}`);
        const data = await response.json();

        //Actualiza los datos del modal con los datos obtenidos
        document.getElementById('descripcionSede').value= data.DESCRIPCION;
        document.getElementById('telefonoSede').value= data.TELEFONO;
        document.getElementById('emailSede').value=data.EMAIL;
        document.getElementById('localidadSede').value=data.LOCALIDAD;
        document.getElementById('barrioSede').value=data.SEDE;
        document.getElementById('direccionSede').value=data.DIRECCION;
        document.getElementById('pisoSede').value=data.PISO;
        document.getElementById('deptoSede').value=data.DEPTO;
        document.getElementById('diaDeSede').value=data.DIA_DESDE;
        document.getElementById('diaASede').value=data.DIA_HASTA;
        document.getElementById('horaDesdeSede').value=data.HORA_DESDE;
        document.getElementById('horaHastaSede').value=data.HORA_HASTA;
    }
    catch(error){
        console.error('Error al obtener datos de la sede', error);

    }
}

async function mostrarDatosCarrera(){
    const carreraSeleccionada = document.getElementById('selectCarrera').value
    //logica para obtener los datos de la carrera seleccionada

    try{ 
        //realiza la peticion a la Api para obtener los datos de la sede
        const response = await fetch (`http://localhost:8000/API/CARRERAS/${carreraSeleccionada}`);
        const data = await response.json();

        console.log(data);

        //Actualiza los campos del modal 
        document.getElementById('descripcionCarrera').value= data.DESCRIPCION;
        document.getElementById('planCarrera').value=data.PLAN_CARRERA;
        document.getElementById('fechaInicioCarrera').value=data.PLAN_START_DATE;
        document.getElementById('fechaCierreCarrera').value=data.PLAN_END_DATE;
    }
    catch(error){
        console.error('Error al obtener datos de la carrera', error);
    }

}