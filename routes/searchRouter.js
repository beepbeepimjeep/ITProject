const express = require("express");
const searchRouter  = express.Router();

const searchController = require("../controllers/searchController.js");

//Get the search result using the store controller
searchRouter.get('/index', async(req,res) => searchController.getUser(req,res));


// export the router
module.exports = searchRouter;