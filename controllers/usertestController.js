const mongoose  = require("mongoose");

const user = mongoose.model("user")

const getAllUser = async (req,res)=>{
    try {
        const all_user = await user.find();
        console.log(all_user)
        return res.send(all_user);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};
module.exports = {
    getAllUser,
}