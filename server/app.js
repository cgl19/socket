var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const db=require('./config/db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');  
var authRouter = require('./routes/auth');
var chatRouter = require('./routes/chat');

var app = express();
//Multer configuration 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });
app.use(upload.any())

// multer configuration ended 

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3001'
}));

const authenticationtoken=require('./middleware/authenticationtoken')

app.use('/test',authenticationtoken, function(req,res){
    console.log(req)
    res.status(200).json({msg:"hello"})
})
app.use('/', indexRouter);      
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

 

module.exports = app;
