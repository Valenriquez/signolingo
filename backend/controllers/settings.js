const SettingService = require('../services/settings')

module.exports = {
    addSetting: async (req, res) => {
        const body = req.body;
        try {
            const setting = await SettingService.addSetting(body); 
            res.json({setting});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getSetting: async (req, res) => {
        const id = req.params.id;
        try {
            const setting = await SettingService.getSetting(id); 
            res.json({setting});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    updateSetting: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const setting = await SettingService.updateSetting(id, body); 
            res.json({setting});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    deleteSetting: async (req, res) => {
        const id = req.params.id;
        try {
            const setting = await SettingService.deleteSetting(id); 
            res.json({setting});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    }
}