const MongoClient = require('mongodb').MongoClient;
const assert  = require('assert');
const dboperations = require('./operations');

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url).then((client) => {
        console.log('Connected correctly to server');
        const db = client.db(dbname);
        dboperations.insertDocument(db, { name: "Vadonut", description:"Test"},"dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);
            return dboperations.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);
            return dboperations.updateDocument(db, { name:"Vadonut" },{ description: "Updated Test" }, "dishes");
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);
            return dboperations.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
        
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);
            return client.close();
        })
        .catch((err) => console.log(err));
   })
   .catch((err) => console.log(err));


