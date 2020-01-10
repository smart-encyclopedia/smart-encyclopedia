const axios = require('axios').create({
   baseURL: 'https://words.bighugelabs.com/api/2/c5186c9964a598a86095129c204a793d'
})

// https://words.bighugelabs.com/api/2/c5186c9964a598a86095129c204a793d/smart/json

class ThesaurusController {
   static async getThesaurus(req, res, next) {
      try {
         if(!req.params || !req.params.word) throw {
            errorCode: 400,
            message: 'The word need to be specified'
         }

         // console.log(req.params.word, '0ewngf939g03=====================================')

         const {data} = await axios.get(`/${req.params.word}/json`)
         // console.log(data, 'this is data----------\n\n')

         const outputs = {}

         // console.log(data)

         if(data.adjective) outputs.adjectives = data.adjective.syn
         else outputs.adjectives = []

         if(data.noun) outputs.nouns = data.noun.syn
         else outputs.nouns = []

         if(data.adverb) outputs.adverbs = data.adverb.syn
         else outputs.adverbs = []
         
         res.status(200).json(outputs)
      }
      catch (error) {
         console.log(Object.keys(error))
         next(error)
      }
   }
}


module.exports = ThesaurusController