'use strict';

const config = {
    optionDefinitions: [{
        name: 'mid',
        alias: 'v',
        type: Number,
        multiple: false,
        defaultOption: false
    }]
};


config.env = process.env.NODE_ENV || 'production';
const envConf = require(`./config/${config.env}`);

module.exports = { ...config, ...envConf };