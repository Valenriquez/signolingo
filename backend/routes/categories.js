const express = require('express')
const router = express.Router()

const categoryControllers = require('../controllers/categories.js')

router.delete("/delete/:id", categoryControllers.deleteCategory)
router.get("/get/:id", categoryControllers.getCategory)
router.post("/add", categoryControllers.addCategory)
router.get("/getall", categoryControllers.getAllCategories)
router.put("/update/:id", categoryControllers.updateCategory)

module.exports = router;