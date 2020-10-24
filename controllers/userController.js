
const mongoose = require("mongoose");
const User = mongoose.model("users");


const getCurrentUser = async (req, res, next) => {
    try {
        const current_user = await req.user;
        const isLoggedIn = await req.login
        res.render('user-mainpage', {user: current_user, isUser: isLoggedIn })
    } catch (err){
        res.status(400);
        return res.send("Database query failed on getting the current user")
    }
};

const userUploadFile = async (req, res, next) => {
    try {
        const current_user = await req.user;
        const isLoggedIn = await req.login
        console.log(isLoggedIn)
        res.render('user-eportfolio', {user: current_user, isUser: isLoggedIn})
    } catch (err){
        res.status(400);
        return res.send("Database query failed on uploading file to user")
    }
};

const userInfoUpdate = async (req, res, next) => {
    try {
        const current_user = await req.user;
        const isLoggedIn = await req.login


        //get the change
        //to be implemented: at least one field edited
        const username = req.body.username;
        const useremail = req.body.useremail;
        const userexpertise = req.body.userexpertise;

        if(username != "") {
            current_user["userName"] = username;
        }

        if(useremail != ""){
            current_user["email"] = useremail;
        }
        if(userexpertise != ""){
            current_user["expertise"] = userexpertise;
        }




        // save the updated user data in the database
        current_user.save();
        res.render('user-eportfolio', {user: current_user, isUser: isLoggedIn})
    } catch (err) {
        res.status(400);
        return res.send("Database query failed2");
    }
};
const addNewProject = async (req,res,next)=>{
    var newProjName = req.query.projectName;
    var newProjDesc = req.query.projectDesc;
    var condition = {_id:req.user._id};
    console.log(req.user)
    var query = {$push:{project:{"projectName":newProjName,"projectDesc":newProjDesc}}}
    User.findOneAndUpdate(condition,query,function (err,res){
        if (err) throw err;
        console.log("create new project, project name: "+newProjName+" project desc: "+newProjDesc)
        User.close;
    })

    console.log("line 61 new project name is "+ newProjName)

    res.redirect("back")
}

const deleteProject =async (req,res,next)=>{
    var condition = {$and:[{_id:req.user._id}, {"project._id":req.params.projectId}]}
    var query = {$pull: {project:{_id:req.params.projectId}}}
    User.updateOne(condition,query,function (err, user){
        if (err) throw err;
        console.log("project deleted")
        res.redirect("back")
        User.close;
    })
}
module.exports = {
    getCurrentUser,
    userUploadFile,
    userInfoUpdate,
    addNewProject,
    deleteProject
};