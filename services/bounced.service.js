'use strict';

/**
 * data una lista de status codes, determina cual es el 
 * correspondiente y lo devuelve
 */
const getEsc = mimeMessage => {
    if(mimeMessage.includes('X-Fid')) {

        let dsn = mimeMessage.match(/Status: ([45]{1}\.[0-9]{1}\.[0-9]{1})/);
        if(dsn && dsn[1]) return dsn[1];

        let dsns = mimeMessage.match(/([45]{1}\.[0-9]{1}\.[0-9]{1})/g);
        if(!dsns) return;
        if(dsns.includes('5.1.1')) return '5.1.1';
        return dsns[0] || null;
    }

    return;
}

const getResponseMessage = mimeMessage => {
    let message = mimeMessage.match(/Diagnostic-Code: (.+)/);

    return message && message[1];
}

module.exports = {
    getEsc,
    getResponseMessage
};