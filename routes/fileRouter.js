const express = require('express');

const fileRouter = express.Router();

const fileController = require('../controllers/fileController');

fileRouter.get("/main/image/:filename",fileController.displayImage);
fileRouter.get("/main/:id",fileController.displayAll)
fileRouter.delete("/delete/:fileid/:userid",fileController.deleteOne)
//fileRouter.post("/upload/:id",fileController.uploadFile)

module.exports = fileRouter;