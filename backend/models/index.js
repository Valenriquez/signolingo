//importing modules
const {Sequelize, DataTypes} = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres'
});

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.admins = require('./adminModel') (sequelize, DataTypes)

//exporting the module
module.exports = db