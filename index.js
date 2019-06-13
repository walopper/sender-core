'use strict';

const mysql = require('mysql2/promise');
const Redis = require('ioredis');
const logger = require('./controllers/logger.controller');
const listsService = require('./services/lists.service');
const messagesService = require('./services/messages.service');
const sendController = require('./controllers/send.controller');
  
const config = require('./config.js');

logger.info(`Starting Sender-core app in ${config.env} mode`);

async function initDb() {
    const db = await mysql.createPool(config.mysql)
        .then(result => {
            logger.info("Conectado con MySQL");
            return result;
        }).catch(error => {
            logger.error("Error al conectar con mysql");
            logger.error(error);
        });

    if (!db) {
        throw "No se pudo conectar con MySQL server";
    }

    await db.query('SELECT clave, valor FROM om_config')
        .then(([results]) => {
            results.forEach(row => row.clave ? config[row.clave] = row.valor : 0);
            initApp(db);
        })
        .catch(error => logger.error(error));
}

async function initApp(db) {
    const ListsService = new listsService(db);
    const MessagesService = new messagesService(db);
    const SendController = new sendController(ListsService, MessagesService);

    var redis = new Redis(config.redis);


}

function init() {
    initDb().catch(error => {
        console.error(error);
        setTimeout(init, 2000);
    });
}

init();