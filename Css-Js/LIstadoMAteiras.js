document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos()

    const buscarInput = document.getElementById('inputBuscar');
    buscarInput.addEventListener('input', () => {
        buscarMateria(buscarInput.value); // Pasar el valor del input como parámetro de búsqueda
    });
})
async function mostrarDatos() {
    try {
        const response = await fetch('http://localhost:8000/API/MATERIAS/');
        const data = await response.json();
        console.log(data)

        const tablaMaterias = document.getElementById('tabla-materias');
        tablaMaterias.innerHTML = '';

        // #region Region buscar datos en la Api y Rellar la tabla
        data.forEach((materias, index) => {
            const fila = document.createElement('tr');

            //Celda con el numero de fila
            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            //resto de datos
            const celdaId = document.createElement('td')
            celdaId.textContent = materias.MATERIA_ID;
            fila.appendChild(celdaId);

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = materias.DESCRIPCION;
            fila.appendChild(celdaDescripcion);

            const celdaCod = document.createElement('td');
            celdaCod.textContent = materias.COD_RESOLUCION;
            fila.appendChild(celdaCod);

            const celdaAño = document.createElement('td');
            celdaAño.textContent = materias.CARRERA_ANIO;
            fila.appendChild(celdaAño);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>`;
            // #region fuction eliminar
            botonEliminar.addEventListener('click', async () => {
                const idMaterias = materias.MATERIA_ID;
                try {
                    const response = await fetch(`http://localhost:8000/API/MATERIAS/delete/${idMaterias}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    if (response.ok) {
                        fila.remove();
                    }
                    else {
                        console.error('Error al eliminar la Materia ');
                    }
                }
                catch (error) {
                    console.error('Error al eliminar la Materia ', error);
                }
            })
            // #endregion



            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);
            tablaMaterias.appendChild(fila);

        });
        // #endregion
    }
    catch (error) {
        console.error('Error al buscar una materia', error);
    }

}

async function buscarMateria(parametroBusqueda) {
    try {
        const buscarInput = document.getElementById('inputBuscar')
        const buscarValor = buscarInput.value.trim();

        const response = await fetch(`http://localhost:8000/API/MATERIAS/?filtro=${buscarValor}`);
        const data = await response.json();
        const tablaMaterias = document.getElementById('tabla-materias');
        tablaMaterias.innerHTML = '';

        data.forEach((materias, index) => {
            const fila = document.createElement('tr'); // Se crea la fila aquí para cada iteración

            //Celda con el numero de fila
            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            //resto de datos
            const celdaId = document.createElement('td')
            celdaId.textContent = materias.MATERIA_ID;
            fila.appendChild(celdaId);

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = materias.DESCRIPCION;
            fila.appendChild(celdaDescripcion);

            const celdaCod = document.createElement('td');
            celdaCod.textContent = materias.COD_RESOLUCION;
            fila.appendChild(celdaCod);

            const celdaAño = document.createElement('td');
            celdaAño.textContent = materias.CARRERA_ANIO;
            fila.appendChild(celdaAño);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>`;

            botonEliminar.addEventListener('click', async () => {
                const idMaterias = materias.MATERIA_ID;
                try {
                    const response = await fetch(`http://localhost:8000/API/MATERIAS/delete/${idMaterias}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    if (response.ok) {
                        fila.remove();
                    } else {
                        console.error('Error al eliminar la Materia');
                    }
                } catch (error) {
                    console.error('Error al eliminar la Materia', error);
                }
            });

            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);

            tablaMaterias.appendChild(fila); // La fila se añade a la tabla después de ser completada
        });
    } catch (error) {
        console.error('Error al buscar una materia', error);
    }
}
