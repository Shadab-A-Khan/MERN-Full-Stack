const express = require('express');
const cookieParser = require('cookie-parser')
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const bodyParser = require('body-parser'); 
//passport-authentication
//used for session cookie
const session = require('express-session'); //encprypts the id
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const app = express();

//middle ware to the form post data 
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./assets'));

app.use(expressLayout);

app.use(bodyParser.json());




//middleware to use the cookieParser
app.use(cookieParser());


//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.set('view engine','ejs');
app.set('views','./views');

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
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // using mongo store to store the session into the monogodb so that , we dont get logged out each time server restart
    store:MongoStore.create({
        mongoUrl:db._connectionString,
        autoRemove: 'disabled'
      })
}));



app.use(passport.initialize()); //we tell the app to use passport
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
//use express router
app.use('/', require('./routes'));

const port=8000;
app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is runnig on port: ${port}`);
});
