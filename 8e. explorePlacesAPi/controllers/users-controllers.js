const Users = require("../models/users");
const { check, validationResult } = require('express-validator');

//create record in users table
const signup  = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

    Users.create(req.body)
    .then((result)=>{
        res.setHeader("content-type","text/json");
        res.statusCode = 200;
        res.json({user: result});
    })   
}

//fetch all records or based on id
const fetchall = (req,res,next)=>{
    if(req.params.id)
    {
        Users.findById(req.params.id)
        .then((result)=>{
            if(!result)
            {
                res.setHeader("content-type","text/json");
                res.statusCode = 200;
                res.json({status:true,msg:"No record found"});
                res.end();
            }else{
                res.setHeader("content-type","text/json");
                res.statusCode = 200;
                res.json({status:true,result: result});
            }
        }).catch((err)=>console.log(err));
    }else{
        Users.find()
        .then((result)=>{
            if(!result.length)
            {
                res.setHeader("content-type","text/json");
                res.statusCode = 200;
                res.json({status:true,msg:"No record found"});
            }
            res.setHeader("content-type","text/json");
            res.statusCode = 200;
            res.json({status:true,result: result});
        }).catch((err)=>console.log(err));
    }
}

//Remove all records| remove record by ID
const remove = (req,res,next)=>{
    if(req.params.id){
        Users.remove({"_id": req.params.id}).then((result)=>{
            if(result.ok)
            {
                res.setHeader('content-type',"text/json");
                res.status('200').json({status:true,msg:"Record has been deleted successfully"});
            }
        });
    }else
    {
        Users.remove()
        .then((result)=>{
            if(result.ok)
            {
                res.setHeader('content-type',"text/json");
                res.status('200').json({status:true,msg:"Records has been deleted successfully"});
            }
        });
    }
    
}

const fetchAllPlacesByUserId = (req,res,next)=>{
    Users.findById(req.params.userID)
    .then((result)=>{
        if(result == null)
        {
            err = new Error(`No record found`);
            err.status = 200;
            return next(err);
        }else{
            if(!result.places.length)
            {
                err = new Error(`No places found`);
                err.status = 404;
                return next(err);
            }

            res.setHeader("content-type","text/json");
            res.statusCode = 200;
            res.json({status:true,result: result.places});
        }
        
    }).catch((err)=>  next(err));
}

//FIND CORRECT RESPONSE
const fetchAllPlaces = (req,res,next)=>{
    console.log("test result");
    Users.find()
    .then((result)=>{
        console.log(result);
            result = result.map((users)=>users.places)
            console.log("test result");
            res.setHeader("content-type","text/json");
            res.statusCode = 200;
            res.json({status:true,result:result});
        
    }).catch((err)=>  next(err));
}
const all = (req,res,next)=>{
    console.log("test result");
    res.setHeader("content-type","text/json");
    res.statusCode = 200;
    res.json({status:true,result:"tests"});
}

const postPlaces = (req,res,next)=>{
    Users.findById(req.params.userID)
    .then((user)=>{
        if(user == null)
        {
            err = new Error(`No record found`);
            err.status = 200;
            return next(err);
        }else{
            user.places.push(req.body);
            user.save()
            .then((result)=>{
                res.setHeader("content-type","text/json");
                res.statusCode = 200;
                res.json({user: result});
            })
        }
        
    }).catch((err)=>  next(err));
}

const removeAllPlaces = (req,res,next)=>{
    console.log("place id"+req.params.placeID);
    Users.findById(req.params.userID)
    .then((user)=>{
        if(user == null)
        {
            err = new Error(`No record found`);
            err.status = 200;
            return next(err);
        }else{
            if(req.params.placeID){

                //check if place exits or not
                if(user.places.id(req.params.placeID) == null){
                    err = new Error(`No place found`);
                    err.status = 200;
                    return next(err);
                }

                const places = user.places.filter(function (pilot) {
                    return pilot._id != req.params.placeID;
                });

                user.places = places;
                user.save()
                .then((result)=>{
                    res.setHeader("content-type","text/json");
                    res.statusCode = 200;
                    res.json({user: result});
                })
            }
            else{
                user.places = [];
                user.save()
                .then((result)=>{
                    res.setHeader("content-type","text/json");
                    res.statusCode = 200;
                    res.json({user: result});
                })
            }
            
        }
        
    }).catch((err)=>  next(err));
}

exports.signup = signup;
exports.fetchall = fetchall;
exports.remove = remove;

//Places modules
exports.fetchAllPlacesByUserId = fetchAllPlacesByUserId;
exports.fetchAllPlaces = fetchAllPlaces;
exports.postPlaces = postPlaces;
exports.removeAllPlaces = removeAllPlaces;
exports.all = all;