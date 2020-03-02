const express  = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('../connect');
const Router = express.Router();


Router.get("/",(req,res)=>{ 
    res.statusCode = 200;
    res.setHeader("type","text/plain")
    res.send('welcome to learn MYSQL');
})

Router.get("/user",(req,res)=>{ 
    mysqlConnection.query('Select * from user',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log("Error found"+err);
    })
})
module.exports = Router;
