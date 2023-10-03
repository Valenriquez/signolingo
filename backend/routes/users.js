const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/users.js')

router.get("/", userControllers.getAllUsers)
router.get("/:id", userControllers.getUser)
router.post("/add", userControllers.addUser)
router.put("/update/:id", userControllers.updateUser)
router.delete("/delete/:id", userControllers.deleteUser)

module.exports = router;