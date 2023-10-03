const dbService = require('../config/db.js')

module.exports = {
    getAdmin: (id) => {
        sql = ` SELECT id, email, name, isSuperUser
                FROM admins 
                WHERE id = ${id}`

        return dbService.querypromise(sql);
    },
    getAllAdmins: () => {
        sql = "SELECT id, email, name, isSuperUser FROM admins"
        return dbService.querypromise(sql);
    },
    deleteAdmin: (id) => {
        sql = ` DELETE FROM admins
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    }, 
    addAdmin: (body) => {
        const {email, name, password, issuperuser} = body;
        sql = ` INSERT INTO admins(email, name, password, issuperuser)
                VALUES('${email}', '${name}', '${password}', '${issuperuser}') 
                RETURNING *`
        return dbService.querypromise(sql);
    },
}