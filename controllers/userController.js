const mongoose = require("mongoose");
const User = require("../models/User")
//const User = mongoose.model("users");
const files = require("../models/file")
//const files = mongoose.model("file")

const userUploadFile = async (req, res, next) => {
    try {
        const current_user = await req.user;
        const isLoggedIn = await req.login
        console.log(isLoggedIn)
        console.log(current_user)
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
        const userdescription = req.body.userdescription;
        const iconImage = req.body.iconImage;
        if(username != "") {
            current_user["userName"] = username;
        }
        if(useremail != ""){
            current_user["email"] = useremail;
        }
        if(userexpertise != ""){
            current_user["expertise"] = userexpertise;
        }
        if(userdescription != ""){
                    current_user["description"] = userdescription;
                }
        if(iconImage!=""){
            current_user["iconImage"] = iconImage;
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
    var query = {$push:{project:{"projectName":newProjName,"projectDesc":newProjDesc,"projectTheme":1}}}
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
        const isLoggedIn = await req.login
        res.render('userProject',{user:currentUser,projectId:req.params.projectId, isUser: isLoggedIn})
    }catch (e){

    }
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

function indexOfProject(projects,projectId){
    var index;
    try{
        for(let i=0; i<projects.project.length; i++){
            var obj = projects.project[i];
            if(obj._id==projectId){
                console.log("index = "+i)
                index = i;
                return index;
            }
        }
    }catch (e){
        throw e;
    }
    return index;
}

function positionOfProject(project,fileName,index){
    var position;
    for(let i=0; i<project.project[index].fileInfo.length;i++){
        var obj = project.project[index].fileInfo[i];
        if(obj.fileName==fileName){
            console.log("position in project.file array is :"+i)
            position=i;
            return position;
        }
    }
}

const savePosition = async (req,res,next)=>{
    console.log("filename is "+req.body.fileName)
    console.log("position is "+req.body.position)

    var queryf = {filename:req.body.fileName}
    const file = await files.findOne(queryf,{_id:1,"filename":1,"contentType":1}).limit(1);
    console.log("line 116 "+file)
    var projectArray = await User.findOne({_id:req.user._id},{_id:0,"project":1})
    console.log("projectArray :"+ projectArray)
    var index = indexOfProject(projectArray,req.body.project);
    console.log("line 137 index : "+index)
    var position = positionOfProject(projectArray,req.body.fileName, index);


    const indexString = ["project.",index,".fileInfo.",position,".fileStyle"]
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

    res.redirect('back')
}

const changeTheme = async (req, res, next) => {
    try {
    var condition = {$and:[{_id: req.user._id},{"project._id": req.params.projectId}]}
    var query = {$set:{"project.$.projectTheme":req.body.theme}}
    await User.findOneAndUpdate (condition, query, function ( err, res ) {
    if (err) throw err;
            console.log("Theme changed")
            User.close;
    })
    } catch (err){
        res.status(400);
        return res.send("Cannot change theme!")
    }
        res.redirect("back")

};

const createNewTextBox = async (req, res) => {
    try {
        console.log(req.body.background);
        var text_top = req.body.top;
        var text_left = req.body.left;
        var text_text = req.body.text;
        var text_width = req.body.width;
        var text_background = req.body.background;
        var text_border = req.body.border;
        var text_height = req.body.height;
        var condition = {$and:[{_id: req.user._id},{"project._id": req.params.projectId}]}
        var query = {$addToSet:{ "project.$.textboxs":{
        "top": text_top,
        "left": text_left,
        "text": text_text,
        "width": text_width,
        "background": text_background,
        "border": text_border,
        "height": text_height}}}
    await User.findOneAndUpdate (condition, query, function ( err, res ) {
    if (err) throw err;
    User.close;
    })
    } catch (err){
        res.status(400);
        return res.send("Cannot add new textbox")
    }
    res.redirect("back")
};

const editProject = async (req, res) => {
    try {
            const current_user = await req.user;
            const current_projectId = await req.params.projectId
            const isLoggedIn = await req.login
            res.render('user-editproject', {user: current_user, projectId:current_projectId, isUser: isLoggedIn})

    /*try {
        const current_project = await project.findById({_id: req.params.projectId});
        res.render('user-editproject', {project: current_project})*/
    } catch (err){
        res.status(400);
        return res.send("Database query failed")
    }
};

const createNewComment = async (req, res) => {
    try {
    var condition = {$and:[{_id: req.user._id},{"project._id": req.params.projectId}]}
    var query = {$addToSet:{ "project.$.comments":{
            "comment": req.body.comment,
            "visitorName": req.body.visitorName
            }}}
    console.log(query +"line236 see this query")
    console.log(req.body.visitorName, req.body.comment)
    await User.findOneAndUpdate (condition, query, function ( err, res ) {
    if (err) throw err;
    User.close;
    })
    } catch (err){
        res.status(400);
        return res.send("Cannot add new comment")
    }
    res.redirect("back")
};

const deleteComment = async (req,res,next)=> {
    try {
    var condition = {$and:[{_id: req.user._id},{"project._id": req.params.projectId}]}
    var query = { $pull: {"project.$.comments":{_id:req.params.commentId}}}
    await User.updateOne(condition,query,function(err,res){
        if (err) throw err;
        console.log("comment deleted");
        User.close;
    })
    } catch (err){
            res.status(400);
            return res.send("Fail to delete this comment")
        }
    res.redirect("back")
};

const deleteProjectFile = async (req,res,next)=>{
    console.log("line 255 : "+ req.body.fileName);
    var projectArray = await User.findOne({_id:req.user._id},{_id:0,"project":1})
    var index = indexOfProject(projectArray,req.body.projectId);
    var position = positionOfProject(projectArray,req.body.fileName,index);

    const indexString = ["project.",index,".fileInfo.",position]
    var indexS = indexString.join('');
    console.log(indexS)
    const indexString1 = ["project.",index,".fileInfo"]
    var indexS1 = indexString1.join('')
    console.log(indexS1)
    await User.findOneAndUpdate({_id:req.user._id},{$unset:{[indexS]:1}})
    await User.findOneAndUpdate({_id:req.user._id},{$pull:{[indexS1]:null}})
    res.redirect("back")
}



module.exports = {
    userUploadFile,
    userInfoUpdate,
    addNewProject,
    deleteProject,
    displayProject,
    editProjectFile,
    savePosition,
    changeTheme,
    editProject,
    createNewTextBox,
    createNewComment,
    deleteProjectFile,
    deleteComment,
    indexOfProject,
    positionOfProject
};