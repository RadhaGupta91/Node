const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    address:{
        type:String,
    },
});

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        min:4,
        required:true
    },
    phone:{
        type:String,
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    places:[placeSchema]
})

var users = mongoose.model('user',userSchema);
module.exports = users;