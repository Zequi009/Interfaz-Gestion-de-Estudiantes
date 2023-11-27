const urlParams = new URLSearchParams(window.location.search)
const personalId = urlParams.get('idSedeCarrera')

fetch(`http://localhost:8000/API/PRECEPTORES/${personalId}`)
.then(response => response.json())
.then(data=>{
    document.getElementById('nombre').value = data.NOMBRE;
    document.getElementById('apellido').value = data.APELLIDO;
    document.getElementById('Fnacimiento').value = data.FECHA_NACIMIENTO;
    document.getElementById('dni').value = data.DNI;
    document.getElementById('email').value = data.EMAIL;
    document.getElementById('telefono').value = data.TELEFONO;
    document.getElementById('contraseña').value = data.PASSWORD;

    //PUT a la Api
    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit',function (event){
        event.preventDefault();

        //contiene todos los datos del formulario
        const nuevoNombre = document.getElementById('nombre').value;
        const nuevoApellido = document.getElementById('apellido').value;
        const nuevoDNI = document.getElementById('dni').value;
        const nuevoEmail= document.getElementById('email').value;
        const nuevoTelefono= document.getElementById('telefono').value;
        const nuevaContraseña= document.getElementById('contraseña').value;
        const NuevaFnacimiento= document.getElementById('Fnacimiento').value;

        const dataActualizada={
            NOMBRE: nuevoNombre,
            APELLIDO: nuevoApellido,
            DNI: nuevoDNI,
            EMAIL: nuevoEmail,
            TELEFONO: nuevoTelefono,
            PASSWORD: nuevaContraseña,

        }
        if (NuevaFnacimiento) {
            const FechaFormateado = new Date(NuevaFnacimiento.split("/").reverse().join("-")).toISOString().split("T")[0];
            dataActualizada.FECHA_NACIMIENTO = FechaFormateado; // Asignación correcta
        }
        

        fetch(`http://localhost:8000/API/PRECEPTORES/update/${personalId}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(dataActualizada)
        })
        .then(response => {
            if(!response.ok){

                throw new Error('error al actualizar los datos',response);
            }
            return response.json();
        })
        .then(data => {
            console.log('datos cargados con exito', data)
            const toastSuccess = document.getElementById('toastSuccess');
            const toastSS = new bootstrap.Toast(toastSuccess);
            toastSS.show();
        })
        .catch(error=>{
            console.error('error al actualizar los datos', error);
            const toastError = document.getElementById('toastError');
            const bsToastError = new bootstrap.Toast(toastError);
            bsToastError.show();
        });
    });
})
.catch(error =>{
console.error('error al obtener los detalles del docente',error);
})