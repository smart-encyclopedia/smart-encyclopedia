const axios = require('axios')
require('dotenv').config()

class ControlOCP {
    static getMeaning(req, res, next) {
        console.log("halo dari kontrol")
        axios.get("https://api.ocr.space/parse/imageurl", {
            headers: {
                apiKey: `${process.env.APIKEYOCR}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            params: {

                apikey: `${process.env.APIKEYOCR}`,
                url: req.query.url,
                language: req.query.lang,
                isOverlayRequired: "true"
            }
        })
            .then(response => {
                if (response) {
                    let forLoop = response.data.ParsedResults[0].TextOverlay.Lines
                    let fullText = []
                    let perWord = []
                    for (let i = 0; i < forLoop.length; i++) {
                        fullText.push(forLoop[i].LineText)
                        let loopWords = forLoop[i].Words
                        for (let j = 0; j < loopWords.length; j++) {
                            let word = loopWords[j].WordText
                            let pattern = /[^a-zA-Z0-9]/g
                            let filter = word.match(pattern)
                            let filteredWord = ''

                            // for (let k = 0; k < word.length; k++) {
                            //     if (!filter.includes(word[k])) {
                            //         filteredWord += word[k]
                            //     }
                            // }
                            // for (let character of word) {
                            //     if (!filter.includes(character)) {
                            //         filteredWord += character
                            //     }
                            // }

                            // if (!perWord.includes(filteredWord.toLowerCase())) {
                            //     perWord.push(filteredWord)
                            // }
                            if (!perWord.includes(word)) {
                                perWord.push(word)
                            }
                        }
                    }
                    res.status(200).json({ fullText, perWord })
                } else {
                    res.status(404).json({ message: "cannot parse the requested image" })
                }
            })
            .catch(err => {
                console.log("ini gagal", err, Object.keys(err))
                res.status(500).json({ err, message: "internal server error" })
            })
    }
}

module.exports = ControlOCP