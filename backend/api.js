const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const db = require('./models')


dotenv.config()
const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// just uncomment this line to re sync the database (making changes to the database, remember it will delete all the previous data)

/*
db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync")
})
*/


app.get('/', (req, res) => {
  res.send('Main page')
})

// aquí están todas las rutas
app.use(require("./routes/routes.js"))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})