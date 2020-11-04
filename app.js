require('./models/User');
require('./services/passport');
require('./models')
require('./models/index')
require('./models/file')
const express = require('express');
const path = require('path');
const crypto = require ('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
const formidable = require('formidable')

const requireLogin = require('./middleware/requireLogin');



const user = mongoose.model('users')
const files = mongoose.model("file")

const app = express();


//middle
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

// body parser middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
// end parser middleware


// custom middleware to log data access
const log = function (request, response, next) {
    console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
    console.log(request.body); // make sure JSON middleware is loaded before this line
    next();
}
app.use(log);
// end custom middleware



//storage
const storage = new GridFsStorage({
    url: 'mongodb+srv://zihengt:tangziheng@cluster0.htzok.mongodb.net/ITProject?retryWrites=true&w=majority',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: file.originalname,
                userid: 123,
                bucketName: 'upload'
            };
            resolve(fileInfo);
            /*crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'upload'
                };
                resolve(fileInfo);
            });*/
        });
    }
});
const upload = multer({ storage });

const fileRouter = require('./routes/fileRouter')
const inquiryRouter = require('./routes/inquiryRouter')
const userRouter = require('./routes/userRouter')
const visitorRouter = require('./routes/visitorRouter')


app.use('/file',fileRouter);

app.get('/file/image/:filename', function (req,res,next){
    next();
},fileRouter)


app.post('/ajax/email/:user_id',inquiryRouter);

require('./routes/authRouter')(app);

app.get('/', (req, res) => {
    res.render('visitor-mainpage');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/file/main',fileRouter)

app.get('/visitor-mainpage', (req, res) => {
    res.render('visitor-mainpage');
});



//user
app.get('/user-eportfolio', userRouter)
app.use('/user-eportfolio', userRouter);
app.post('/user-eportfolio/user-project/editTheme/:projectId', userRouter);

app.get('/user-eportfolio/user-project/edit-project/:projectId', userRouter);
app.post('/user-eportfolio/user-project/edit-project/:projectId', userRouter);

app.post('/user-eportfolio/user-project/addComment/:projectId', userRouter);
app.post('/user-eportfolio/user-project/:projectId/deleteComment/:commentId', userRouter);
app.post('/user-eportfolio/user-project/edit-project/:projectId/delete-tb/:textboxId', userRouter);

app.get('/user-eportfolio/addNewProject', userRouter);

//visitor
app.use('/eportfolio', visitorRouter);
app.get('/eportfolio/:user_id/project/:project_id', visitorRouter)

//check url
//app.post('/user-mainpage/go_to_upload/:user_id', userRouter)

//search
const searchRouter = require('./routes/searchRouter')
app.use('/searchresult', searchRouter);

//@route POST
/*app.post('/file/upload/:userid', upload.single('file'),(req,res)=>{
    console.log('upload file');
    res.redirect('/file/main');
});*/

app.post('/file/upload', upload.single('file'), requireLogin, async (req,res, next)=>{
    console.log("userid = " + req.user._id)
    console.log("filename = " + req.file.filename)
    var ObjectId = require('mongodb').ObjectID;
    try{
        const fileId = await files.findOne({filename:req.file.filename},(err,file)=>{
            if(!file||file.length==0){
                return res.status(404).json({
                    err: 'No File Exist'
                })
            }else{
                const bindFile = user.findOneAndUpdate({_id: ObjectId(req.user._id)},{$push:{fileInfo: {"fileId":file._id,"fileName":file.filename,"fileType":file.contentType,"fileDesc": "none"}}},(err,user)=>{
                    console.log(user.fileInfo[0])
                });
                console.log("line 161")
            }
        })

    }
    catch (e) {
        console.error(e)
    }

    res.redirect('/file/main')
});
/*app.post('/file/upload/:userid',postData);
function postData (req, res){
    upload.single('file');
    var fileName = req.file.filename;
}*/

app.post('/file/delete/:fileid/:userid',fileRouter)
app.get('/user-eportfolio/:projectId/deleteProject',userRouter)
app.get('file/edit/:userid',fileRouter)
app.get('/user-eportfolio/userProject/:projectId',userRouter)
app.post('/user-eportfolio/addFiletoProject',userRouter)
app.post('/user-eportfolio/savePosition',userRouter)
app.post('/user-eportfolio/deleteProjectFile',userRouter)
app.listen(process.env.PORT||3000, () => {
    console.log('The library app is listening on port 3000!')
});

module.exports = app