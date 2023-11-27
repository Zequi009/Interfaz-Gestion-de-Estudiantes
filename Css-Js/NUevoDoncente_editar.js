const urlParams = new URLSearchParams(window.location.search);
const idSedeCarrera = urlParams.get('idSedeCarrera');

//Hacer una solicitud get a la api para obtener los datos
fetch (`http://localhost:8000/API/DOCENTES/${idSedeCarrera}`)
.then(response => response.json())
.then(dataDocentes=>{
    document.getElementById('nombre').value = dataDocentes.NOMBRE;
    document.getElementById('apellido').value = dataDocentes.APELLIDO;
    document.getElementById('Fnacimiento').value = dataDocentes.FECHA_NACIMIENTO;
    document.getElementById('dni').value = dataDocentes.DNI;
    document.getElementById('email').value = dataDocentes.EMAIL;
    document.getElementById('telefono').value = dataDocentes.TELEFONO;
    document.getElementById('contraseña').value = dataDocentes.PASSWORD;

    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit',function(event){
        event.preventDefault();

        //obtener los datos actuales del formulario
        const nuevoNombre = document.getElementById('nombre').value;
        const nuevoApellido = document.getElementById('apellido').value;
        const nuevaFecha = document.getElementById('Fnacimiento').value;
        const nuevoDNI = document.getElementById('dni').value;
        const nuevoEmail = document.getElementById('email').value;
        const nuevoTelefono = document.getElementById('telefono').value; 
        const nuevaContra = document.getElementById('contraseña').value; 

        const dataActualizada={
            NOMBRE: nuevoNombre,
            APELLIDO: nuevoApellido,
            DNI: nuevoDNI,
            EMAIL:nuevoEmail,
            TELEFONO: nuevoTelefono,
            PASSWORD: nuevaContra

        }
        if (nuevaFecha) {
            const FechaFormateado = new Date(nuevaFecha.split("/").reverse().join("-")).toISOString().split("T")[0];
            dataActualizada.FECHA_NACIMIENTO = FechaFormateado;
        }

        fetch(`http://localhost:8000/API/DOCENTES/update/${idSedeCarrera}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataActualizada)
        })
        .then(response =>{
            if(!response.ok){
                throw new Error('error al actualizar los datos', response);
            }
            return response.json();
        })
        .then(data =>{
            console.log('datos actualizados con exito', data);
            //toastde exito
            const toastSuccess = document.getElementById('toastSuccess');
            const toastSS = new bootstrap.Toast(toastSuccess);
            toastSS.show();
        })
        .catch(error => {
            console.error('error al actualizar los detalles', error);
            //Mostrar el Toast de Error
            const toastError = document.getElementById('toastError');
            const bsToastError = new bootstrap.Toast(toastError);
            bsToastError.show();
        });
    });
})
.catch(error=>{
    console.error('error al obtener los detalles del Docente', error);
});

   
