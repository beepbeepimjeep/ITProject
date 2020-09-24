const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController.js');

userRouter.get('/:user_id', userController.getCurrentUser);

module.exports = userRouter;