document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se recargue cuando los datos son enviados

    // Valores del Formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fecha_nacimiento = document.getElementById('Fnacimiento').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('contraseña').value;

    if(nombre===''|| apellido===''|| dni===''|| password==='')
    {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Los Campos nombre, apellido, dni, y contraseña son obligatorios'
        errorMessage.style.display='block'; //Mostrar el mensaje de Error

        // Mostrar toast de error
        const toastError = document.getElementById('toastError');
        const terror = new bootstrap.Toast(toastError);
        terror.show();

        return;

    }

    const formData = {
        NOMBRE: nombre,
        APELLIDO: apellido,
        DNI: dni,
        EMAIL: email,
        TELEFONO: telefono,
        PASSWORD: password
    };

    // Cambia el Orden en el que se envía la fecha y lo agrega al objeto formData.
    if (fecha_nacimiento) {
        const FechaFormateado = new Date(fecha_nacimiento.split("/").reverse().join("-")).toISOString().split("T")[0];
        formData.FECHA_NACIMIENTO = FechaFormateado;
    }

    console.log('Datos para enviar a la API:', {
        nombre,
        apellido,
        dni,
        fecha_nacimiento: formData.FECHA_NACIMIENTO,
        email
    });

    fetch('http://localhost:8000/API/DOCENTES/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos a la base de datos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API', data);
            //Muestra el toast cuando los datos son guardados
            const toastSuccess = new document.getElementById('toastSuccess');
            const toastSS = new bootstrap.Toast(toastSuccess);
            toastSS.show();
        })
        .catch(error => {
            console.error('Error:', error.message);
            console.error('Detalle del error', error); // Muestra los detalles del Error
            //Mostrar el Toast de Error
            const toastError = document.getElementById('toastError');
            const bsToastError = new bootstrap.Toast(toastError);
            bsToastError.show();
        });
});
