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
        fileType: String,
    }],
    project: [
        {
            projectId: mongoose.Schema.Types.ObjectId,
            projectName: String,
            projectDesc: String,
        }
    ],
});

const users = mongoose.model('users', userSchema, "users");
module.exports = users;


