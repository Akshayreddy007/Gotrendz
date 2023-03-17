var express = require("express");
var router = express.Router();
const {MongoClient} = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/",function(req, res, next){
    var userData = req.body;
    encryptPassword(userData, res)
})

var encryptPassword=(userData,res)=>{
    bcrypt.hash(userData.accPass,saltRounds,function(err,hash){
        userData.accPass = hash;
        doConnection(userData,res);
    });
};
var doConnection= async (userData, res)=>{
    var resData = {};
    try{
        await client.connect();
        await client.db("GoTrendz").collection("UserCredentials").insertOne(userData);
        resData.msg = "success";
    }finally{
        await client.close();
    }
    res.send(JSON.stringify(resData));
}

module.exports = router;