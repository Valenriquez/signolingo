const express = require('express')
const router = express.Router()

const adminControllers = require('../controllers/admins.js')

router.delete("/delete/:id", adminControllers.deleteAdmin)
router.get("/get/:id", adminControllers.getAdmin)
router.post("/add", adminControllers.addAdmin)
router.get("/getall", adminControllers.getAllAdmins)

module.exports = router;