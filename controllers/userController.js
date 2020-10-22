
const mongoose = require("mongoose");
const User = mongoose.model("users");
const files = mongoose.model("file")

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
        res.render('user-eportfolio', {user: current_user})
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

const displayProject = async (req,res,next)=>{
    try{
        const currentUser = await req.user;
        res.render('userProject',{user:currentUser,projectId:req.params.projectId})
    }catch (e){}
}

const editProjectFile = async (req, res, next)=>{
    const fileId = req.body.fileId
    try{
        const user = await req.user;
        var condition = {$and:[{_id:user._id}, {"project._id":req.body.projectId}]}
        var query = {filename:fileId}
        const file = await files.findOne(query,{_id:1,"filename":1,"contentType":1}).limit(1)
        console.log("line 102 "+file['_id'])
        var userQuery = {$push:{"project.$.fileInfo":{"fileId":file['_id'],"fileName":file['filename'],"fileType":file['contentType'],"fileStyle":"none"}}}
        const user1 = await User.updateOne(condition,userQuery)
        res.redirect('back')
    }catch (err){

    }
}

const savePosition = async (req,res,next)=>{
    console.log("filename is "+req.body.fileName)
    console.log("position is "+req.body.position)

    var queryf = {filename:req.body.fileName}
    const file = await files.findOne(queryf,{_id:1,"filename":1,"contentType":1}).limit(1);
    console.log("line 116 "+file)
    var query = {$pull:{project:{"fileInfo.fileName":req.body.fileName}}}
    //var index = User.aggregate([{"$project":{"matchedIndex":{"$indexOfArray":["$project._id",req.body.project]}}}])
    //console.log("line 120 index = "+index)

    var projectArray = await User.findOne({_id:req.user._id},{_id:0,"project":1})
    console.log("line 123"+ projectArray)
    var index;
    for(let i=0; i<projectArray.project.length; i++){
        var obj = projectArray.project[i];
        if(obj._id==req.body.project){
            console.log("index = "+i)
            index = i;
            break;
        }
    }
    const indexString = ["project.",index,".fileInfo.$.fileStyle"]
    var indexS = indexString.join('');
    console.log(indexS)


    var condition = {$and:[{_id:req.user._id},{"project.fileInfo.fileName":req.body.fileName}]}
    var testQuery = {$set:{[indexS]:req.body.position}}
    await User.updateOne(condition,testQuery,function (err, res){
        if(err){
            console.log(err)
        }
        User.close;
    })

/*
    var match = {$match:{"project.$._id":req.body.project}}
    var testQueryPlus = {$set:{"fileInfo.$.fileStyle":req.body.position}}
    User.aggregate([match,testQueryPlus])
*/

    res.redirect('back')
}

module.exports = {
    getCurrentUser,
    userUploadFile,
    userInfoUpdate,
    addNewProject,
    deleteProject,
    displayProject,
    editProjectFile,
    savePosition
};