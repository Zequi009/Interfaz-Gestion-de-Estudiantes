document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos();

    const buscarInput = document.getElementById('buscarDocente');
    buscarInput.addEventListener('input', () => {
        buscarDocente(buscarInput.value); // Pasar el valor del input como parámetro de búsqueda
    });
})
// #region Funcion Mostrar Datos
async function mostrarDatos() {
    try {
        const response = await fetch('http://localhost:8000/API/DOCENTES/');
        const data = await response.json();

        const tablaDocentes = document.getElementById('tabla-docente');
        tablaDocentes.innerHTML = '';

        // #region Busca los datos en la Api y los Rellena
        data.forEach((docente, index) => {
            const fila = document.createElement('tr');

            // Celda con el número de fila
            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            // Celdas con los datos de los alumnos
            const celdaId = document.createElement('td');
            celdaId.textContent = docente.DOCENTE_ID;
            fila.appendChild(celdaId);

            const celdaDni = document.createElement('td');
            celdaDni.textContent = docente.DNI;
            fila.appendChild(celdaDni);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = docente.NOMBRE;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = docente.APELLIDO;
            fila.appendChild(celdaApellido);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = docente.TELEFONO;
            fila.appendChild(celdaTelefono);

            const celdaCorreo = document.createElement('td');
            celdaCorreo.textContent = docente.EMAIL;
            fila.appendChild(celdaCorreo);
            // Celda para el botón de eliminar
            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>`;

            // #region methodo Eliminar
            botonEliminar.addEventListener('click', async () => {
                const idDocente = docente.DOCENTE_ID;
                const confirmacion = confirm('estas por eliminar este alumno, ¿estas seguro?')

                if(confirmacion){
                    try {
                        const response = await fetch(`http://localhost:8000/API/DOCENTES/delete/${idDocente}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });
                        if (response.ok) {
                            fila.remove(); // Elimina la fila de la tabla si la eliminación fue exitosa
                            const toastDelete = document.getElementById('toastDelete');
                            const bstoastDelete = new bootstrap.Toast(toastDelete);
                            bstoastDelete.show();
                        } else {
                            console.error('Error al eliminar el Alumno');
                        }
                    } catch (error) {
                        console.error('Error al eliminar al alumno', error);
                    }
                }
            });
            // #endregion

            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);

            tablaDocentes.appendChild(fila);
        });
        // #endregion
    } catch (error) {
        console.error('Error al mostrar los datos', error);
    }
}
// #endregion
// #region Boton buscar
async function buscarDocente(parametroBusqueda){
    try{
        const buscarInput = document.getElementById('buscarDocente'); // Corregido el ID
        const valorBusqueda = buscarInput.value.trim();

        const response = await fetch(`http://localhost:8000/API/DOCENTES/?filtro=${valorBusqueda}`);
        const data = await response.json();
        const tablaDocentes = document.getElementById('tabla-docente');
        tablaDocentes.innerHTML = '';
        // #region mostrar los elementos en la tabla
        data.forEach((docente, index) => {
            const fila = document.createElement('tr');

            // Celda con el número de fila
            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            // Celdas con los datos de los alumnos
            const celdaId = document.createElement('td');
            celdaId.textContent = docente.ALUMNO_ID;
            fila.appendChild(celdaId);

            const celdaDni = document.createElement('td');
            celdaDni.textContent = docente.DNI;
            fila.appendChild(celdaDni);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = docente.NOMBRE;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = docente.APELLIDO;
            fila.appendChild(celdaApellido);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = docente.TELEFONO;
            fila.appendChild(celdaTelefono);

            const celdaCorreo = document.createElement('td');
            celdaCorreo.textContent = docente.EMAIL;
            fila.appendChild(celdaCorreo);

            // Celda para el botón de eliminar
            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>`;

            // #region methodo Eliminar
            botonEliminar.addEventListener('click', async () => {
                const idDocentes = docente.DOCENTE_ID;

                try {
                    const response = await fetch(`http://localhost:8000/API/DOCENTES/delete/${idDocentes}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    if (response.ok) {
                        fila.remove(); // Elimina la fila de la tabla si la eliminación fue exitosa
                        const toastDelete = document.getElementById('toastDelete');
                        const bstoastDelete = new bootstrap.Toast(toastDelete);
                        bstoastDelete.show();
                    } else {
                        console.error('Error al eliminar el Docente');
                    }
                } catch (error) {
                    console.error('Error al eliminar al Docente', error);
                }
            });
            // #endregion

            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);

            tablaDocentes.appendChild(fila);
        });
        
        // #endregion
    }
    catch(error){
        console.error('Error al buscar el alumno', error);
    }
}
// #endregion