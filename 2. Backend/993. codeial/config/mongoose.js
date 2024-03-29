// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/codeial_development');

    //development---------------

const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('err', console.error.bind(console, 'Eroor in connecting with the monogodb'));
db.once('open', function () {
   console.log('connected to the databse  :: MongoDB');
});

module.exports = db;