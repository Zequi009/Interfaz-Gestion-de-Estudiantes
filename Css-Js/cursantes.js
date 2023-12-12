document.addEventListener('DOMContentLoaded', () => {
    // Hacer la solicitud GET a la API
    const selectAlumnos = document.getElementById('selectAlumno');
    const botonMostrarAlumnos = document.getElementById('mostrarAlumnoBtn')

    // #region mostrar datos en el SelectAlumno y Modal
    fetch('http://localhost:8000/API/ALUMNOS/')
        .then(response => response.json())
        .then(data => {

            const optionSelected = document.createElement('option');
            optionSelected.value = '';
            optionSelected.textContent = 'Seleccione un Alumno'
            selectAlumnos.appendChild(optionSelected);

            // Iterar sobre los datos y agregar opciones al elemento select
            data.forEach(alumno => {

                const option = document.createElement('option');
                option.value = alumno.ALUMNO_ID; // Supongamos que cada alumno tiene un ID
                option.textContent = `${alumno.NOMBRE} ${alumno.APELLIDO}`;
                selectAlumnos.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Hubo un problema al obtener los datos de la API:', error);
        });
    // Obtener referencia al select


    // Agregar un evento de cambio al select
    botonMostrarAlumnos.addEventListener('click', function () {
        // Obtener el valor seleccionado en el select
        const selectedAlumnoId = document.getElementById('selectAlumno').value;

        // Realizar una solicitud GET específica para obtener los datos del alumno seleccionado
        fetch(`http://localhost:8000/API/ALUMNOS/${selectedAlumnoId}`)
            .then(response => response.json())
            .then(alumno => {
                // Actualizar los campos del modal con los datos del alumno
                document.getElementById('nombre').value = alumno.NOMBRE;
                document.getElementById('apellido').value = alumno.APELLIDO;
                document.getElementById('dni').value = alumno.DNI;
                document.getElementById('Fnacimiento').value = alumno.FECHA_NACIMIENTO;
                document.getElementById('telefono').value = alumno.TELEFONO;
                document.getElementById('correo').value = alumno.EMAIL;
                document.getElementById('localidad').value = alumno.LOCALIDAD;
                document.getElementById('barrio').value = alumno.BARRIO;
                document.getElementById('direccion').value = alumno.DIRECCION;
                document.getElementById('piso').value = alumno.PISO;
                document.getElementById('depto').value = alumno.DEPTO;
                document.getElementById('contEmergencia').value = alumno.CONTACTO_EMERGENCIA;
                document.getElementById('telEmergencia').value = alumno.CONTACTO_EMERGENCIA_TEL;

                // Mostrar el modal después de actualizar los campos
                const modal = new bootstrap.Modal(document.getElementById('modalAlumno'));
                modal.show();
            })
            .catch(error => {
                console.error('Hubo un problema al obtener los datos del alumno:', error);
            });
    });
    // Obtener referencia al modal
    const modal = document.getElementById('modalAlumno');

    // Agregar un evento cuando el modal se oculta
    modal.addEventListener('hidden.bs.modal', function () {
        const backdrop = document.querySelector('.modal-backdrop');
        // Si hay un backdrop presente, eliminarlo
        if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
        }
    });
    // #endregion
    // #region mostrar datos en el SelectMateriaCarrera y Modal
    // Realizar la solicitud a API/MATERIACARRERA
    fetch('http://localhost:8000/API/MATERIACARRERA')
        .then(response => response.json())
        .then(data => {
            // Obtener una referencia al elemento select
            const selectMateriaCarrera = document.getElementById('selectMateriaCarrera');

            // Iterar sobre los datos de MATERIACARRERA
            data.forEach(item => {
                // Obtener MATERIA_ID y SEDECARRERA_ID de cada elemento
                const materiaId = item.MATERIA_ID;
                const sedeCarreraId = item.SEDECARRERA_ID;

                // Hacer la solicitud a API/MATERIAS con MATERIA_ID para obtener la DESCRIPCION
                fetch(`http://localhost:8000/API/MATERIAS/${materiaId}`)
                    .then(response => response.json())
                    .then(materiaData => {
                        const descripcionMateria = materiaData.DESCRIPCION;

                        // Hacer la solicitud a API/SEDECARRERA con SEDECARRERA_ID para obtener SEDE_ID y CARRERA_ID
                        fetch(`http://localhost:8000/API/SEDECARRERA/${sedeCarreraId}`)
                            .then(response => response.json())
                            .then(sedeCarreraData => {
                                const sedeId = sedeCarreraData.SEDE_ID;
                                const carreraId = sedeCarreraData.CARRERA_ID;

                                // Hacer la solicitud a API/SEDES con SEDE_ID para obtener la DESCRIPCION de la sede
                                fetch(`http://localhost:8000/API/SEDES/${sedeId}`)
                                    .then(response => response.json())
                                    .then(sedeData => {
                                        const descripcionSede = sedeData.DESCRIPCION;

                                        // Hacer la solicitud a API/CARRERAS con CARRERA_ID para obtener la DESCRIPCION de la carrera
                                        fetch(`http://localhost:8000/API/CARRERAS/${carreraId}`)
                                            .then(response => response.json())
                                            .then(carreraData => {
                                                const descripcionCarrera = carreraData.DESCRIPCION;

                                                // Construir la opción para el select con la información obtenida
                                                const optionSelected = document.createElement('option');
                                                optionSelected.value = '';
                                                optionSelected.textContent = 'Seleccione una Materia'
                                                selectMateriaCarrera.appendChild(optionSelected);

                                                const option = document.createElement('option');
                                                option.value = item.MATERIACARRERA_ID;
                                                option.textContent = `${descripcionMateria} - ${descripcionSede}${descripcionCarrera}`;
                                                // Agregar la opción al select
                                                selectMateriaCarrera.appendChild(option);
                                            })
                                            .catch(error => {
                                                console.error('Error al obtener la descripción de la carrera:', error);
                                            });
                                    })
                                    .catch(error => {
                                        console.error('Error al obtener la descripción de la sede:', error);
                                    });
                            })
                            .catch(error => {
                                console.error('Error al obtener SEDE_ID y CARRERA_ID:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error al obtener la descripción de la materia:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Hubo un problema al obtener los datos de MATERIACARRERA:', error);
        });


    const selectMateriaCarrera = document.getElementById('selectMateriaCarrera');

    // Agregar un evento de cambio al selector
    selectMateriaCarrera.addEventListener('change', function () {
        const selectedMateriaCarreraId = selectMateriaCarrera.value;

        fetch(`http://localhost:8000/API/MATERIACARRERA/${selectedMateriaCarreraId}`)
            .then(response => response.json())
            .then(data => {
                const materiaId = data.MATERIA_ID;
                const sedeCarreraId = data.SEDECARRERA_ID;

                // Obtener la descripción de la materia
                fetch(`http://localhost:8000/API/MATERIAS/${materiaId}`)
                    .then(response => response.json())
                    .then(materiaData => {
                        document.getElementById('Materia').value = materiaData.DESCRIPCION;
                    })
                    .catch(error => {
                        console.error('Error al obtener la descripción de la materia:', error);
                    });

                // Obtener la descripción de la sede y carrera
                fetch(`http://localhost:8000/API/SEDECARRERA/${sedeCarreraId}`)
                    .then(response => response.json())
                    .then(sedeCarreraData => {
                        const sedeId = sedeCarreraData.SEDE_ID;
                        const carreraId = sedeCarreraData.CARRERA_ID;

                        Promise.all([
                            fetch(`http://localhost:8000/API/SEDES/${sedeId}`).then(response => response.json()),
                            fetch(`http://localhost:8000/API/CARRERAS/${carreraId}`).then(response => response.json())
                        ])
                            .then(([sedeData, carreraData]) => {
                                document.getElementById('SedeCarrera').value = `${sedeData.DESCRIPCION} - ${carreraData.DESCRIPCION}`;
                                document.getElementById('Docente').value = data.PROFESOR;
                                document.getElementById('Preceptor').value = data.PRECEPTOR;
                                document.getElementById('CicloLectivo').value = data.CICLO_LECTIVO;
                                document.getElementById('Curso').value = data.CURSO;
                                document.getElementById('promocionCheck').checked = data.REGULARIZABLE;
                            })
                            .catch(error => {
                                console.error('Error al obtener la descripción de sede o carrera:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error al obtener SEDE_ID y CARRERA_ID:', error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener datos de MATERIACARRERA:', error);
            });
    });
    // #endregion
    // #region redireccionar MateriaCarrera_Editar
    redirectionButton = document.getElementById('editarCarrera')
    redirectionButton.addEventListener('click', function () {
        const selectedMateriaCarreraId = selectMateriaCarrera.value;

        // Redirigir a la otra página con el ID seleccionado como parámetro en la URL
        window.location.href = `http://localhost/Nueva%20carpeta/MateriaCarrera_Editar.html?MateriaCarreraID=${selectedMateriaCarreraId}`;
    });
    // #endregion
    const errorMessage = document.getElementById('error-message')
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();


        const selectAlumno = document.getElementById('selectAlumno').value;
        const selectMateriaCarrera = document.getElementById('selectMateriaCarrera').value;
        const selectRegularidad = document.getElementById('selectRegularidad').value;
        const FechaRegularidad = document.getElementById('FechaRegularidad').value;
        const textareaObservaciones = document.getElementById('textareaObservaciones').value;



        const formData = {
            ALUMNO_ID: selectAlumno,
            MATERIACARRERA_ID: selectMateriaCarrera,
            ESTADO_CURSADA: selectRegularidad,
            REGULARIDAD_END_DATE: FechaRegularidad,
            OBSERVACIONES: textareaObservaciones
        }
        console.log('datos enviados a la api', formData)

        if (selectAlumno === '' || selectMateriaCarrera === '' || selectRegularidad === '' || FechaRegularidad === '') {
            // Mostrar el mensaje de error
            errorMessage.style.display = 'block';
            return;
          }
          // Si todos los campos están llenos, ocultar el mensaje de error
          errorMessage.style.display = 'none';

        //Realizar el POST a Cursantes
        fetch('http://localhost:8000/API/CURSANTES/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud http')
                }
                return response.json();
            })
            .then(data => {
                console.log('datos guardados de forma Correcta', data);

                const toastSuccess = document.getElementById('toastSuccess');
                const toastSS = new bootstrap.Toast(toastSuccess);
                toastSS.show();

            })
            .catch(error => {
                console.error('Error al enviar los datos a la api', error)
                
                const toastError = document.getElementById('toastError');
                const bsToastError = new bootstrap.Toast(toastError);
                bsToastError.show();
                
            });

    });


});


