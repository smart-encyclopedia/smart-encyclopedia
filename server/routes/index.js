const routes = require('express').Router()
const Signincontroller = require('../controller/signincontroller')
const sisaJalan = require('./sisa')
const ThesaurusRoutes = require('./ThesaurusRoutes')
const translator = require('./translator');

routes.post('/signin', Signincontroller.login)
routes.use('/sisa', sisaJalan)
routes.use('/thesaurus', ThesaurusRoutes)
routes.use('/api/translator', translator);

module.exports = routes