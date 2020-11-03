const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_id: mongoose.Schema.Types.ObjectId,
    visitorName: String,
    comment: String
});

const textboxSchema = new mongoose.Schema({
    textbox_id: mongoose.Schema.Types.ObjectId,
    top: String,
    left: String,
    height: String,
    width: String,
    background: String,
    border: String,
    text: String
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
        fileStyle: String,
    }],
    comments: [commentSchema],
    textboxs: [textboxSchema],
});

const userSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    googleId: String,
    userName: String,
    linkedinId: String,
    email: String,
    expertise: String,
    description: String,
    occupation: String,
    iconImage: String,
    description: String,
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


