const express = require('express');
const path = require('path');
const bodyPraser = require('body-parser');
const port = 8000;

const app = express(); 

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyPraser.urlencoded({extended:false}));



//middleware
//assessing middleware
//used for styling and adding functionality (i.e., css , javascript , fonts and images)
app.use(express.static('assets'));


// //middleware 1

// app.use(function(req,res,next){
//     //console.log('middleware 1 is called');
//     req.myName="shadab";
//     next();
// });

// //middleware 2

// app.use(function(req,res,next){
//     console.log('my name is from middleware 1 ',req.myName)
//     //console.log('middleware 2 is callled');
//     next();
// });

var contact_list = [
    {
        name:" Shadab",
        phone: "198888"

    },
    
    {
        name:" sonu",
        phone: "198888"

    },
    {
        name:" monu",
        phone: "198888"

    }
  
];

app.get('/', function(req,res){
   
    return res.render('home', 
          {
            title: "I am flying",
            contactList: contact_list
          }
    );
});

app.get('/practice',function(req,res){
    res.render('practice',{title: "Lets us play with EJS"});
});

app.post('/create-contact',function(req,res){

//    contact_list.push({
//           name: req.body.name,
//          phone: req.body.phone
//    });

      //or     --body of the parser or middleware has both name and phone

   contact_list.push(req.body);


   //return res.redirect('/');
         //or
   return res.redirect('back');


});

// //params
// app.get('/delete-contact/:phone' ,function(req,res){
//     console.log(req.params);
//     let phone=req.params.phone;
// });


//query params
app.get('/delete-contact/' ,function(req,res){
    console.log(req.query);
    let phone=req.query.phone;
    let contactIndex = contact_list.findIndex(contact=> contact.phone == phone);

    // if found delete
    if(contactIndex != -1){
        contact_list.splice(contactIndex,1);
    }
    return res.redirect('back');
});





app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup! My express server is runnig on port:', port);
    
});