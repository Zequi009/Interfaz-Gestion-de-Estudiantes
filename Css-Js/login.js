/*function logi(event) {
    event.preventDefault();

    var username = document.getElementById('usuario').value;
    var password = document.getElementById('contraseña').value;

    var xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            console.log(percentComplete + '% uploaded');
            updateProgressBar(percentComplete); // Llama a la función para actualizar la barra de progreso
        }
    }, false);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var userType = response.userType;
                if (userType === 'admin') {
                    window.location.href = 'http://localhost/Nueva%20carpeta/Menu_Principal.html';
                } else if (userType === 'profesor') {
                    window.location.href = 'http://localhost/Nueva%20carpeta/Menu_Principal(Profesor).html';
                } else {
                    alert('Usuario o Contraseña Incorrecto');
                }
            } else if (xhr.status === 500) {
                window.location.href = 'http://localhost/Nueva%20carpeta/pagina%20_Error_Conexion_Bd.html';
            } else {
                alert('Error al enviar la solicitud');
            }
        }
    };

    xhr.open('POST', 'URL_API'); // Reemplazar 'URL_API' con la URL real de tu API
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    var data = {
        USER: username,
        PASSWORD: password
    };
    xhr.send(JSON.stringify(data));

    // Elimina el d-none
    var divContainer = document.querySelector('.container.d-none');
    divContainer.classList.remove('d-none');
}

function updateProgressBar(percent) {
    var progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
}*/




document.getElementById('loginForm').addEventListener('submit', function (event) {
    logi(event);
});

function logi(event) {
    event.preventDefault();

    var username = document.getElementById('usuario').value;
    var password = document.getElementById('contraseña').value;

    var divContainer = document.querySelector('.container.d-none');
    divContainer.classList.remove('d-none');
    
    // Simulación de la solicitud a la API con un retraso de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        var userType = ''; // Simulación de datos del usuario

        // Lógica de simulación de usuario
        if (username === 'admin' && password === 'admin123') {
            userType = 'admin';
        } else if (username === 'profesor' && password === 'profesor123') {
            userType = 'profesor';
        } else {
            userType = 'error'; // Simulación de error de usuario o contraseña incorrectos
        }

        handleResponse(userType); // Llama a la función para manejar la respuesta simulada
    }, 5000); // Simula un retraso de 5 segundos (5000 milisegundos)
}

function handleResponse(userType) {

    // Progresión de la barra de carga
    var progress = 0;
    var progressBar = document.querySelector('.progress-bar');

    var interval = setInterval(function () {
        progress += 2; // Incrementa el progreso (Puedes ajustar el incremento según tu preferencia)

        // Actualiza el ancho de la barra de progreso
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);

        // Cuando la barra alcanza el 100%, detiene la simulación
        if (progress >= 100) {
            clearInterval(interval);

            // Realiza la redirección según el tipo de usuario
            if (userType === 'admin') {
                window.location.href = 'http://localhost/Nueva%20carpeta/Menu_Principal.html';
            } else if (userType === 'profesor') {
                window.location.href = 'http://localhost/Nueva%20carpeta/Menu_Principal(Profesor).html';
            } else {
                alert('Usuario o Contraseña Incorrecto');
            }
        }
    }, 200); // Tiempo de intervalo (Puedes ajustarlo para que la barra avance más lento o más rápido)
}
