
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

const userInfoUpdate = async (req, res) => {
    try {
        const current_user = await User.findById({_id: req.params.user_id});

        //get the change
        //to be implemented: at least one field edited
        const username = req.body.username;
        const useremail = req.body.useremail;

        if(username != "") {
            current_user["userName"] = username;
        }

        if(useremail != ""){
            current_user["email"] = useremail;
        }

        // save the updated user data in the database
        current_user.save();
        res.render('user-eportfolio', {user: current_user})
    } catch (err) {
        res.status(400);
        return res.send("Database query failed2");
    }
};

module.exports = {
    getCurrentUser,
    userUploadFile,
    userInfoUpdate
};