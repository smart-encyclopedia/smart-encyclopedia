require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.listen(port, () => console.log(`express server is listening on ${port}`))

mongoose.connect(`mongodb://localhost:27017/smart-encyclopedia_${process.env.NODE_ENV}`, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

if(process.env.NODE_ENV == 'development') {
   app.use(require('morgan')('dev'))
}

app.use('/', routes)
app.use(errorHandler)
