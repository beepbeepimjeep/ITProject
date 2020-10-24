const mongoose = require("mongoose");
const project = mongoose.model("projects");



const getCurrentProject = async (req, res) => {
    try {
        const current_project = await project.findById({_id: req.params.project_id});
        const all_comments = await current_project.populate("comments");
        res.render('user-project', {project: current_project, comments: all_comments})
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
        res.redirect(`/user-eportfolio/user-project/${current_project._id}`)

    } catch (err){
        res.status(400);
        return res.send("Cannot add new comment")
    }
};


const changeTheme = async (req, res) => {
    try {
        const current_project = await project.findOneAndUpdate(
            {_id: req.params.project_id},
            {$set:{"projectTheme": req.body.theme}}).exec();
        res.redirect("back")
    } catch (err){
        res.status(400);
        return res.send("Cannot change theme!")
    }
};



module.exports = {
    getCurrentProject,
    createNewComment,
    changeTheme
};





