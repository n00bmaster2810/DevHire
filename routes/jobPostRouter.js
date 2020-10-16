
const express = require("express");
const Company = require("../schema/companySchema");
const JobPost = require("../schema/jobPostSchema");
const jobPostRouter = express.Router();
const multer = require("multer");
// const morgan=require('morgan');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file === null) {
    cb(null, true);
  }
  else if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    req.flash("error", "Only JPEG and PNG file is allowed");
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

jobPostRouter.post("/jobPost", upload.single("postPic"), async (req, res) => {
  try {
    console.log(req.file);
    const { jobOffer, description, tags } = req.body;

    //validate request
    if (!jobOffer || !description || !tags) {
      req.flash("error", "All fields are mandatory");
      return res.redirect("/companies");
    }

    //storing req body data in database
    const jobPost = new JobPost({
      jobOffer: jobOffer,
      description: description,
      tags: tags,
      pic: req.file.filename,
    });
    await jobPost.save();
    const comp = await Company.findOne({ email: req.user.email });
    if (comp) {
      comp.posts.push(jobPost);
      await comp.save();
      res.redirect("/companies");
    }
  } catch (err) {
    res.status(500).send(err);
  }
})
  .post("/editPost/:id", upload.single("editPostPic"), async (req, res) => {
    try {
      const comp = await Company.findOne({ email: req.user.email });
      let post, index;
      for (let i = 0; i < comp.posts.length; i++){
        if (comp.posts[i]._id == req.params.id) {
          post = comp.posts[i];
          index = i;
          break;
        }
      }
      if (post) {
        let editPost = comp.posts[index];
        editPost.jobOffer = req.body.editJobOffer;
        editPost.description = req.body.editDescription;
        editPost.tags = req.body.editTags;
        editPost.pic = req.file.filename;
        await comp.save();
        res.redirect("/companies");
      }
      else {
        return res.status(404).send();
      }
    }
    catch {
      return res.status(500).send();
    }
  });


// deleting a post
  jobPostRouter.delete('/article/:id',function(req,res){
let query={ _id:req.params.id  }

jobPost.remove(query,function(err){
  if(err){
    console.log(err);
  }
  res.send('Success');
});
  });








 


module.exports = jobPostRouter;