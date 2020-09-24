const mongoose  = require("mongoose");

const files = mongoose.model("file")


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

const displayAll = (req,res)=>{
    gfs.files.find().toArray((err, files)=>{
        if(!files||files.length==0){
            res.render('main',{files: false});
        }else{
            files.map(file=>{
                if(file.contentType == 'image/jpeg'||file.contentType == 'image/png'){
                    file.isImage=true;
                }else{
                    file.isImage=false;
                }
            })
            res.render('main',{files:files})
        }
    })
}

const deleteOne = (req,res)=>{
    gfs.remove({_id: req.params.id, root: 'upload'},(err)=>{
        if(err){
            return res.status(404).json({error: err})
        }
        res.redirect('/file/main')
    })
}
module.exports = {
    displayImage,
    displayAll,
    deleteOne

}

