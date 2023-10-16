const dbService = require('../config/db.js')

module.exports = {
    getWord: (id) => {
        sql = ` SELECT id, word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio
                FROM words 
                WHERE id = ${id}`
        return dbService.querypromise(sql);
    },
    getAllWords: () => {
        sql = ` SELECT id, word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio
                FROM words 
                ORDER BY word`
        return dbService.querypromise(sql);
    },
    addWord: (body) => {
        const {word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio} = body;
        sql = ` INSERT INTO words(word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio)
                VALUES('${word}', '${categoryid}', '${definition}', '${image}', '${suggested1}', '${suggested2}', '${video}', '${idsettings}', '${isscannable}', '${audio}') 
                RETURNING *`
        return dbService.querypromise(sql);
    },
    deleteWord: (id) => {
        sql = ` DELETE FROM words
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    },
    updateWord: (id, body) => {
        const {word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio} = body;
        sql = ` UPDATE words
                SET word = '${word}', categoryid = '${categoryid}', definition = '${definition}', image = '${image}', suggested1 = '${suggested1}', suggested2 = '${suggested2}', video = '${video}', idsettings = '${idsettings}', isscannable = '${isscannable}', audio = '${audio}'
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    },
    getWordsByCategory: (categoryid) => {
        sql = ` SELECT id, word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio
                FROM words 
                WHERE categoryid = ${categoryid}
                ORDER BY word`
        return dbService.querypromise(sql);
    },
    getWordByName: (word) => {
        sql = ` SELECT id, word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio
                FROM words 
                WHERE word = '${word}'`
        return dbService.querypromise(sql);
    }
}