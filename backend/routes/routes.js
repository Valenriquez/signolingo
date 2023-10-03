const express = require('express')
const router = express.Router()

router.use("/users", require("./users.js"))

router.use("/api/v1/admins", require("./admins.js"))

router.use("/api/v1/categories", require("./categories.js"))

router.use("/api/v1/words", require("./words.js"))

// router.use("/api/v1/tracker", require("./tracker.js"))

router.use("/api/v1/settings", require("./settings.js"))

module.exports = router;