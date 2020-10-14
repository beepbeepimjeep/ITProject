const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController.js');

userRouter.get('/:user_id', userController.getCurrentUser);
userRouter.get('/user-eportfolio/:user_id', userController.userUploadFile);
userRouter.put('/:user_id', userController.userInfoUpdate);
userRouter.get('/user-eportfolio/:userid/addNewProject', userController.addNewProject);
userRouter.get('/user-eportfolio/:userid/:projectId/deleteProject', userController.deleteProject)
module.exports = userRouter;