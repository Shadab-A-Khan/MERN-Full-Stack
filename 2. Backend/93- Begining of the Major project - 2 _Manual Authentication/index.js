const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

//app.use(express.urlencoded());
//middle ware to the form post data 
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.use(bodyParser.json());
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});


























// const express = require('express');
// const cookieParser = require('cookie-parser')
// const expressLayout=require('express-ejs-layouts');
// const db=require('./config/mongoose');
// const bodyParser = require('body-parser');


// const app = express();

// //middle ware to the form post data 
// app.use(bodyParser.urlencoded({extended:false}));

// app.use(express.static('./assets'));

// app.use(expressLayout);

// app.use(bodyParser.json());
// //use express router
// app.use('/', require('./routes'));



// //middleware to use the cookieParser
// app.use(cookieParser());


// //extract styles and script from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);




// app.set('view engine','ejs');
// app.set('views','./views');
// const port=8000;
// app.listen(port,function(err){
//     if(err){
//         console.log(`error in running the server: ${err}`);
//     }
//     console.log(`server is runnig on port: ${port}`);
// });