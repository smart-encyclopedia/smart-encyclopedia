const axiosInstance = axios.create({
   baseURL: 'http://localhost:3000/thesaurus'
})

async function getThesaurusItems(word) {
   try {
      const {data} = await axiosInstance.get(`/${word}`)

      $('#adjectives').html('')
      $('#nouns').html('')
      $('#adverbs').html('')

      data.adjectives.forEach(adj => {
         $('#adjectives').append(`
            <li class="mr-4 list-style-none">${adj}</li>
         `)
      })

      data.adverbs.forEach(adv => {
         $('#adverbs').append(`
            <li class="mr-4 list-style-none">${adv}</li>
         `)
      })

      data.nouns.forEach(noun => {
         $('#nouns').append(`
            <li class="mr-4 list-style-none">${noun}</li>
         `)
      })
   }
   catch (error) {
      console.log(Object.keys(error))
      console.log(error)
   }
}