const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/";

const connect  = mongoose.connect(url);

connect.then((db)=>{
    console.log('Server connected successfully');
    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
        });
    newDish.save()
    .then(dish=>{
        console.log("response");
        console.log(dish);
        return Dishes.find({});
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