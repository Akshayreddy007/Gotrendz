var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null,'./public/images/productImages');
    },
    filename:function(req, file, callback){
        file_name = "image"+"_"+Date.now()+path.extname(file.originalname);
        callback(null,file_name);
    }
})
var upload = multer({storage:storage}).single('InsertImage');

router.post('/',function(req, res, next){
    var data={};
    upload(req, res, function(err){
        if(err){
            data.msg="error";
        }else{
            data.file_path = "/images/productImages/"+ file_name;
        }
        res.send(JSON.stringify(data));
    })
});

module.exports = router;