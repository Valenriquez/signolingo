const dbService = require('../config/db.js')

module.exports = {
    getAllUsers: () => {

        sql = "SELECT id, email FROM usuario"

        return dbService.querypromise(sql);
    },
    getUser: (id) => {

        sql = ` SELECT id, email
                FROM usuario 
                WHERE id = ${id}`

        return dbService.querypromise(sql);

    },
    addUser: (body) => {

        const {email} = body;

        sql = ` INSERT INTO usuario(email)
                VALUES('${email}') 
                RETURNING *`

        return dbService.querypromise(sql);

    },
    updateUser: (id, body) => {

        const {email} = body;

        sql = ` UPDATE usuario
                SET email = '${email}'
                WHERE id = ${id} 
                RETURNING *`

        return dbService.querypromise(sql);

    }, 
    deleteUser: (id) => {

        sql = ` DELETE FROM usuario
                WHERE id = ${id} 
                RETURNING *`

        return dbService.querypromise(sql);

    }
};