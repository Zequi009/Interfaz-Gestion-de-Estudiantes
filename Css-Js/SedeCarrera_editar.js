const urlParams = new URLSearchParams(window.location.search);
const selectedId = urlParams.get('idSedeCarrera');

const selectSedes = document.getElementById('selectSede');
const selectCarreras = document.getElementById('selectCarrera');

// #region Muestra los datos de acuerdo al idSedeCarrera
if (selectedId) {
  fetch(`http://localhost:8000/API/SEDECARRERA/${selectedId}`)
    .then(response => response.json())
    .then(data => {
      //Select Sede 
      const sedeID = data.SEDE_ID;
      const carreraID = data.CARRERA_ID;
      console.log(data);
      // #region input codigo

      const inputCodigo = document.getElementById('InputCodigo');
      inputCodigo.value = data.CODIGO_CARRERA;
      // #endregion

      // #region select Turno
      function traducirTurno(value) {
        const turnos = {
          1: 'Mañana',
          2: 'Tarde',
          3: 'Noche',
        };

        return turnos[value] || 'desconocido';
      }

      const turnoActual = document.createElement('label');
      turnoActual.classList.add('form-label', 'h6',);
      const valorTurno = data.TURNO; // Aquí sería tu valor de turno
      turnoActual.innerHTML = `Turno actual: <strong style="color:#0FBD07">${traducirTurno(valorTurno)}</strong>`;

      // Agrega el label al inicio del contenedor selectTurno
      selectTurno.parentNode.insertBefore(turnoActual, selectTurno);
      // #endregion

      // #region Select Sede
      let selectedSedeID; // Guarda el valor de sedeID

      // Obtener todas las sedes disponibles
      fetch('http://localhost:8000/API/SEDES/')
        .then(response => response.json())
        .then(sedes => {
          sedes.forEach(sede => {
            const optionSede = document.createElement('option');
            optionSede.value = sede.SEDE_ID;
            optionSede.textContent = sede.DESCRIPCION;
            selectSedes.appendChild(optionSede);

            // Guardar el valor de sedeID
            if (sede.SEDE_ID === sedeID) {
              selectedSedeID = sede.SEDE_ID;
            }
          });

          // Establecer la opción seleccionada según sedeID
          if (selectedSedeID) {
            selectSedes.value = selectedSedeID;
          }
        })
        .catch(error => {
          console.error('Error al obtener las sedes', error);
        });
      // #endregion


      // #region select Carrera
      let selectedCarreraID; // Guarda el valor de carreraID

      // Obtener todas las carreras disponibles
      fetch('http://localhost:8000/API/CARRERAS/')
        .then(response => response.json())
        .then(carreras => {
          carreras.forEach(carrera => {
            const optionCarrera = document.createElement('option');
            optionCarrera.value = carrera.CARRERA_ID;
            optionCarrera.textContent = carrera.DESCRIPCION;
            selectCarreras.appendChild(optionCarrera);

            // Guardar el valor de carreraID
            if (carrera.CARRERA_ID === carreraID) {
              selectedCarreraID = carrera.CARRERA_ID;
            }
          });

          // Establecer la opción seleccionada según carreraID
          if (selectedCarreraID) {
            selectCarreras.value = selectedCarreraID;
          }
        })
        .catch(error => {
          console.error('Error al obtener las carreras', error);
        });
      // #endregion

    })
    .catch(error => {
      console.error('Error al obtener la información de sedecarrera', error);
    });
  //Logica para hacer el PUT
  const formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevaSede = document.getElementById('selectSede').value;
    const nuevaCarrera = document.getElementById('selectCarrera').value;
    const inputCodigo = document.getElementById('InputCodigo').value;
    const nuevoTurno = document.getElementById('selectTurno').value;

    const DatosActualizados = {
      SEDE_ID: nuevaSede,
      CARRERA_ID: nuevaCarrera,
      CODIGO_CARRERA: inputCodigo,
      TURNO: nuevoTurno
    };
    console.log('datos hacia la api', DatosActualizados)
    fetch(`http://localhost:8000/API/SEDECARRERA/update/${selectedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(DatosActualizados)
    })
      .then(response => {
        if (!response.ok) {
          throw new error('ERROR al actualizar los datos de la Carrera');
        }
      })
      .then(data => {
        console.log('Datos actualizados', data)

        // Mostrar toast de éxito después de completar la solicitud y recibir una respuesta exitosa
        const successToast = new bootstrap.Toast(document.getElementById('toastSuccess'));
        successToast.show();
      })
      .catch(err => {
        error = err; // Capturando el error aquí
      });
    
    // Después del bloque de código fetch
    if (error) {
      console.error('Error al actualizar los datos de la Carrera', error);
      // Mostrar toast de error si ocurrió algún problema durante la solicitud
      const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));
      errorToast.show();
    }
    

  });

} else {
  console.Error('No se encontró ninguna ID en la URL');
}
// #endregion

