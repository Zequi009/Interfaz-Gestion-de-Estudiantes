//Desbloquea las justificaciones
document.getElementById('estado').addEventListener('change',function(){
    var estado =this.value;
    var justi = document.getElementById('justificativo');
    var Nojusti = document.getElementById('NoJusti');

    if(estado=='ausente'){
        justi.disabled=false;
        Nojusti.disabled=false;
    }
    else{
        justi.disabled=true;
        Nojusti.disabled=true;
    }
});