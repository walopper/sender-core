'use strict';

const errorHandler = require('../utils/errorHandler');

class Credits {
    constructor(db) {
        this.db = db;
    }

    /**
     * Obtiene datos de suscriptor por medio del email
     */
    async getAvailable(userId, creditsCount = 1, options = {}) {


        let [res,] = await this.db.query(`SELECT SUM(credits) as c 
                                                FROM om_users_credits 
                                                WHERE userid = ? && (expireIn >= NOW() || is_monthly = 1)`, [userId])
            .catch(errorHandler.catchThrow.call(this, `No se encontro suscriptor con el email ${email} en la lista ${lid}`));

        return (res && res[0] && res[0].c) || 0;
    }

}

module.exports = Credits;