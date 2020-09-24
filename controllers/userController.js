
const mongoose = require("mongoose");
const User = mongoose.model("users");


const getCurrentUser = async (req, res) => {
    try {
        const current_user = await User.findById({_id: req.params.user_id})
        return res.send(current_user);
    } catch (err){
        res.status(400);
        return res.send("Database query failed")
    }
};

module.exports = {
    getCurrentUser,
};