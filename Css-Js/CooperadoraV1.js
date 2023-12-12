document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const inscripcionesID = urlParams.get('InscripcionesID');

    // Verifica si se capturó correctamente la ID de inscripciones
    if (inscripcionesID) {
        // Llamar a la función que usa la ID de inscripciones
        obtenerDatosDeInscripciones(inscripcionesID);
    } else {
        console.error('No se pudo encontrar la ID de inscripciones en la URL.');
    }

    const inputMonto = document.getElementById('inputMonto');
    const spanSaldo = document.getElementById('spanSaldo');
    const form = document.getElementById('formulario');
    const inputFecha = document.getElementById('inputFecha');



    // #region hace la resta del monto y el saldo

    // Escuchar el evento 'input' en el inputMonto
    inputMonto.addEventListener('blur', function () {
        // Obtener el valor del input y del span
        const monto = parseFloat(inputMonto.value);
        const saldo = parseFloat(spanSaldo.textContent);
        console.log('valor de saldo', saldo);

        // Verificar que sean números válidos
        if (!isNaN(monto) && !isNaN(saldo)) {
            // Realizar la resta
            const nuevoSaldo = saldo - monto;
            // Mostrar el nuevo saldo en el span
            spanSaldo.textContent = nuevoSaldo;
            console.log(`valor de saldo ${saldo} - valor de monto${monto} = ${nuevoSaldo}`)
        }
    });
    // #endregion
    // #region MEtodo Post
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const fechaString = inputFecha.value;
        const saldo = parseFloat(spanSaldo.textContent.replace('$', '').replace(',', ''));
        const monto = parseFloat(inputMonto.value);
        //#region Convertir la fecha al formato YYYY-MM-DD
        let fechaFormateada = '';
        if (fechaString) {
            fechaFormateada = new Date(fechaString.split("/").reverse().join("-")).toISOString().split("T")[0];
        }
        //#endregion

        if (!isNaN(monto) && !isNaN(saldo) && fechaFormateada !== '' && monto >= 0) {
            // #region Post
            // Datos a enviar en la solicitud POST

            const data = {
                INSCRIPCION_ID: inscripcionesID,
                MONTO: monto,
                SALDO: saldo,
                FECHA: fechaFormateada
            };
            console.log('datos a enviar a la api', data);

            //#region Realizar la solicitud POST
            fetch('http://localhost:8000/API/PAGOS/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Solicitud POST exitosa:', data);

                    const toastSuccess = document.getElementById('toastSuccess');
                    const bsToastSuccess = new bootstrap.Toast(toastSuccess);
                    bsToastSuccess.show();
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);

                    // Mostrar toast de error
                    const errorToast = document.getElementById('errorToast');
                    const bsErrorToast = new bootstrap.Toast(errorToast);
                    bsErrorToast.show();
                });
            //#endregion
        }
        else {
            console.error('por favor, complete todos los campos antes de enviarlos,')
            // Mostrar mensaje de error
            const mensajeError = document.getElementById('mensajeError');
            mensajeError.classList.remove('d-none'); // Mostrar el mensaje de error
            mensajeError.textContent = 'Por favor, completa todos los campos antes de enviar los datos o verifique que el campo "Importe Cuota" sea un numero';
        }


    });
    // #endregion
});

// #region Funcion obtener Datos    
async function obtenerDatosDeInscripciones(inscripcionesID) {
    try {
        const response = await fetch(`http://localhost:8000/API/INSCRIPCIONES/${inscripcionesID}`);
        const data = await response.json();
        console.log('Datos de inscripciones:', data);

        // Verificar si existe COOPERADORA_VALOR y establecerlo en el span
        if (data && data.COOPERADORA_TOTAL) {
            const valor = parseFloat(data.COOPERADORA_TOTAL);
            //LE da el formato moneda(es puramente estetico)
            console.log('valor de valorFormateado', valor);
            document.getElementById('spanSaldo').textContent = valor
        } else {
            console.error('No se encontró COOPERADORA_VALOR en los datos de inscripciones.');
        }

    } catch (error) {
        console.error('Error al obtener los datos de las inscripciones:', error);
    }
}
// #endregion


