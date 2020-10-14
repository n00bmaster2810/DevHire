const express = require("express");
const Company = require("../schema/companySchema");
const JobPost = require("../schema/jobPostSchema");
const jobPostRouter = express.Router();



jobPostRouter.post("/jobPost", async (req, res) => {
	  try {
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