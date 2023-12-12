document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const materiaCarreraID = urlParams.get('MateriaCarreraID');


    // #region obtener descripcion de todas las Materias
    fetch(`http://localhost:8000/API/MATERIAS`)
        .then(response => response.json())
        .then(materiaData => {
            const selectMateria = document.getElementById('selectMateria');
            materiaData.forEach(materia => {
                const optionMateria = document.createElement('option');
                optionMateria.value = materia.MATERIA_ID;
                optionMateria.textContent = materia.DESCRIPCION;
                selectMateria.appendChild(optionMateria);
                if (materia.MATERIA_ID === materiaCarreraID) {
                    optionMateria.selected = true;
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener las materias', error)
        })
    // #endregion
    // #region obtener lodas las descripciones de Carreras
    fetch('http://localhost:8000/API/SEDECARRERA')
        .then(response => response.json())
        .then(sedeCarreraData => {
            const selectCarrera = document.getElementById('selectCarrera');

            sedeCarreraData.forEach(sedeCarrera => {
                const { SEDE_ID, CARRERA_ID, SEDECARRERA_ID } = sedeCarrera;

                fetch(`http://localhost:8000/API/SEDES/${SEDE_ID}`)
                    .then(response => response.json())
                    .then(sedeData => {
                        fetch(`http://localhost:8000/API/CARRERAS/${CARRERA_ID}`)
                            .then(response => response.json())
                            .then(carreraData => {
                                const optionCarrera = document.createElement('option');
                                optionCarrera.value = SEDECARRERA_ID;
                                optionCarrera.textContent = `${sedeData.DESCRIPCION} - ${carreraData.DESCRIPCION}`;
                                selectCarrera.appendChild(optionCarrera);

                                if (SEDECARRERA_ID === materiaCarreraID) {
                                    optionCarrera.selected = true;
                                }
                            })
                            .catch(error => {
                                console.error('Error al obtener la descripción de la carrera:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error al obtener la descripción de la sede:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de SEDECARRERA:', error);
        });

    // #endregion
    // Obtener NOMBRE Y APELLIDO de API/PRECEPTORES
    // #region obtener los datos de los Preceptores
    fetch('http://localhost:8000/API/PRECEPTORES')
        .then(response => response.json())
        .then(preceptores => {
            const selectPreceptor = document.getElementById('selectPreceptor');
            preceptores.forEach(preceptor => {
                const optionPreceptor = document.createElement('option');
                optionPreceptor.value = preceptor.PRECEPTOR_ID;
                optionPreceptor.textContent = `${preceptor.NOMBRE} ${preceptor.APELLIDO}`;
                selectPreceptor.appendChild(optionPreceptor);

                if (preceptor.PRECEPTOR_ID === materiaCarreraID) {
                    optionMateria.selected = true;
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los preceptores:', error);
        });
    // #endregion
    // #region obtener todas las descripciones de Docentes
    fetch('http://localhost:8000/API/DOCENTES')
        .then(response => response.json())
        .then(profesores => {
            const selectDocente = document.getElementById('selectDocente');
            profesores.forEach(profesor => {
                const optionDocente = document.createElement('option');
                optionDocente.value = profesor.DOCENTE_ID;
                optionDocente.textContent = `${profesor.NOMBRE} ${profesor.APELLIDO}`;
                selectDocente.appendChild(optionDocente);

                if (profesor.DOCENTE_ID === materiaCarreraID) {
                    optionMateria.selected = true;
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los profesores:', error);
        });
    // #endregion
    // #region las opciones asociadas a la id de sedecarrera
    fetch(`http://localhost:8000/API/MATERIACARRERA/${materiaCarreraID}`)
        .then(response => response.json())
        .then(data => {
            const selectMateria = document.getElementById('selectMateria');
            const selectDocente = document.getElementById('selectDocente')
            const selectProfesor = document.getElementById('selectPreceptor')
            const cicloLectivo = document.getElementById('inputCiclo');
            const curso = document.getElementById('inputCurso');
            const promocionable = document.getElementById('inputReg')
            const selectCarrera = document.getElementById('selectCarrera')

            selectMateria.value = data.MATERIA_ID;
            selectCarrera.value = data.SEDECARRERA_ID
            selectDocente.value = data.DOCENTE_ID;
            selectProfesor.value = data.PRECEPTOR_ID;
            cicloLectivo.value = data.CICLO_LECTIVO;
            curso.value = data.CURSO;
            const promocionableValue = data.REGULARIZABLE;

            if (promocionableValue === 1) {
                promocionable.checked = true;

            }
            else {
                promocionable.checked = false;
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de SEDECARRERA:', error);
        });
    // #endregion

    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const checkbox = document.getElementById('inputReg');
        checkbox.addEventListener('change', function () {
            const valor = this.checked ? 1 : 0;
            console.log('valor', valor);
        })

        //capturar valores de los campos del formulario 
        const carrera = document.getElementById('selectCarrera').value;
        const materia = document.getElementById('selectMateria').value;
        const docente = document.getElementById('selectDocente').value;
        const preceptor = document.getElementById('selectPreceptor').value;
        const curso = document.getElementById('inputCurso').value;
        const cicloLectivo = document.getElementById('inputCiclo').value;

        //validar envio de chebox sin cambio

        const checkRegu = document.getElementById('inputReg');
        const regularidad = checkRegu.checked ? 1 : 0;

        const datos = {
            SEDECARRERA_ID: carrera,
            MATERIA_ID: materia,
            DOCENTE_ID: docente || null,
            PRECEPTOR_ID: preceptor || null,
            CURSO: curso,
            REGULARIZABLE: regularidad,
            CICLO_LECTIVO: cicloLectivo
        }
        console.log('datos enviados a la api', datos)
        fetch(`http://localhost:8000/API/MATERIACARRERA/${materiaCarreraID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('error en la solicitud HTTP')
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos guardados con exito', data);
                if (data && 'MATERIACARRERA_ID' in data) {
                    const nuevaMateriaCarreraID = data.MATERIACARRERA_ID;
                    console.log('ID de la nueva materia carrera:', nuevaMateriaCarreraID);
                    const toastSuccess = document.getElementById('toastSuccess');
                    const toastSS = new bootstrap.Toast(toastSuccess);
                    toastSS.show();

                }

                else {
                    console.error('La propiedad MATERIACARRERA_ID no está presente en los datos recibidos.');
                }
            })
            .catch(error => {
                console.error('Error al enviar datos a la Api', error.message);
                // Mostrar el Toast de error
                const toastError = document.getElementById('toastError');
                const bsToastError = new bootstrap.Toast(toastError);
                bsToastError.show();
            });

    });

})


