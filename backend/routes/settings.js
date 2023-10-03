const express = require('express')
const router = express.Router()

const settingsControllers = require('../controllers/settings.js')

router.delete("/delete/:id", settingsControllers.deleteSetting)
router.get("/get/:id", settingsControllers.getSetting)
router.post("/add", settingsControllers.addSetting)
router.put("/update/:id", settingsControllers.updateSetting)

module.exports = router;