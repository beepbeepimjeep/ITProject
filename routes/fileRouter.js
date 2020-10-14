const express = require('express');

const fileRouter = express.Router();

const fileController = require('../controllers/fileController');
const requireLogin = require('../middleware/requireLogin');

fileRouter.get("/main/image/:filename" ,fileController.displayImage);
fileRouter.get("/main", requireLogin,fileController.displayAll)
fileRouter.delete("/delete/:fileid", requireLogin,fileController.deleteOne)
fileRouter.get("/edit", requireLogin,fileController.editFileDesc)
//fileRouter.post("/upload/:id",fileController.uploadFile)

module.exports = fileRouter;