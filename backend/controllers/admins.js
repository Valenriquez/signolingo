const AdminServices = require('../services/admins');

module.exports = {
    getAdmin: async (req, res) => {
        const id = req.params.id;
        try {
            const admin = await AdminServices.getAdmin(id); 
            res.json({admin});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    deleteAdmin: async (req, res) => {
        const id = req.params.id;
        try {
            const admin = await AdminServices.deleteAdmin(id); 
            res.json({admin});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    }, 
    addAdmin: async (req, res) => {
        const body = req.body;
        try {
            const admin = await AdminServices.addAdmin(body); 
            res.json({admin});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getAllAdmins: async (req, res, next) => {
        try {
            const admins = await AdminServices.getAllAdmins(); 
            res.json({admins});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
};