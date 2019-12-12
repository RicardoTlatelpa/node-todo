var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    googleID: String,
    username: String
})

mongoose.model('users', userSchema);//setting up instance for mongo
//2 arguments
