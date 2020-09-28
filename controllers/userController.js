
const mongoose = require("mongoose");
const User = mongoose.model("users");


const getCurrentUser = async (req, res) => {
    try {
        const current_user = await User.findById({_id: req.params.user_id})
        res.render('user-mainpage', {user: current_user})
    } catch (err){
        res.status(400);
        return res.send("Database query failed")
    }
};

const userUploadFile = async (req, res) => {
    try {
        const current_user = await User.findById({_id: req.params.user_id})
        res.render('user-eportfolio', {user: current_user})
    } catch (err){
        res.status(400);
        return res.send("Database query failed")
    }
};


module.exports = {
    getCurrentUser,
    userUploadFile
};