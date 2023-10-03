const UserServices = require('../services/users');

module.exports = {
    getAllUsers: async (req, res, next) => {

        try {
            const users = await UserServices.getAllUsers(); 
            res.json({users});
        } 
        
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }

    },

    getUser: async (req, res) => {

        const id = req.params.id;

        try {
            const user = await UserServices.getUser(id); 
            res.json({user});
        } 
        
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }

    },

    addUser: async (req, res) => {

        // se pueden agregar mas campos en el body, como el password, nombre, etc.
        // const { email } = req.body; 

        try {
            const user = await UserServices.addUser(req.body); 
            res.json({user});
        } 
        
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },

    updateUser: async (req, res) => {

        const id = req.params.id;

        try {
            const user = await UserServices.updateUser(id, req.body); 
            res.json({user});
        } 
        
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }

    }, 

    deleteUser: async (req, res) => {

        const id = req.params.id;

        try {
            const user = await UserServices.deleteUser(id); 
            res.json({user});
        } 
        
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }

    }

};