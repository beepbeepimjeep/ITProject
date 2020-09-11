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
require('./routes/authRouter');
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
app.use(express.static(path.join(__dirname, 'public')));


//storage
const storage = new GridFsStorage({
    url: 'mongodb+srv://zihengt:tangziheng@cluster0.htzok.mongodb.net/ITProject?retryWrites=true&w=majority',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'upload'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

const usertestRouter = require('./routes/usertestRouter')
const fileRouter = require('./routes/fileRouter')
app.use('/user',usertestRouter);
app.use('/fileInfo',fileRouter);


app.get('/', (req, res) => {
    res.render('visitor-mainpage');
});

app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/visitor-mainpage', (req, res) => {
    res.render('visitor-mainpage');
});

app.get('/user-mainpage', (req, res) => {
    res.render('user-mainpage');
});

app.get('/auth/google', (req, res) => {
});

app.get('/go_to_upload', (req, res) => {
    res.render('user-upload');
});

//search
const searchRouter = require('./routes/searchRouter')
app.use('/searchresult', searchRouter);

//@route POST
app.post('/upload', upload.single('file'),(req,res)=>{
    console.log('upload file');
    res.redirect('/go_to_upload')
});

//@ropute get
//@desc show all file info


app.listen(process.env.PORT||3000, () => {
    console.log('The library app is listening on port 3000!')
});

