document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos()

    const buscarInput = document.getElementById('inputBuscar');
    buscarInput.addEventListener('input', () => {
        buscarPersonal(buscarInput.value); //pasar el valor del input como parámetro de busqueda
    })

});
// #region Mostrar todos los datos en la tabla y method Delete
async function mostrarDatos() {
    try {
        const response = await fetch('http://localhost:8000/API/PRECEPTORES/');
        const data = await response.json();

        const tablaPersonal = document.getElementById('tabla-personal');
        tablaPersonal.innerHTML = '';

        data.forEach((personal, index) => {
            const fila = document.createElement('tr');

            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            const celdaId = document.createElement('td');
            celdaId.textContent = personal.PRECEPTOR_ID;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = personal.NOMBRE;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = personal.APELLIDO
            fila.appendChild(celdaApellido)

            const celdaDni = document.createElement('td');
            celdaDni.textContent = personal.DNI;
            fila.appendChild(celdaDni);

            const celdaFnacimiento = document.createElement('td');
            celdaFnacimiento.textContent = personal.FECHA_NACIMIENTO;
            fila.appendChild(celdaFnacimiento);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = personal.TELEFONO;
            fila.appendChild(celdaTelefono);

            const celdaEmail = document.createElement('td');
            celdaEmail.textContent = personal.EMAIL;
            fila.appendChild(celdaEmail);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>`;

            botonEliminar.addEventListener('click', async () => {
                const idPersonal = personal.PRECEPTOR_ID;
                const confirmacion = confirm('Estas por eliminar una Sede, ¿estas seguro?');
                if (confirmacion) {
                    try {
                        const response = await fetch(`http://localhost:8000/API/PRECEPTORES/delete/${idPersonal}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        if (response.ok) {
                            fila.remove();
                        } else {
                            console.error('Error al eliminar la Sede')
                        }
                    } catch (error) {
                        console.error('Error al eliminar la Sede', error);
                    }
                }
            });
            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);
            tablaPersonal.appendChild(fila);
        });
    }
    catch (error) {
        console.error('Error al buscar una sede', error);
    }
}
// #endregion
async function buscarPersonal(parametroBusqueda) {
    try {
        const buscarValor = parametroBusqueda.trim();
        const response = await fetch(`http://localhost:8000/API/PRECEPTORES/?filtro=${buscarValor}`);
        const data = await response.json();
        const tablaPersonal = document.getElementById('tabla-personal');
        tablaPersonal.innerHTML = '';

        data.forEach((personal, index) => {
            const fila = document.createElement('tr');

            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            const celdaId = document.createElement('td');
            celdaId.textContent = personal.PRECEPTOR_ID;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = personal.NOMBRE;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = personal.APELLIDO
            fila.appendChild(celdaApellido)

            const celdaDni = document.createElement('td');
            celdaDni.textContent = personal.DNI;
            fila.appendChild(celdaDni);

            const celdaFnacimiento = document.createElement('td');
            celdaFnacimiento.textContent = personal.FECHA_NACIMIENTO;
            fila.appendChild(celdaFnacimiento);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = personal.TELEFONO;
            fila.appendChild(celdaTelefono);

            const celdaEmail = document.createElement('td');
            celdaEmail.textContent = personal.EMAIL;
            fila.appendChild(celdaEmail);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>`;

            botonEliminar.addEventListener('click', async () => {
                const idPersonal = personal.PRECEPTOR_ID;
                const confirmacion = confirm('Estas por eliminar una Sede, ¿estas seguro?');
                if (confirmacion) {
                    try {
                        const response = await fetch(`http://localhost:8000/API/PRECEPTORES/delete/${idPersonal}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        if (response.ok) {
                            fila.remove();
                        } else {
                            console.error('Error al eliminar la Sede')
                        }
                    } catch (error) {
                        console.error('Error al eliminar la Sede', error);
                    }
                }
            });
            celdaEliminar.appendChild(botonEliminar);
            fila.appendChild(celdaEliminar);
            tablaPersonal.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al buscar una materia', error);
    }
}