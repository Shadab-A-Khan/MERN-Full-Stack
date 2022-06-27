//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost:27017/contact_list_dbb');

//acquire connection
const db=mongoose.connection;

//error handling
db.on('error',console.error.bind(console,'error connecting mongodb'));

//up and running
db.once('open', function(){
    console.log('sucessfully connected');
});
