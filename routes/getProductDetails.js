var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

var productData = {"productDetails":[]};

router.post('/',function(req, res, next){
    if(req.session.isUserLogged){
        doConnection(req, res);    
    }else{
        res.send(JSON.stringify({msg: "User not logged in", userInfo:"Invalid User"}));
    }
})

var doConnection = async (req, res)=>{
    try{
        await client.connect();
        var result = await client.db("GoTrendz").collection("Products").find({}).toArray();
        productData.productDetails = result;
        res.send(JSON.stringify(productData))
    }finally{
        client.close();
    }
}

module.exports = router;