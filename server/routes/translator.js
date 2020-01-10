const routes = require('express').Router()
const {TranslatorController} = require('../controllers/translator');

routes.post('/translate', TranslatorController.translate);
routes.post('/supportedLangs', TranslatorController.getSupportedLangs);
routes.post('/detectLang', TranslatorController.detectLang);

module.exports = routes