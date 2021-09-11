/* Instanciamos la dependencia */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function fetchData(url_api, callback) {
    /* Generamos la referencia hacia el objeto que necesitamos */
    let xhttp = new XMLHttpRequest();

    /* Hacemos el llamado a una URL */
    xhttp.open('GET', url_api, true);   // open(que petición queremos, URL, si queremos que se maneje de forma asíncrona(por defecto esta en true pero es de buena práctica y referencia ponerlo))

    /* Escuchamos lo que hará la conexión */
    xhttp.onreadystatechange = function (event) {
        /* Validamos el estado en el que se encuentra para ver si ejecutamos el callback 
        
        Estados:
        0: request not initialized (Todavía no se llama open)
        1: server connection established (Cargando)
        2: request received (Ya cargado)
        3: processing request (Si hay alguna descarga o alguna información)
        4: request finished and response is ready (Completado)
        */ 
        if(xhttp.readyState === 4) {
            /* Validamos el status en el que se encuentra la petición */
            if(xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error('Error ' + url_api + ' status: ' + xhttp.status);
                return callback(error, null);
            }
        }
    }
    xhttp.send();

}
