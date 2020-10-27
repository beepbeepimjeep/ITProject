const mongoose = require("mongoose");
const User = mongoose.model("users");


const getUserEportfolio = async (req, res) => {
    try {
        const current_user = await User.findById({_id: req.params.user_id});

        res.render('user-eportfolio', {user: current_user, isUser: undefined})
    } catch (err){
        res.status(400);
        return res.send("Database query failed on fetching user's eportfolio")
    }
};

const getUserProject = async (req, res) => {
    try {
        const current_user = await User.findById({_id: req.params.user_id});

        res.render('userProject', {user: current_user, projectId: req.params.project_id, isUser: undefined})
    } catch (err){
        res.status(400);
        return res.send("Database query failed on fetching user's eportfolio")
    }
};

module.exports = {
    getUserEportfolio,
    getUserProject
};