const express = require('express');

const projectRouter = express.Router();

const projectController = require('../controllers/projectController.js');

projectRouter.get('/:project_id', projectController.getCurrentProject);
projectRouter.post('/:project_id', projectController.createNewComment);
projectRouter.post('/editTheme/:project_id', projectController.changeTheme);
module.exports = projectRouter;