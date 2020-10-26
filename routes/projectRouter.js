const express = require('express');

const projectRouter = express.Router();

const projectController = require('../controllers/projectController.js');

projectRouter.get('/:project_id', projectController.getCurrentProject);
projectRouter.post('/:project_id', projectController.createNewComment);

projectRouter.get('/edit-project/:project_id', projectController.editProject);
projectRouter.post('/edit-project/:project_id', projectController.createNewTextbox);

projectRouter.post('/editTheme/:project_id', projectController.changeTheme);

module.exports = projectRouter;