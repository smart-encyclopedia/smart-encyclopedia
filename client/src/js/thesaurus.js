const axiosInstance = axios.create({
   baseURL: 'http://localhost:3000/thesaurus'
})

async function getThesaurusItems(word) {
   try {
      console.log('ini di getThesaurusItems', word)
      const {data} = await axiosInstance.get(`/${word}`)

      $('#adjectives').html('')
      $('#nouns').html('')
      $('#adverbs').html('')

      data.adjectives.forEach(async (adj) => {
         let translateId = await getLang(adj);
         $('#adjectives').append(`
            <li class="mr-4 list-style-none each-word">${adj} (<span class="italic">${translateId}</span>)</li>
         `)
      })

      data.adverbs.forEach(async (adv) => {
         let translateId = await getLang(adv);
         $('#adverbs').append(`
            <li class="mr-4 list-style-none each-word">${adv} (<span class="italic">${translateId}</span>)</li>
         `)
      })

      data.nouns.forEach(async (noun) => {
         let translateId = await getLang(noun);
         $('#nouns').append(`
            <li class="mr-4 list-style-none each-word">${noun} (<span class="italic">${translateId}</span>)</li>
         `)
      })
   }
   catch (error) {
      console.log(Object.keys(error))
      console.log(error)
   }
}