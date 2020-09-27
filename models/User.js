const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    googleId: String,
    userName: String,
    linkedinId: String,
    email: String,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects"
        }
    ]
    fileid: [String]
});

const users = mongoose.model('users', userSchema, "users");
module.exports = users;


