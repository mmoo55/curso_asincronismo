/* Instanciamos la dependencia para hacer las peticiones */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/* URL de la API para hacer las peticiones */
let API = 'https://rickandmortyapi.com/api/character/';

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
        if (xhttp.readyState === 4) {
            /* Validamos el status en el que se encuentra la petición */
            if (xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error('Error ' + url_api + ' status: ' + xhttp.status);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

// Primero se busca la lista de personajes
fetchData(API, function (error1, data1) {
    if (error1) return console.error(error1);
    // Luego se busca al primer personaje en este caso Rick y obtiene sus datos
    fetchData(API + data1.results[0].id, function (error2, data2) {
        if (error2) return console.error(error2);
        // Por ultimo consulta la url de "origin" del primer personaje para obtener la dimensión
        fetchData(data2.origin.url, function (error3, data3) {
            if (error3) console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    });
});