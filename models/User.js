const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    googleId: String,
    userName: String,
    linkedinId: String,
    email: String,
    expertise: String,
    occupation: String,
    fileInfo: [{
        fileId: mongoose.Schema.Types.ObjectId,
        fileName: String,
        fileDesc: String,
    }],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects"
        }
    ],
});

const users = mongoose.model('users', userSchema, "users");
module.exports = users;


