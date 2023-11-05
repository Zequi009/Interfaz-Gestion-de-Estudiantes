
/*Control*/
function validarTelefono(){
    var telefono = document.getElementById("telefono").value;
    var patron = /^\d{10}$/;
    if(!patron.test(telefono)){
        document.getElementById("telefono-error").innerHTML="El telefono debe ser un número de 10 digitos";
        return false;
    }
    else{
        document.getElementById("telefono-error").innerHTML="";
        return true
    }
    //comprobar si el teléfono solo contiene numeros
    if(isNaN(telefono)){
        document.getElementById(telefono-error).innerHTML="El telefono debe contener un número"
    }
    else {
        document.getElementById("telefono-error").innerHTML="";
        return true;
    }
}