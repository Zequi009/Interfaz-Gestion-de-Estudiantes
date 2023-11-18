const urlParams = new URLSearchParams(window.location.search);
const sedeId = urlParams.get('id');
//hacer solicitud GET a la api buscando por id mas datos sobre la Sede
fetch(`http://localhost:8000/API/SEDES/${sedeId}`)
    .then(response => response.json())
    .then(data => {
        //Muestra los datos en los inputs
        document.getElementById('descripcion').value = data.DESCRIPCION;
        document.getElementById('telefono').value = data.TELEFONO;
        document.getElementById('email').value = data.EMAIL;
        document.getElementById('direccion').value = data.DIRECCION;
        document.getElementById('piso').value = data.PISO;
        document.getElementById('depto').value = data.DEPTO;
        document.getElementById('barrio').value = data.BARRIO;
        document.getElementById('localidad').value = data.LOCALIDAD;
        document.getElementById('dia_desde').value = data.DIA_DESDE;
        document.getElementById('dia_hasta').value = data.DIA_HASTA;
        document.getElementById('hora_desde').value = data.HORA_DESDE;
        document.getElementById('hora_hasta').value = data.HORA_HASTA;

        //PUT a la API
        const formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();//Prevenir que el formulario se envie por defecto al hacer el evento sumbit
            //obtiene los nuevos datos del formulario
            const nuevaDescripcion = document.getElementById('descripcion').value;
            const nuevoTelefono = document.getElementById('telefono').value;
            const nuevoEmail = document.getElementById('email').value;
            const NuevaDireccion = document.getElementById('direccion').value;
            const nuevoPiso = document.getElementById('piso').value;
            const nuevoDepto = document.getElementById('depto').value;
            const nuevoBarrio = document.getElementById('barrio').value;
            const nuevaLocalidad = document.getElementById('localidad').value;
            const nuevoDiaDesde = document.getElementById('dia_desde').value;
            const nuevoDiaHasta = document.getElementById('dia_hasta').value;
            const nuevaHoraHasta = document.getElementById('hora_desde').value;
            const nuevaHoraDesde = document.getElementById('hora_hasta').value;
            
            //preparar los Datos a enviar a la api

            const DatosActualizados = {
                DESCRIPCION:nuevaDescripcion,
                TELEFONO:nuevoTelefono,
                EMAIL:nuevoEmail,
                DIRECCION:NuevaDireccion,
                PISO:nuevoPiso,
                DEPTO:nuevoDepto,
                BARRIO:nuevoBarrio,
                LOCALIDAD: nuevaLocalidad,
                DIA_DESDE:nuevoDiaDesde,
                DIA_HASTA: nuevoDiaHasta,
                HORA_DESDE: nuevaHoraDesde,
                HORA_HASTA: nuevaHoraHasta,
            }

            //Realizar la solicitud PUT a la Api
            fetch(`http://localhost:8000/API/SEDES/update/${sedeId}`,{
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(DatosActualizados)
            })
            .then(response =>{
                if(!response.ok){
                    throw new Error('Error al actualizar los datos de la carrera');
                }
                return response.json();
            })
            .then(data=>{
                console.log('DatosActualizados',data);
                //toast de exito
                const toastSuccess= document.getElementById('toastSuccess');
                const bsToastSuccess = new bootstrap.Toast(toastSuccess);
                bsToastSuccess.show();

            })
            .catch(error=>{
                console.error('Error al actualizar los de talles de la carrera',error);
                toastError = document.getElementById('toastError');
                const bsToastError = new bootstrap.Toast(toastError);
                bsToastError.show();
            });

        });
    })
    .catch(error=>{
        console.error('Error al obtener los detalles de la carrera',error)
    });
