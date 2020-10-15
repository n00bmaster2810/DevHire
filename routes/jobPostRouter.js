const express = require("express");
const Company = require("../schema/companySchema");
const JobPost = require("../schema/jobPostSchema");
const jobPostRouter = express.Router();
const multer = require("multer");


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

jobPostRouter.post("/jobPost",upload.single("postPic"),  async (req, res) => {
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
      const comp = await Company.findOne({ email: req.user.email });
      if (comp) {
        comp.posts.push(jobPost);
        await comp.save();
        res.redirect("/companies");
      }
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = jobPostRouter;