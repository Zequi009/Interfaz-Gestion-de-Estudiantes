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
    fetchCarreras();
    fetchSedes();
});
