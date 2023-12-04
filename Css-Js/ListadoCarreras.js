document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos()

    const buscarInput = document.getElementById('inputBuscar');
    buscarInput.addEventListener('input',()=>{
        buscarCarrera(buscarInput.value); //pasar el valor del input como parámetro de busqueda
    })

});

// #region Mostrar y Eliminar los datos 
async function mostrarDatos() {
    try {
        const response = await fetch('http://localhost:8000/API/CARRERAS/');
        const data = await response.json();

        const tablaCarreras = document.getElementById('tabla-carrera');
        tablaCarreras.innerHTML = '';

        data.forEach((carreras, index) => {
            const fila = document.createElement('tr');

            //celda con el numero de fila
            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            const celdaId = document.createElement('td');
            celdaId.textContent = carreras.CARRERA_ID;
            fila.appendChild(celdaId);

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = carreras.DESCRIPCION;
            fila.appendChild(celdaDescripcion);

            const celdaPlan = document.createElement('td');
            celdaPlan.textContent = carreras.PLAN_CARRERA;
            fila.appendChild(celdaPlan);

            const celdaPlanStartDate = document.createElement('td');
            celdaPlanStartDate.textContent = carreras.PLAN_START_DATE;
            fila.appendChild(celdaPlanStartDate);

            const celdaPlanEndDate = document.createElement('td');
            celdaPlanEndDate.textContent = carreras.PLAN_END_DATE;
            fila.appendChild(celdaPlanEndDate);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>`;
            botonEliminar.addEventListener('click', async () => {
                const idCarreras = carreras.CARRERA_ID;
                const confirmacion = confirm('Estas por eliminar una Carrera,¿estas seguro?')
                if (confirmacion) {
                    try {
                        const response = await fetch(`http://localhost:8000/API/CARRERAS/delete/${idCarreras}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        if (response.ok) {
                            fila.remove();
                        }
                        else {
                            console.error('error al eliminar la Carrera')
                        }
                    }
                    catch (error) {
                        console.error('Error al eliminar la Carrera', error);
                    }
                }
            });
            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);
            tablaCarreras.appendChild(fila);

        });
    }
    catch (error) {
        console.error('Error al buscar una materia', error);
    }
}
// #endregion
// #region BUscar y Eliminar los datos
async function buscarCarrera(parametroBusqueda) {
    try {
        const buscarValor = parametroBusqueda.trim();
        const response = await fetch(`http://localhost:8000/API/CARRERAS/?descripcion=${buscarValor}`);
        const data = await response.json();
        const tablaCarreras = document.getElementById('tabla-carrera');
        tablaCarreras.innerHTML = '';
        data.forEach((carreras, index) => {
            const fila = document.createElement('tr');

            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            const celdaId = document.createElement('td');
            celdaId.textContent = carreras.CARRERA_ID;
            fila.appendChild(celdaId);

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = carreras.DESCRIPCION;
            fila.appendChild(celdaDescripcion);

            const celdaPlan = document.createElement('td');
            celdaPlan.textContent = carreras.PLAN_CARRERA;
            fila.appendChild(celdaPlan);

            const celdaPlanStartDate = document.createElement('td');
            celdaPlanStartDate.textContent = carreras.PLAN_START_DATE;
            fila.appendChild(celdaPlanStartDate);

            const celdaPlanEndDate = document.createElement('td');
            celdaPlanEndDate.textContent = carreras.PLAN_END_DATE;
            fila.appendChild(celdaPlanEndDate);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>`;
            botonEliminar.addEventListener('click', async () => {
                const idCarreras = carreras.CARRERA_ID;
                const confirmacion = confirm('estas por eliminar una Carrera¿estas seguro?');
                if (confirmacion) {
                    try {
                        const response = await fetch(`http://localhost:8000/API/CARRERAS/delete/${idCarreras}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });
                        if (response.ok) {
                            fila.remove();
                        } else {
                            console.error('Error al Eliminar la Materia')
                        }
                    } catch (error) {
                        console.error('Error al eliminar la Materia', error);
                    }
                }
            });

            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);
            tablaCarreras.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al buscar una materia', error);
    }
}
// #endregion
