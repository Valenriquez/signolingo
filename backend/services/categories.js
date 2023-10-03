const dbService = require('../config/db.js')

module.exports = {
    addCategory: (body) => {
        const {name, color, icon, idsettings, isscannable} = body;
        sql = ` INSERT INTO categories(name, color, icon, idsettings, isscannable)
                VALUES('${name}', '${color}', '${icon}', '${idsettings}', '${isscannable}') 
                RETURNING *`
        return dbService.querypromise(sql);
    }, 
    getAllCategories: () => {
        sql = "SELECT id, name, color, icon, idsettings, isscannable FROM categories"
        return dbService.querypromise(sql);
    },
    getCategory: (id) => {
        sql = ` SELECT id, name, color, icon, idsettings, isscannable
                FROM categories 
                WHERE id = ${id}`
        return dbService.querypromise(sql);
    },
    deleteCategory: (id) => {
        sql = ` DELETE FROM categories
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    },
    updateCategory: (id, body) => {
        const {name, color, icon, idsettings, isscannable} = body;
        sql = ` UPDATE categories
                SET name = '${name}', color = '${color}', icon = '${icon}', idsettings = '${idsettings}', isscannable = '${isscannable}'
                WHERE id = ${id} 
                RETURNING *`
        return dbService.querypromise(sql);
    }
} 
