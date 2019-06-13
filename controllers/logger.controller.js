'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const config = require('../config.js');

const winstonConfig = require('../config/winston');

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${message}`;
});

const _logger = createLogger({
    level: 'debug',
    // format: format.json(),
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        // loggeo errores
        new transports.File({
            filename: '/var/log/sender-core-error.log',
            level: 'error',
            ...winstonConfig.transports.error
        }),
        // loggeo todo
        new transports.File({
            filename: '/var/log/sender-core.log',
            ...winstonConfig.transports.main
        })
    ],
    'outputCapture': 'std'
});

const logger = (config.env !== 'production')
    ? {
        info: console.log,
        error: console.error
    }
    : _logger;

module.exports = logger;