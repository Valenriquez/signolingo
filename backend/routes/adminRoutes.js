//importing modules
const express = require('express')
const adminController = require('../controllers/adminController')
const { signup, login } = adminController
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

router.post('/signup', adminAuth.saveAdmin, signup)
router.post('/login', login )

module.exports = router