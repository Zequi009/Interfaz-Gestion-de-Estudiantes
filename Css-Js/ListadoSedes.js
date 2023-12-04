document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos()
    
    const buscarInput = document.getElementById('inputBuscar');
    buscarInput.addEventListener('input',()=>{
        buscarCarrera(buscarInput.value);
    })

});

// #region Mostrar y Eliminar los datos 
async function mostrarDatos() {
    try {
        const response = await fetch('http://localhost:8000/API/SEDES/');
        const data = await response.json();

        const tablaSedes = document.getElementById('tabla-sedes');
        tablaSedes.innerHTML = '';

        data.forEach((sedes, index) => {
            const fila = document.createElement('tr');

            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            const celdaId = document.createElement('td');
            celdaId.textContent = sedes.SEDE_ID;
            fila.appendChild(celdaId);

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = sedes.DESCRIPCION;
            fila.appendChild(celdaDescripcion);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = sedes.TELEFONO;
            fila.appendChild(celdaTelefono);

            const celdaEmail = document.createElement('td');
            celdaEmail.textContent = sedes.EMAIL;
            fila.appendChild(celdaEmail);

            const celdaLocalidad = document.createElement('td');
            celdaLocalidad.textContent = sedes.LOCALIDAD;
            fila.appendChild(celdaLocalidad);

            const celdaDireccion = document.createElement('td');
            celdaDireccion.textContent = sedes.DIRECCION;
            fila.appendChild(celdaDireccion);

            const celdaHora_Desde = document.createElement('td');
            celdaHora_Desde.textContent = sedes.HORA_DESDE;
            fila.appendChild(celdaHora_Desde);

            const celdaHora_Hasta = document.createElement('td');
            celdaHora_Hasta.textContent = sedes.HORA_HASTA;
            fila.appendChild(celdaHora_Hasta);

            const celdaDia_Desde = document.createElement('td');
            celdaDia_Desde.textContent = sedes.DIA_DESDE;
            fila.appendChild(celdaDia_Desde);

            const celdaDia_Hasta = document.createElement('td');
            celdaDia_Hasta.textContent = sedes.DIA_HASTA;
            fila.appendChild(celdaDia_Hasta);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>`;
            
            botonEliminar.addEventListener('click', async () => {
                const idSedes = sedes.SEDE_ID;
                const confirmacion = confirm('Estas por eliminar una Sede, ¿estas seguro?');
                if (confirmacion) {
                    try {
                        const response = await fetch(`http://localhost:8000/API/SEDES/delete/${idSedes}`, {
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
            tablaSedes.appendChild(fila);
        });
    }
    catch (error) {
        console.error('Error al buscar una sede', error);
    }
}

// #endregion
// #region Buscar y Eliminar

async function buscarCarrera(parametroBusqueda) {
    try {
        const buscarValor = parametroBusqueda.trim();
        const response = await fetch(`http://localhost:8000/API/SEDES/?desc=${buscarValor}`);
        const data = await response.json();
        const tablaSedes = document.getElementById('tabla-sedes');
        tablaSedes.innerHTML = '';
        data.forEach((sedes, index) => {
            const fila = document.createElement('tr');

            const numero = document.createElement('th');
            numero.setAttribute('scope', 'row');
            numero.textContent = index + 1;
            fila.appendChild(numero);

            const celdaId = document.createElement('td');
            celdaId.textContent = sedes.SEDE_ID;
            fila.appendChild(celdaId);

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = sedes.DESCRIPCION;
            fila.appendChild(celdaDescripcion);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = sedes.TELEFONO;
            fila.appendChild(celdaTelefono);

            const celdaEmail = document.createElement('td');
            celdaEmail.textContent = sedes.EMAIL;
            fila.appendChild(celdaEmail);

            const celdaLocalidad = document.createElement('td');
            celdaLocalidad.textContent = sedes.LOCALIDAD;
            fila.appendChild(celdaLocalidad);

            const celdaDireccion = document.createElement('td');
            celdaDireccion.textContent = sedes.DIRECCION;
            fila.appendChild(celdaDireccion);

            const celdaHora_Desde = document.createElement('td');
            celdaHora_Desde.textContent = sedes.HORA_DESDE;
            fila.appendChild(celdaHora_Desde);

            const celdaHora_Hasta = document.createElement('td');
            celdaHora_Hasta.textContent = sedes.HORA_HASTA;
            fila.appendChild(celdaHora_Hasta);

            const celdaDia_Desde = document.createElement('td');
            celdaDia_Desde.textContent = sedes.DIA_DESDE;
            fila.appendChild(celdaDia_Desde);

            const celdaDia_Hasta = document.createElement('td');
            celdaDia_Hasta.textContent = sedes.DIA_HASTA;
            fila.appendChild(celdaDia_Hasta);

            const celdaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'link-danger');
            botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>`;
            
            botonEliminar.addEventListener('click', async () => {
                const idSedes = sedes.SEDE_ID;
                const confirmacion = confirm('Estas por eliminar una Sede, ¿estas seguro?');
                if (confirmacion) {
                    try {
                        const response = await fetch(`http://localhost:8000/API/SEDES/delete/${idSedes}`, {
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
            tablaSedes.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al buscar una materia', error);
    }
}

// #endregion
