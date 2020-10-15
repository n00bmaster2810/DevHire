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
router.get('/autocomplete/',function(req,res,next){
  var regex=new RegExp(req.query["term",'i']);
  
  var companyFilter=comModel.find({name:regex},{'name':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
  companyFilter.exec(function(err,data){
  
    var result=[];
    if(!err){
      if(data && data.length && data.length >0){
  
        data.forEach(user => {
          let obj={
            id:user._id,
            label:user.name
  
          };
          result.push(obj);
        });
  
  
      }
      console.log(result);
      res.jsonp(result);
    }
  
  });
  
  });
  
  
  module.exports = router;
  
