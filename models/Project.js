const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_id: mongoose.Schema.Types.ObjectId,
    visitorName: String,
    comment: String
});

const projectSchema = new mongoose.Schema({
    project_id: mongoose.Schema.Types.ObjectId,
    projectName: String,
    comments: [commentSchema],
});

const Projects = mongoose.model('projects', projectSchema, "projects");
module.exports = Projects;