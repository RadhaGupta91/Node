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
                {"name":"Redix","type":"key-value"},
                {"name":"Cassandra","type":"Wide-column"},
                {"name":"HBase","type":"Wide-column"},
                
    ];
    db.collection("dish").insertMany($record,(err,result)=>{
        console.log("Mulitple Records has been inserted successfuly");
    });

    //Insert a record
    db.collection("dish").insertOne({"name":"Neo4g","type":"graph"},(err,result)=>{
        const id  = result["ops"][0]["_id"];
        console.log("Record has been inserted successfuly");
        
        //print Record
        db.collection("dish").find().toArray((err,result)=>{
            console.log("List of records-before");
            console.log(result);
        })
        
        /*update Record
        _id : id to match
        type: to change data
        */
        db.collection("dish").update({"_id":new ObjectID(id)},{$set:{"type":"graph-store"}},
        (err,result)=>{
            if(err)
            {
                console.log("error");
            }

            console.log('Record has been updated successfully');
            
            //print Record
            db.collection("dish").find().toArray((err,result)=>{
                console.log("List of records");
                console.log(result);

                //Drop collection
                db.dropCollection("dish",(e,r)=>{
                    console.log("DB Dropped successfully");
                })
            })
        });
    });
});