const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController.js');

userRouter.get('/:user_id', userController.getCurrentUser);
userRouter.post('/go_to_upload/:user_id', userController.userUploadFile);

module.exports = userRouter;