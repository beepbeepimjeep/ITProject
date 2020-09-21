const express = require("express");
const storeRouter  = express.Router();

const storeController = require("../controllers/storeController.js");

//Get the store page using the store controller
storeRouter.get('/stores', async(req,res) => storeController.getStore(req,res));


// export the router
module.exports = storeRouter;