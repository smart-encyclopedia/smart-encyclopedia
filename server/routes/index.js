const routes = require('express').Router()
const Signincontroller = require('../controller/signincontroller')
const sisaJalan = require('./sisa')

routes.post('/signin', Signincontroller.login)
routes.use('/sisa', sisaJalan)

module.exports = routes