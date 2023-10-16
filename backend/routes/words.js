const express = require('express')
const router = express.Router()

const wordsControllers = require('../controllers/words.js')

router.delete("/delete/:id", wordsControllers.deleteWord)
router.get("/get/:id", wordsControllers.getWord)
router.post("/add", wordsControllers.addWord)
router.get("/getall", wordsControllers.getAllWords)
router.put("/update/:id", wordsControllers.updateWord)
router.get("/getbycategory/:categoryid", wordsControllers.getWordsByCategory)

router.get("/getbyname/:word", wordsControllers.getWordByName)

module.exports = router;