const express = require('express');

const usertestRouter = express.Router();

const usertestController = require('../controllers/usertestController.js');

usertestRouter.get("/",usertestController.getAllUser);

module.exports = usertestRouter;
