const express = require('express');
const path = require('path');
const port = 8000;

const app = express();  // now this app has all the functionality of the library express that has been required

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// insted of multiple switch cases
app.get('/', function(req,res){
    //console.log(req);
    //console.log(__dirname)
    //insted of res.end -> res.send
    // res.send('<h1>Cool , it is running! or is it? </h1>'); //it automatically detect html (when <h1> tag is used) 
    //                            //--> these are the basic things where framworks are good at handling dependencies
     
    return res.render('home', {title: "I am flying"});
});

app.get('/practice',function(req,res){
    res.render('practice',{title: "Lets us play with EJS"});
});

app.get('/kuchV', function(req,res){
    res.render('kuchvkaroyaar',{title: "chandu ke chacha"});
});

app.get('/ulala',function(req,res){
    res.render('phhuljahdi',{title: "ghhodta kya hai be ? "});
});

app.get('/dabbang',function(req,res){
    res.render('Dabbang1', {song: "Munni Badnam hui darling tere liye", title: "chulbul Pandey"});
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup! My express server is runnig on port:', port);
    
});

//initially in case of http , while searching localhost:8000 the page keeps loading
//express resolve this bug and it resopont with 

// ||     cannot get/     ||
