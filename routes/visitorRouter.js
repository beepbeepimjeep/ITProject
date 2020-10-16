const express = require('express');

const visitorRouter = express.Router();

const visitorController = require('../controllers/visitorController.js');

visitorRouter.get('/:user_id', visitorController.getUserEportfolio);

module.exports = visitorRouter;