const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT

const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

app.get('/', (req, res) => {
  res.send('Main page')
})

// aquí están todas las rutas
app.use(require("./routes/routes.js"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})