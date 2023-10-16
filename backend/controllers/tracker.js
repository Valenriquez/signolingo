const TrackerService = require('../services/tracker');

module.exports = {
    getAllWords: async (req, res, next) => {
        try {
            const tracker = await TrackerService.getAllWords(); 
            res.json({ tracker });
        }  
        catch (err) {
            res.json({ message: `Error: ${err}` });
        }
    },
    addWord: async (req, res) => {
        const word = req.params.word;
        try {
            const tracker = await TrackerService.addWord(word); 
            res.json({ tracker });
        }  
        catch (err) {
            res.json({ message: `Error: ${err}` });
        }
    },
};