const dbService = require('../config/db.js')

module.exports = {
    getAdmin: (id) => {
        sql = ` SELECT id, email, username, isSuperUser
                FROM admins 
                WHERE id = ${id}`

        return dbService.querypromise(sql);
    },
    getAllAdmins: () => {
        sql = "SELECT id, email, username, isSuperUser FROM admins"
        return dbService.querypromise(sql);
    },
    deleteAdmin: (id) => {
        sql = ` DELETE FROM admins
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    }, 
    addAdmin: (body) => {
        const {email, username, password, issuperuser} = body;
        sql = ` INSERT INTO admins(email, username, password, issuperuser)
                VALUES('${email}', '${username}', '${password}', '${issuperuser}') 
                RETURNING *`
        return dbService.querypromise(sql);
    },
}