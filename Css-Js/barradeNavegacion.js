
// Cargar la barra de navegación utilizando AJAX
var xhr = new XMLHttpRequest();
xhr.open("GET", "BarradeNavegacion.html", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("navegacion").innerHTML = xhr.responseText;
    }
};
xhr.send();

//Borra el cache del navegador para que pueda ser modificado
var xhr = new XMLHttpRequest();
xhr.open("GET", "BarradeNavegacion.html?nocache=" + new Date().getTime(), true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("navegacion").innerHTML = xhr.responseText;
    }
};
xhr.send();