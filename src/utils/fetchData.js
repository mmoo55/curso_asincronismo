/* Trasnformando a ES6 */

/* Instanciamos la dependencia para hacer las peticiones */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const fetchData = (url_api) => {
    return new Promise((resolve, reject) =>{
        /* Generamos la referencia hacia el objeto que necesitamos */
        const xhttp = new XMLHttpRequest();

        /* Hacemos el llamado a una URL */
        xhttp.open('GET', url_api, true);   // open(que petición queremos, URL, si queremos que se maneje de forma asíncrona(por defecto esta en true pero es de buena práctica y referencia ponerlo))

        /* Escuchamos lo que hará la conexión */
        xhttp.onreadystatechange = (() => {
            /* Validamos el estado en el que se encuentra para ver si ejecutamos el callback 
            
            Estados:
            0: request not initialized (Todavía no se llama open)
            1: server connection established (Cargando)
            2: request received (Ya cargado)
            3: processing request (Si hay alguna descarga o alguna información)
            4: request finished and response is ready (Completado)
            */
            if (xhttp.readyState === 4) {

                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error ', url_api))
            }
        });
        xhttp.send();
    });
}

/* Exportamos el modulo */
module.exports = fetchData;