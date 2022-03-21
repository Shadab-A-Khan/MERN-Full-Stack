




const express=require('express');
const path=require('path'); // path is inbuit so we dont need to do   npm install path
const port = 8000;  //server runs on a port

const app=express(); //now this app has access to all the express libraries, which are need to run a server

app.set('view engine', 'ejs'); //we have created a property   --view engine--   and given value   --ejs--
app.set('views',path.join(__dirname,'views')); //the make the name of the directory/file dynamic, means they dont need to gie the file name each time
app.use(express.urlencoded()); //it reads the form data and parsed it into keys and values
app.use(express.static('assets'));

// middleware1                          //middleware store the req in to the body and then pass iott into the controler
                                        //middle ware is also used to manupulate/change the request or response data
app.use(function(req, res, next){      // next passed the change whatever has been made and calls the next middleware
    console.log('middleware 1 called');//if there is no other middle ware it goes to the controler
    next(); 
});                                
                                   
// middleware2   

app.use(function(req,res,next){
    console.log('middleware 2 called');
    next();
});

var contactList = [  //creating object with key value pairs
    {
        name: "Shadab",
        phone: "123456"
    },
    {
        name: "iron man",
        phone:"2357889"
    },
    {
        name: "coding ninjas",
        phone:"8538643"
    }
]
//view and templets are the same thing

app.get('/', function(req,res){
    // console.log(__dirname);
    // res.send('<h1>cool, it is runnig! , or is it ? </h1>');
    return res.render('home',                                   //https://www.geeksforgeeks.org/express-js-res-render-function/
    {
        title: "I am flying",
         contact_list: contactList
    });
});

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: "Lets us play with ejs"
    });
});


app.post('/create-contact', function(req,res){
    //the req was stored into req.body and then it is pushed into the contact list
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    contactList.push(req.body);
    return res.redirect('back');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('/practice')          //redirect : it redirect to any perticular url
});


//to delete we will use a keyword called   splice

//  /delete-contact/10 is a id to be deleted that is a param

//  /delete-contact/?id=10 
                  //or
//  /delete-contact/?phone=10    this a called query or query param

//in query param you can add or chain as many you want  


// app.get('/delete-contact/:phone', function(req,res){ //  '/delete-contact',   is a url or a route to a page
//     console.log(req.params);
//     let phone = req.params.phone;
// });
// //   app.use(express.urlencoded()); line 9 , this is used to read the form the data only not the paramms
                   
                    //   |
                    //   |
                    //   |
                    //   V
            //now for the query part

    app.get('/delete-contact', function(req,res){ //  '/delete-contact',   is a url or a route to a page
        //get the query from the url
        console.log(req.query);
            let phone = req.query.phone;

            let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex, 1);

    }

    return res.redirect('back');

    });

    
                    





app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup!My Express server is running on port: ' , port);
    
});









