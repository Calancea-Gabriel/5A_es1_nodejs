/*
    http -> modulo indispensabile per creare una comunicazione client-server
    require -> come una import
    url -> analizzare e parsificare l'url
*/
const http = require('http');
const { default: test } = require('node:test');
const url = require('url');
/*
    1° parametro -> richiesta arrivata dal client
    2° parametro -> risposta inviata dal server
*/
let server = http.createServer((richiesta, risposta) => {
    /**************** RICHIESTA ******************/
    let testoRisposta = `
        url: ${richiesta.url}
        host: ${richiesta.headers.host}
        method: ${richiesta.method}
    `;

    // Estraggo le info dalla stringa completa scritta dal client nella barra degli indirizzi
    let indirizzo = richiesta.headers.host + richiesta.url;
    let infoUrl = url.parse(indirizzo, true); // true -> parsifico anche i parametri

    testoRisposta += `
        pathname: ${infoUrl.pathname}
        parametri: ${infoUrl.search}
    `;

    // Estraggo i parametri dall'url
    let parametri = infoUrl.query;
    testoRisposta += `
        action: ${parametri.action}
        parametro1: ${parametri.parametro1}
    `;

    /**************** RISPOSTA ******************/
    /*
        INTESTAZIONE DELLA RIPOSTA
        1° parametro -> codice di stato -> 200 = OK / 404 = Not Found
        2° parametro -> oggetto JSON -> insieme di opzioni che vogliamo inserire nell'intestazione
    */
    let header = {"Content-Type": "text/plain"};
    risposta.writeHead(200, header);

    // Inserire il contenuto del pacchetto (Posso richiamare write anche più di una volta)
    risposta.write("FACCIO LETS GO <br/>" + testoRisposta);

    // Informo il serve che ho terminato di preparare il pacchetto di risposta
    risposta.end(); 
});

server.listen(1337);
console.log("Server in ascolto sulla porta 1337 - IP: 10.88.247.131");