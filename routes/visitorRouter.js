const express = require('express');

const visitorRouter = express.Router();

const visitorController = require('../controllers/visitorController.js');

visitorRouter.get('/:user_id', visitorController.getUserEportfolio);
visitorRouter.get('/:user_id/project/:project_id', visitorController.getUserProject);

module.exports = visitorRouter;