const express = require('express')
const router = express.Router()
const trackerControllers = require('../controllers/tracker.js')

router.get("/getall", trackerControllers.getAllWords)
router.post("/add/:word", trackerControllers.addWord)

module.exports = router;