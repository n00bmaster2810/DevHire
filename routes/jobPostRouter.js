const express = require("express");
const bcrypt = require("bcrypt");
const JobPost = require("../schema/jobPostSchema");
const jobPostRouter = express.Router();



jobPostRouter.post("/jobPost", async (req, res) => {
	
  const { jobOffer, description, tags} = req.body;

  //validate request
  if (!jobOffer || !description || !tags ) {
    req.flash("error", "All fields are mandatory");
    return res.redirect("/companies");
  }
	
  //storing req body data in database
  const jobPost = new JobPost({
    jobOffer: jobOffer,
    description: description,
    tags: tags,
  });

  try {
    await jobPost.save();
    res.redirect("/companies");
  } catch (err) {
    res.status(500).send(err);
  }
  console.log(req.body);
});

module.exports = jobPostRouter;