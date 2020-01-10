const axios = require("axios");

class TranslatorController {
    static getSupportedLangs(req, res, next) {
        axios({
            url: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
            method: 'get',
            params: {
                key : process.env.DICTIONARY_KEY
            }
        })
            .then(({data}) => {
                res.status(200).json(data);
            }).catch(next);
    }
    
    static translate(req, res, next) {
        axios({
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
            method: 'get',
            params: {
                key : process.env.DICTIONARY_KEY,
                text : req.body.text,
                lang : `${req.body.from}-${req.body.to}`
            }
        })
            .then(({data}) => {
                res.status(200).json(data);
            }).catch(next);
    }

    static detectLang(req, res, next) {
        axios({
            url: 'https://translate.yandex.net/api/v1.5/tr.json/detect',
            method: 'get',
            params: {
                key : process.env.DICTIONARY_KEY,
                text : req.body.text
            }
        })
            .then(({data}) => {
                res.status(200).json(data);
            }).catch(next);
    }
}

module.exports = {
    TranslatorController
};