const routes = require('express').Router()
const controlOCP = require('../controllers/controlOCP')

routes.get('/getMeaning', controlOCP.getMeaning)

module.exports = routes