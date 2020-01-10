const routes = require('express').Router()
const Signincontroller = require('../controller/signincontroller')
const sisaJalan = require('./sisa')
const ThesaurusRoutes = require('./ThesaurusRoutes')

routes.post('/signin', Signincontroller.login)
routes.use('/sisa', sisaJalan)

routes.use('/thesaurus', ThesaurusRoutes)

module.exports = routes