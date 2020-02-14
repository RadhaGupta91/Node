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
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:"updated test"}},{new:true}).exec();

    })
    .then(dish=>{
        console.log("List");
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        })
        return dish.save();
    }).then((dish) => {
        console.log(dish);
        return Dishes.remove({});
        })
    .then(()=>{
        console.log("Table removed");
        console.log("Going to close connection");
        return mongoose.connection.close();
    }).catch((err)=>{
        console.log(err);
    });

})