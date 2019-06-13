const envConf = {
    mysql: {
        host: '179.60.184.16',
        user: 'root',
        password: 'FleetT%y6U/!1',
        database: 'fleetmailer',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    socketIO: {
        port: 3800
    },
    redis: {
        port: 6379,
        host: '179.60.184.16',
        password: 'DevTemFleet936',
    }
}

module.exports = envConf;