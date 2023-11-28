function obtenerSedeCarreraIDurl(){
    const urlParams      = new URLSearchParams(window.location.search)
const SedeCarreraID = urlParams.get('SEDECARRERA_ID')
return SedeCarreraID;
};

const formulario = document.getElementById('formulario');
const errorMessage = document.getElementById('error-horarios-message');

formulario.addEventListener('submit', function (event){
    event.preventDefault();


    const SedeCarreraID = obtenerSedeCarreraIDurl();//me permite conseguir la ID de sedecarrera y agregarla al formulario sin que el usuario la vea
    console.log('id de sedecarrera',SedeCarreraID);

    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;

    //Convertir el horario a string
    const horaInicioString = stringHora(horaInicio);
    const horaFinString = stringHora(horaFin);
    //funcion para la conversion
    function stringHora(tiempo){
        const date = new Date(tiempo);
        const hora = date.getHours().toString().padStart(2,'0');
        const minuto = date.getMinutes().toString().padStart(2,'0');
        const seg = date.getSeconds().toString().padStart(2,'0')
        return `${hora}:${minuto}:${seg}`;
    }

    const diaSeleccionado = document.getElementById('selectDia').value;

    //validar que los campos no esten vacios

    if(!SedeCarreraID||!horaInicio||!horaFin||!diaSeleccionado){
        errorMessage = textContent = 'por favor, completar todos los campos';
        errorMessage.style.display='block'
        return;
    }

    //crear el objeto con los datos a enviar(es el json)

    const datosHorarios={
        SEDECARRERA_ID: SedeCarreraID,
        HORA_INICIO: horaInicioString,
        HORA_FIN: horaFinString,
        DIA:diaSeleccionado,
    }
    console.log('datos a enviar a la api', datosHorarios)

    //realizar el post a la API/HORARIOS

    fetch('http://localhost:8000/API/HORARIOS/add',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datosHorarios)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('error al hacer la solicitud HTTP')
        }
        return response.json();
    })
    .then(data=>{
        console.log('datos guardados correctamente',data)
    })

    .catch(error=>{
        console.error('error al guardar los datos en la api', error.message)
    });
});
