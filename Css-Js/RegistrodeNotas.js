/*Boton Crear tabla

function crearTabla() {
    var tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped" ,"table-bordered")
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
  
    var cabecera = ["Nombre", "Apellido", "Edad"];
    var filaCabecera = document.createElement("tr");
    for (var i = 0; i < cabecera.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = cabecera[i];
      filaCabecera.appendChild(th);
    }
    thead.appendChild(filaCabecera);
  
    var contenido = [    ["Juan", "Pérez", 25],
      ["María", "García", 30],
      ["Carlos", "López", 40]
    ];
    for (var i = 0; i < contenido.length; i++) {
      var fila = document.createElement("tr");
      for (var j = 0; j < contenido[i].length; j++) {
        var td = document.createElement("td");
        td.innerHTML = contenido[i][j];
        fila.appendChild(td);
      }
      tbody.appendChild(fila);
    }
  
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    document.getElementById("tabla-container").appendChild(tabla);
  }*/
  