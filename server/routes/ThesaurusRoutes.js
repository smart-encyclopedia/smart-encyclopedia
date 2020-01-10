const routes = require('express').Router()
const ThesaurusController = require('../controllers/ThesaurusController')
const {userAuthentication} = require('../middlewares/auth')

// routes.use(userAuthentication)
routes.get('/:word', ThesaurusController.getThesaurus)

module.exports = routes