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

         const {data} = await axios.get(`/${req.params.word}/json`)

         res.status(200).json({
            adjectives: data.adjective.syn,
            adverbs: data.adverb.syn,
            nouns: data.noun.syn
         })
      }
      catch (error) {
         next(error)
      }
   }
}


module.exports = ThesaurusController