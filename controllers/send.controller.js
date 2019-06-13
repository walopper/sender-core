'use strict';

const Q = require('q');

class sendController {
    constructor(ListsService, MessagesService) {
        this.MessagesService = MessagesService;
        this.ListsService = ListsService;
    }

    /**
     * 
     * @param {*} requestData datos del email
     * @param {*} callback funcion a ejecutar cuando termina el envio.
     */
    onSendRequest(requestData, callback) {
        var deferred = Q.defer();

        return deferred.promise;
    }
}

module.exports = sendController;