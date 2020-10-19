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
    }],
    comments: [commentSchema],
    textboxs: [textboxSchema],
});

const Projects = mongoose.model('projects', projectSchema, "projects");
module.exports = Projects;