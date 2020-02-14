const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/";

const connect  = mongoose.connect(url);

connect.then((db)=>{
    console.log('Server connected successfully');
    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then(dish=>{
        console.log("response");
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then(dishes=>{
        console.log("List");
        console.log(dishes);
        return Dishes.remove({});
    }).then(()=>{
        console.log("Table removed");
        console.log("Going to close connection");
        return mongoose.connection.close();
    }).catch((err)=>{
        console.log(err);
    });

})