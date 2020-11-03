const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController.js');
const requireLogin = require('../middleware/requireLogin');

userRouter.get('/user-eportfolio/', requireLogin,userController.userUploadFile);
userRouter.put('/', requireLogin,userController.userInfoUpdate);
userRouter.get('/user-eportfolio/addNewProject', requireLogin,userController.addNewProject);
userRouter.get('/user-eportfolio/:projectId/deleteProject', requireLogin,userController.deleteProject)
userRouter.get('/user-eportfolio/userProject/:projectId', requireLogin,userController.displayProject)
userRouter.post('/user-eportfolio/addFiletoProject', requireLogin, userController.editProjectFile)
userRouter.post('/user-eportfolio/savePosition',requireLogin,userController.savePosition)
userRouter.post('/user-eportfolio/user-project/editTheme/:projectId', requireLogin,userController.changeTheme);

userRouter.get('/user-eportfolio/user-project/edit-project/:projectId', requireLogin,userController.editProject);
userRouter.post('/user-eportfolio/user-project/edit-project/:projectId', requireLogin,userController.createNewTextbox);
userRouter.post('/user-eportfolio/user-project/edit-project/:projectId/delete-tb/:textboxId', requireLogin,userController.deleteTextbox);


userRouter.post('/user-eportfolio/user-project/addComment/:projectId', requireLogin,userController.createNewComment);
userRouter.post("/user-eportfolio/user-project/:projectId/deleteComment/:commentId", requireLogin,userController.deleteComment);
userRouter.post('/user-eportfolio/deleteProjectFile',requireLogin,userController.deleteProjectFile);

module.exports = userRouter;