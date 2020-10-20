const express = require("express");

const router = express.Router();
const guest = require("../middleware/guest");
const comModel=require('../schema/companySchema');
const company=comModel.find({});




/* GET home page. */
router.get('/',guest, function(req, res, next) {
  res.render('index');
});






// autocomplete search
router.get('/search/',function(req,res,next){
  var q=req.query.q;

comModel.find({

  name:{
    $regex:new RegExp(q)
  }
},{ 
_id:0,
__v:0


}, function(err,data){
res.json(data);

}

).limit(10);






  });
  
  
  module.exports = router;
  

