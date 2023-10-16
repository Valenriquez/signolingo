const dbService = require('../config/db.js')

module.exports = {
    getAllWords: () => {
        sql = ` SELECT id, word, counter, islisted, idsettings FROM tracker
            ORDER BY counter DESC`
        return dbService.querypromise(sql);
    },

    addWord: (word) => {
        // aumenta el contador de la palabra al ser buscada
        sql = `DO $$ -- A. Code Block para juntar todo
        DECLARE
            count_tracker INTEGER;
        BEGIN
            -- Paso 1: Verificar si la palabra está en la tabla tracker
            SELECT COUNT(*) INTO count_tracker FROM tracker WHERE word = '${word}';
        
            IF count_tracker > 0 THEN
                -- Paso 2: La palabra ya está en la tabla tracker, aumenta el contador
                UPDATE tracker
                SET counter = counter + 1
                WHERE word = '${word}';
        
            ELSE
                -- Paso 3: La palabra no está en la tabla tracker, agrega una nueva entrada
                INSERT INTO tracker (word, counter, islisted, idsettings)
                VALUES ('${word}', 1, false, 1);
            END IF;
        
            -- Paso 4: Verificar si la palabra existe en la tabla words
            IF EXISTS (SELECT 1 FROM words WHERE word = '${word}') THEN
                -- Paso 5: La palabra existe en la tabla words, marca islisted como verdadero en tracker
                UPDATE tracker
                SET islisted = true
                WHERE word = '${word}';
            ELSE
                -- Paso 6: La palabra no existe en la tabla words, actualiza islisted a falso en tracker
                UPDATE tracker
                SET islisted = false
                WHERE word = '${word}';
            END IF;
        END $$; -- A. Code Block para juntar todo
        `
        return dbService.querypromise(sql);
    }
}