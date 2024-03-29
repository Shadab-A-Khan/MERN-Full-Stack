const express = require('express');
const env = require('./config/environment');                          //development-------
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
//passport-authentication
//used for session cookie
const session = require('express-session'); //encprypts the id
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const { where } = require('./models/user');
const flash = require('connect-flash')
const app = express();
require('./config/view-helpers')(app);                                  //development-------
const customMware = require('./config/middleware');
const path = require('path');                                           //development-------

//setup the char server to beused with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');



// // sass/scss middleware for making css (styling easy)
// app.use(sassMiddleware({
//     src: './assets/scss',   //from where the scss will be picked to be converted to css
//     dest: './assets/css', //from where the css to be picked
//     debug: 'true',  //to show the err while unable to convert to css
//     outputStyle: 'extended', //we want it to be in multiple line and understandable
//     prefix: '/css'
// }));

//   |
//   |
//   |development
//   |                                                 //development-------
//   V


// // sass/scss middleware for making css (styling easy)
// app.use(sassMiddleware({
//     src: path.join(__dirname, env.asset_path, 'scss'),
//     dest: path.join(__dirname, env.asset_path, 'css'),
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

//   |
//   |
//   V

if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}





//middle ware to the form post data 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(env.asset_path));                                       //development-------

app.use(expressLayout);

app.use(bodyParser.json());




//middleware to use the cookieParser
app.use(cookieParser());

//make the uploads file available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));  //connetct the current path with the uploads

app.use(logger(env.morgan.mode, env.morgan.options));


//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.set('view engine', 'ejs');
app.set('views', './views');

//passport
//session ,here we are encrypting the id

// app.use(session({
//     name: 'codeial',
//     // TODO change the secret before deployment in production mode
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: new MongoStore(
//         {
//             mongooseConnection: db,
//             autoRemove: 'disabled'

//         },
//         function(err){
//             console.log(err ||  'connect-mongodb setup ok');
//         }
//     )
// }));


app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'
    })
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash()); //we have to use it after the session , becz it uses session cookies
app.use(customMware.setFlash);
//use express router
app.use('/', require('./routes'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, function (err) {
    if (err) {
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is runnig on port: ${PORT}`);
});

// const port = 8000;
// app.listen(port, function (err) {
//     if (err) {
//         console.log(`error in running the server: ${err}`);
//     }
//     console.log(`server is runnig on port: ${port}`);
// });

