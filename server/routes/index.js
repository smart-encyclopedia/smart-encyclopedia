const routes = require('express').Router()
const Signincontroller = require('../controller/signincontroller')

routes.post('/signin', Signincontroller.login)    


module.exports = routes