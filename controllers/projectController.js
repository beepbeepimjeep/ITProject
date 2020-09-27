const mongoose = require("mongoose");
const project = mongoose.model("projects");



const getCurrentProject = async (req, res) => {
    try {
        const current_project = await project.findById({_id: req.params.project_id});
        const all_comments = await current_project.populate("comments");
        res.render('testing-projectpage', {project: current_project, comments: all_comments})
    } catch (err){
        res.status(400);
        return res.send("Database query failed")
    }
};

const createNewComment = async (req, res) => {
    try {
        const current_project = await project.findOneAndUpdate(
            {_id: req.params.project_id},
            {$push:{
                comments:{
                    "comment": req.body.comment,
                    "visitorName": req.body.visitorName}}}).exec();
        res.json({message: `comment added!`})

    } catch (err){
        res.status(400);
        return res.send("Cannot add new comment")
    }
};



module.exports = {
    getCurrentProject,
    createNewComment
};





