const express = require('express')
const router = express.Router()

router.use("/api/v1/admins", require("./admins.js"))

router.use("/api/v1/categories", require("./categories.js"))

router.use("/api/v1/words", require("./words.js"))

router.use("/api/v1/tracker", require("./tracker.js"))

router.use("/api/v1/settings", require("./settings.js"))

router.use("/api/v1/adminsauth", require("./adminRoutes.js"))

module.exports = router;