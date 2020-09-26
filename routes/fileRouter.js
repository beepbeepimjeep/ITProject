const express = require('express');

const fileRouter = express.Router();

const fileController = require('../controllers/fileController');

fileRouter.get("/image/:filename",fileController.displayImage);
fileRouter.get("/main",fileController.displayAll)
fileRouter.delete("/delete/:id",fileController.deleteOne)



module.exports = fileRouter;