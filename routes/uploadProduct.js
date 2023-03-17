const { json } = require('express');
var express = require('express');
var router = express.Router();
var { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

router.post('/',function(req, res, next){
    doConnection(req, res);
});
var doConnection=async(req, res)=>{
    var newProduct = req.body;
    try{
        await client.connect();
        await client.db("GoTrendz").collection("Products").insertOne(newProduct);
        res.send(JSON.stringify({msg:"Success"}))
    }finally{
        await client.close();
    }
}
module.exports = router;