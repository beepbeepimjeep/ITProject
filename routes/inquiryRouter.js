const express = require("express");
const inquiryRouter  = express.Router();


const inquiryController = require("../controllers/inquiryController.js");

//Get the search result using the store controller
inquiryRouter.post('/ajax/email', async (req,res) => inquiryController.getInquiry(req,res));


// export the router
module.exports = inquiryRouter;