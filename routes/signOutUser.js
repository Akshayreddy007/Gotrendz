var express = require('express');
var router = express.Router();

router.post('/',function(req, res, next){
    req.session.isUserLogged = false;
    res.send(JSON.stringify({msg:"success"}));
});

module.exports = router;