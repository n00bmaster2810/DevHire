const express = require("express");
const Portfolio = require("../schema/myPortfolioSchema");
const myPortfolioRouter = express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')

  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+DataCue.now())
  }
});
const upload=multer({ storage:storage});
const imgModal=require('./model');
registerRouter.post("/myPortfolio".upload.single('image'), async (req, res,next) => {
	
    const { firstName, lastName, email, linkedIn,school,institution,resumeLink,CPI,img} = req.body;
  
    //validate request
    if (!firstName || !lastName || !email || !linkedIn||!school||!intitution||!resumeLink||!CPI) {
      return res.redirect("/");
    }
    
    const mpPortfolio = new Portfolio({
        firstName: firstName,
        lastName: lastName,
        email: email,
        linkedIn: linkedIn,
        school:school,
        institution: institution,
        resumeLink:resumeLink,
        CPI:CPI,
        img:{
data:firstName.readFileSync(path.join(__dirname+'/uploads'+req.file.filename)),
contentType:'image/png'

        }
      },
      imgModel.create(obj,(err,item)=>{
          if(err) console.log(err);
          else res.redirect('/');
      
      })
      );
    
      console.log(req.body);
    });
    
    module.exports = registerRouter;