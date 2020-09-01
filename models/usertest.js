const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    info: String
});
const user = mongoose.model("user", userSchema, "UserSampleTest");
module.exports = user;