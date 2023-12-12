document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('selectInscripciones');
    const spanSaldo = document.getElementById('spanSaldo');
    const inputMonto = document.getElementById('inputMonto');
    let saldo = 0; // Inicializar el saldo

    // Obtener los datos de API/PAGOS
    fetch('http://localhost:8000/API/PAGOS')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de API/PAGOS');
            }
            return response.json();
        })
        .then(pagosData => {
            const obtenerDatosAlumno = (alumnoID) => {
                return fetch(`http://localhost:8000/API/ALUMNOS/${alumnoID}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error al obtener los datos de API/ALUMNOS/${alumnoID}`);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error al obtener datos del alumno:', error);
                    });
            };

            const obtenerDatosInscripcion = (inscripcionID) => {
                return fetch(`http://localhost:8000/API/INSCRIPCIONES/${inscripcionID}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error al obtener los datos de API/INSCRIPCIONES/${inscripcionID}`);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error al obtener datos de la inscripción:', error);
                    });
            };

            // Agregar opción por defecto al select
            const selectOption = document.createElement('option');
            selectOption.value = '';
            selectOption.textContent = 'Seleccione un Alumno';
            select.appendChild(selectOption);

            // Procesar cada elemento de pagosData
            pagosData.forEach(pago => {
                obtenerDatosInscripcion(pago.INSCRIPCION_ID)
                    .then(inscripcionData => {
                        return obtenerDatosAlumno(inscripcionData.ALUMNO_ID);
                    })
                    .then(alumnoData => {
                        const option = document.createElement('option');
                        option.value = pago.PAGO_ID;
                        option.textContent = `${alumnoData.NOMBRE} ${alumnoData.APELLIDO}`;
                        select.appendChild(option);
                    })
                    .catch(error => {
                        console.error('Error al obtener datos de la inscripción o del alumno:', error);
                    });
            });

            // Evento change en el select
            select.addEventListener('change', function () {
                const pagoID = select.value;

                fetch(`http://localhost:8000/API/PAGOS/${pagoID}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error al obtener los datos de API/PAGOS/${pagoID}`);
                        }
                        return response.json();
                    })
                    .then(pagoSeleccionado => {
                        saldo = pagoSeleccionado.SALDO;
                        const monto = parseFloat(inputMonto.value);
                        const nuevoSaldo = saldo - monto;
                        spanSaldo.textContent = nuevoSaldo;
                    })
                    .catch(error => {
                        console.error('Error al obtener datos del pago:', error);
                    });
            });

            // Evento blur en el inputMonto
            inputMonto.addEventListener('blur', function () {
                const monto = parseFloat(inputMonto.value);
                const nuevoSaldo = saldo - monto;
                spanSaldo.textContent = nuevoSaldo;
            });

        })
        .catch(error => {
            console.error('Error al obtener datos de pagos:', error);
        });
        


    // #region Mostrar datos en la tabla
    const tablaPagos = document.getElementById('tabla-pagos');
    let index = 1;

    // Obtener los datos de API/PAGOS
    fetch('http://localhost:8000/API/PAGOS')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de API/PAGOS');
            }
            return response.json();
        })
        .then(pagosData => {
            // Array para almacenar las promesas de las llamadas a la API/INSCRIPCIONES
            const inscripcionesPromises = [];

            // Iterar sobre los datos de pagos
            pagosData.forEach(pago => {
                const inscripcionID = pago.INSCRIPCION_ID;

                // Realizar llamada a API/INSCRIPCIONES por cada ID de inscripción
                inscripcionesPromises.push(
                    fetch(`http://localhost:8000/API/INSCRIPCIONES/${inscripcionID}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error al obtener los datos de API/INSCRIPCIONES/${inscripcionID}`);
                            }
                            return response.json();
                        })
                        .then(inscripcionData => {
                            const alumnoID = inscripcionData.ALUMNO_ID;

                            // Obtener datos del alumno desde API/ALUMNOS
                            return fetch(`http://localhost:8000/API/ALUMNOS/${alumnoID}`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`Error al obtener los datos de API/ALUMNOS/${alumnoID}`);
                                    }
                                    return response.json();
                                })
                                .then(alumnoData => {

                                    // Crear una fila para la tabla
                                    const fila = document.createElement('tr');

                                    // Crear celda para el índice y agregarla a la fila
                                    let cellIndex = document.createElement('td');
                                    cellIndex.textContent = index++;
                                    fila.appendChild(cellIndex);

                                    // Crear celdas para cada dato
                                    const idPago = document.createElement('td');
                                    idPago.textContent = pago.PAGO_ID;
                                    fila.appendChild(idPago);


                                    const dni = document.createElement('td');
                                    dni.textContent = alumnoData.DNI;
                                    fila.appendChild(dni);

                                    const nombreCompleto = document.createElement('td');
                                    nombreCompleto.textContent = `${alumnoData.NOMBRE} ${alumnoData.APELLIDO}`;
                                    fila.appendChild(nombreCompleto);

                                    const fecha = document.createElement('td');
                                    fecha.textContent = pago.FECHA;
                                    fila.appendChild(fecha);

                                    const monto = document.createElement('td');
                                    monto.textContent = pago.MONTO;
                                    fila.appendChild(monto);

                                    const saldo = document.createElement('td');
                                    saldo.textContent = pago.SALDO;
                                    fila.appendChild(saldo);

                                    const estado = document.createElement('td');
                                    estado.textContent = inscripcionData.COOPERADORA_ESTADO;
                                    fila.appendChild(estado);

                                    const cellEliminar = document.createElement('td');
                                    const botonEliminar = document.createElement('button');
                                    botonEliminar.classList.add('btn', 'link-danger');
                                    botonEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                  </svg>`;
                                    // Aquí puedes agregar la lógica para eliminar al hacer clic en el botón
                                    cellEliminar.appendChild(botonEliminar);
                                    fila.appendChild(cellEliminar);

                                    // Agregar la fila a la tabla
                                    tablaPagos.appendChild(fila);
                                });
                        })
                );
            });

            // Esperar a que todas las llamadas a la API se completen
            return Promise.all(inscripcionesPromises);
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar errores aquí
        });
    // #endregion



});
