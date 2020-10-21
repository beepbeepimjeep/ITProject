const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController.js');
const requireLogin = require('../middleware/requireLogin');

userRouter.get('/', requireLogin,userController.getCurrentUser);
userRouter.get('/user-eportfolio/', requireLogin,userController.userUploadFile);
userRouter.put('/', requireLogin,userController.userInfoUpdate);
userRouter.get('/user-eportfolio/addNewProject', requireLogin,userController.addNewProject);
userRouter.get('/user-eportfolio/:projectId/deleteProject', requireLogin,userController.deleteProject)
userRouter.get('/user-eportfolio/userProject/:projectId', requireLogin,userController.displayProject)
userRouter.post('/user-eportfolio/addFiletoProject', requireLogin, userController.editProjectFile)
userRouter.post('/user-eportfolio/savePosition',requireLogin,userController.savePosition)
module.exports = userRouter;