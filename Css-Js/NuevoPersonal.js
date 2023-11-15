document.getElementById('formulario').addEventListener('submit',function(event){
    event.preventDefault(); //Evita que el formulario se recargue cuando los datos son enviados

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const Fnacimiento = document.getElementById('Fnacimiento').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const constraseña= document.getElementById('contraseña').value;

    const formData={
        NOMBRE: nombre,
        APELLIDO: apellido,
        DNI: dni,
        PASSWORD: constraseña,
        TELEFONO: telefono,
        EMAIL: email,

    }
    if (Fnacimiento) {
        const FechaFormateada = new Date(Fnacimiento).toISOString().split("T")[0];
        formData.FECHA_NACIMIENTO = FechaFormateada;
    }
    

    console.log('Datos a enviar a la Api:',{
        nombre,
        apellido,
        dni,
        fecha_nacimiento: formData.FECHA_NACIMIENTO,
        email
    });
    fetch('http://localhost:8000/API/PRECEPTORES/add',
    {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Error al enviar los datos a la base de datos');
        }
        return response.json();
    })
    .then(data=>{
        console.log('Respuesta de la Api',data);
        //Toast de Exito
    })
    .catch(error=>{
        console.error('Error:', message.error);
        console.error('Detalle del error',error); //Muestra a detalle los errores
        //Toast de Error
    })
});