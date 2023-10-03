const dbService = require('../config/db.js')

module.exports = {
    addSetting: (body) => {
        const {language, location} = body;
        sql = ` INSERT INTO settings(language, location)
                VALUES('${language}', '${location}') 
                RETURNING *`
        return dbService.querypromise(sql);
    },
    getSetting: (id) => {
        sql = ` SELECT id, language, location
                FROM settings 
                WHERE id = ${id}`
        return dbService.querypromise(sql);
    },
    updateSetting: (id, body) => {
        const {language, location} = body;
        sql = ` UPDATE settings
                SET language = '${language}', location = '${location}'
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    },
    deleteSetting: (id) => {
        sql = ` DELETE FROM settings
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    }
}