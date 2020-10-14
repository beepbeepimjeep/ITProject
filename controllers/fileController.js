const mongoose  = require("mongoose");

const files = mongoose.model("file")
const user = mongoose.model("users")

require('dotenv').config()
const Grid = require('gridfs-stream')
// Connect to MongoDB --- Replace this with your Connection String
CONNECTION_STRING = "mongodb+srv://zihengt:<password>@cluster0.htzok.mongodb.net/ITProject?retryWrites=true&w=majority";
MONGO_URL =
    CONNECTION_STRING.replace("<password>",process.env.MONGO_PASSWORD);
mongoose.connect(MONGO_URL || "mongodb://localhost/itproject", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "ITProject"
});
const db = mongoose.connection;
db.on("error", err => {
    console.error(err);
    process.exit(1);
});
let gfs;
db.once("open", async () => {
    gfs = Grid(db.db,mongoose.mongo);
    gfs.collection('upload');
});


const displayImage = (req,res)=>{
    files.findOne({filename: req.params.filename},(err,file)=>{
        if(!file||file.length==0){
            return res.status(404).json({
                err: 'No File Exist'
            })
        }
        if(file.contentType == 'image/jpeg'||file.contentType == 'img/png'){
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res)
        }else{
            return res.json({
                err: 'No File Exist'
            })
        }
    })
}

const displayAll = async (req,res,next)=>{
    console.log("line 50 "+ req.user._id)
    try{
        const User = await user.findById({_id:req.user._id})
        console.log("line 53 length "+User.fileInfo.length)
        res.render('main',{user:User})
    }catch (e) {

    }

}

const deleteOne = (req,res,next)=>{
    var condition = {$and:[{_id:req.user._id}, {"fileInfo.fileId":req.params.fileid}]}
    var query = { $pull: {fileInfo:{fileId:req.params.fileid}}}
    user.updateOne(condition,query,function(err,res){
        if (err) throw err;
        console.log("file deleted");
        user.close;
    })
    gfs.remove({_id: req.params.fileid, root: 'upload'},(err)=>{
        if(err){
            return res.status(404).json({error: err})
        }
        res.redirect('/file/main');
    })
}

const uploadFile = (req,res,next)=>{
    var userid = req.user._id;
    res.redirect('/file/main')
}

const editFileDesc = (req,res,next)=>{
    var condition = {$and:[{_id:req.user._id}, {"fileInfo.fileId":req.query.fileId}]}
    var query = {$set:{"fileInfo.$.fileDesc":req.query.fileDesc}}
    user.updateOne(condition, query, function (err, res){
        if (err) throw err;
        console.log("file desc updated to "+res)
        user.close
    })
    res.redirect("back")
}
module.exports = {
    displayImage,
    displayAll,
    deleteOne,
    uploadFile,
    editFileDesc
}

