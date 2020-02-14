const mongo = require('mongodb');

const url = "mongodb://localhost:27017/";
const dbName = "techDB";
var ObjectID = mongo.ObjectID;

MongoClient = mongo.MongoClient;

MongoClient.connect(url,(arr,client)=>{
    console.log('Server connected successfully');
    const db = client.db(dbName);
    console.log('Database connected successfully');

    //To insert mulitple Records
    $record  = [
                {name:"Redix",type:"key-value"},
                {name:"Cassandra",type:"Wide-column"},
                {name:"HBase",type:"Wide-column"},
                
    ];
    db.collection("dish").insertMany($record)
    .then(result=>{
        console.log("Mulitple Records has been inserted successfuly");
        return db.collection("dish").insertOne({name:"Neo4g",type:"graph"});
        
    })
    .then(result=>{
        const id  = result["ops"][0]["_id"];
        console.log("List of records-before");
        console.log(result.ops);
        
        /*update Record
        _id : id to match
        type: to change data
         */
        return db.collection("dish").update({_id:new ObjectID(id)},{$set:{type:"graph-store"}})
        
    }).then(result=>{
        console.log('Record has been updated successfully');
        //print result
        return db.collection("dish").find().toArray();
    }).then(result=>{
        console.log("List of records");
        console.log(result);
        //Delete multiple records
        db.collection('dish').deleteMany({type : "key-value"});
        return db.collection("dish").find().toArray();
    }).then(result=>{
        console.log('After Deletion');
        console.log(result);
        //Drop collection
        return db.dropCollection("dish");
    }).then(result=>{
        console.log("DB Dropped successfully");
    })
});