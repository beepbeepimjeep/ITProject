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

require('./models/User');
require('./services/passport');
require('./models')
require('./models/index')
require('./models/file')


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

const usertestRouter = require('./routes/usertestRouter')
const fileRouter = require('./routes/fileRouter')
const inquiryRouter = require('./routes/inquiryRouter')
const userRouter = require('./routes/userRouter')

app.use('/user',usertestRouter);

app.use('/file',fileRouter);

app.get('/file/image/:filename', function (req,res,next){
    next();
},fileRouter)


app.use('/user-mainpage', userRouter);

app.post('/ajax/email',inquiryRouter);

require('./routes/authRouter')(app);

app.get('/', (req, res) => {
    res.render('visitor-mainpage');
});

app.get('/file/main/:id',fileRouter)

app.get('/visitor-mainpage', (req, res) => {
    res.render('visitor-mainpage');
});

/*app.get('/user-mainpage/:user_id', (req, res) => {
    var id = req.params.user_id;
    res.render('user-mainpage', {id: id});
});*/

app.get('/user-mainpage/:user_id', userRouter)

app.post('/user-mainpage/go_to_upload/:user_id', userRouter)

/*app.get('/go_to_upload', (req, res) => {
    res.render('user-upload');
});*/



//search
const searchRouter = require('./routes/searchRouter')
app.use('/searchresult', searchRouter);

//@route POST
/*app.post('/file/upload/:userid', upload.single('file'),(req,res)=>{
    console.log('upload file');
    res.redirect('/file/main');
});*/

app.post('/file/upload/:userid', upload.single('file'),(req,res)=>{
    console.log("upload");
    res.redirect(`/file/main/${req.params.userid}`)
});


app.post('/file/delete/:id',fileRouter)

app.listen(process.env.PORT||3000, () => {
    console.log('The library app is listening on port 3000!')
});

