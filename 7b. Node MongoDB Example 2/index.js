const MongoClient = require('mongodb').MongoClient;
const assert  = require('assert');
const dboperations = require('./operations');

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null);
    console.log("Connected successfuly to server");

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    
    dboperations.insertDocument(db, { name: "Vadonut", description:"Test"}, "dishes", (result) => {

        console.log("Insert Document:\n", result.ops);
        dboperations.findDocuments(db, "dishes", (docs) => {

            console.log("Found Documents:\n", docs);
            dboperations.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes",(result) => {
                
                console.log("Updated Document:\n",result.result);
                dboperations.findDocuments(db, "dishes",(docs) => {
                    
                    console.log("Found Updated Documents:\n", docs);
                    db.dropCollection("dishes", (result)=> {
                        
                        console.log("Dropped Collection:", result);
                        client.close();
                    });
                });
            });
        });
     });
})


