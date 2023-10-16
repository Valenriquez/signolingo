const WordService = require('../services/words')

module.exports = {
    getWord: async (req, res) => {
        const id = req.params.id;
        try {
            const word = await WordService.getWord(id); 
            res.json({word});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getAllWords: async (req, res, next) => {
        try {
            const words = await WordService.getAllWords(); 
            res.json({words});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    addWord: async (req, res) => {
        const body = req.body;
        try {
            const word = await WordService.addWord(body); 
            res.json({word});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    deleteWord: async (req, res) => {
        const id = req.params.id;
        try {
            const word = await WordService.deleteWord(id); 
            res.json({word});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    updateWord: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const word = await WordService.updateWord(id, body); 
            res.json({word});
        }  
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getWordsByCategory: async (req, res) => {
        const categoryid = req.params.categoryid;
        try {
            const wordsFiltered = await WordService.getWordsByCategory(categoryid); 
            res.json({wordsFiltered});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    },
    getWordByName: async (req, res) => {
        const word = req.params.word;
        const apikey = req.body.apikey;
        try {
            if (apikey !== process.env.API_KEY) {
                throw new Error('Invalid API Key')
            }
            const words = await WordService.getWordByName(word); 
            res.json({words});
        } 
        catch (err) {
            res.json({"mesasge": `Error: ${err}`})
        }
    }
}