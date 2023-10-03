const CategoryService = require('../services/categories')

module.exports = {
    addCategory: async (req, res) => {
        const body = req.body;
        try {
            const category = await CategoryService.addCategory(body); 
            res.json({category});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await CategoryService.getAllCategories(); 
            res.json({categories});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getCategory: async (req, res) => {
        const id = req.params.id;
        try {
            const category = await CategoryService.getCategory(id); 
            res.json({category});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    deleteCategory: async (req, res) => {
        const id = req.params.id;
        try {
            const category = await CategoryService.deleteCategory(id); 
            res.json({category});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    updateCategory: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const category = await CategoryService.updateCategory(id, body); 
            res.json({category});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    }
}