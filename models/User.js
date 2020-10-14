const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_id: mongoose.Schema.Types.ObjectId,
    visitorName: String,
    comment: String
});

const projectSchema = new mongoose.Schema({
    project_id: mongoose.Schema.Types.ObjectId,
    projectName: String,
    projectDesc: String,
    projectTheme: Number,
    fileInfo: [{
        fileId: mongoose.Schema.Types.ObjectId,
        fileName: String,
        fileDesc: String,
        fileType: String,
    }],
    comments: [commentSchema],
});

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
    project: [projectSchema],
});

const users = mongoose.model('users', userSchema, "users");
module.exports = users;


