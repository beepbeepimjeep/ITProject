
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
        // Get the profile page of the user..
        const username = req.body.username;
        //const useremail = '';
        const useremail = req.body.useremail;
        //find the user


        /*
        // update the user information
        for (const i in user){
            // if there is an update on their profile, we change that value.
            if (new_profile[i]) {
                var object = `${i}`;
                user[object] = new_profile[i];
            }
        }
        */
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