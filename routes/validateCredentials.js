var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const bcrypt = require('bcrypt');

/* GET home page. */
router.post('/', function(req, res, next) {
    doConnection(req, res);
});
var doConnection=async(req, res)=>{
    var resData={};
    var userData = req.body;
    try{
        await client.connect();
        var Collectionresult = await client.db("GoTrendz").collection("UserCredentials").find({accId:userData.accId}).toArray();
        if(Collectionresult.length==1){
            bcrypt.compare(userData.accPass,Collectionresult[0].accPass,function(err,result){
                if(result){
                    resData.msg = "Valid";
                    if(Collectionresult[0].isAdmin){
                        resData.isAdmin= true;
                    }else{
                        resData.isAdmin=false;
                    }
                    req.session.isUserLogged = true;
                }else{
                    resData.msg = "Invalid";
                }
                res.send(JSON.stringify(resData));  
            })
        }else{
            resData.msg = "Invalid";
            res.send(JSON.stringify(resData));
        }
    }finally{
        await client.close();
    }
};

module.exports = router;