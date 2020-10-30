const express = require("express");
const Company = require("../schema/companySchema");
const JobPost = require("../schema/jobPostSchema");
const jobPostRouter = express.Router();
const Apply = require("../schema/applySchema");
const moment = require("moment");
const Update = require("../schema/updateSchema");

//Post route so as to store the jobPosts and save it inside postSchema subdocs in the Companies collection
jobPostRouter
  .post("/jobPost", async (req, res) => {
    try {
      console.log(req.file);
      const { jobOffer, description, tags, endDate } = req.body;

      //storing req body data in database
      const jobPost = new JobPost({
        jobOffer: jobOffer,
        description: description,
        tags: tags,
        endDate: endDate,
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
  // post route so as the to edit the particular post and then modify the companies collection
  .post("/editPost/:id", async (req, res) => {
    try {
      const comp = await Company.findOne({ email: req.user.email });
      let post, index;
      for (let i = 0; i < comp.posts.length; i++) {
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
        editPost.endDate = req.body.editEndDate;
        await comp.save();
        res.redirect("/companies");
      } else {
        return res.status(404).send();
      }
    } catch {
      return res.status(500).send();
    }
  })
  .get("/companies/deletePost/:id", async (req, res) => {
    try {
      const comp = await Company.findOne({ email: req.user.email });
      console.log(comp);
      if (comp) {
        await Company.findByIdAndUpdate(comp._id, {
          $pull: {
            posts: { _id: req.params.id },
          },
        });
        res.redirect("/companies");
      } else {
        return res.status(404).send();
      }
    } catch (err) {
      return res.status(500).send();
    }
  })
  .get("/companies/applications/:postId", async (req, res) => {
    try {
      const comp = await Company.findOne({ email: req.user.email });
      const post = await JobPost.findById(req.params.postId);
      let applyId = [];
      for (let i = 0; i < comp.posts.length; i++) {
        if (comp.posts[i]._id == req.params.postId) {
          applyId = comp.posts[i].applied;
          break;
        }
      }
      let applications = await Apply.find().where("_id").in(applyId);

      res.render("application", { applications: applications, post: post, moment: moment });
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post("/updatePost",async (req, res) => {
    try {
      const { title, description } = req.body;
      console.log(req.body);
      const comp = await Company.findOne({ email: req.user.email });
      const updateS = new Update({
        title: title,
        description: description
      });

      await updateS.save();
      comp.update.push(updateS);
      await comp.save();
      res.redirect("/companies");
    }
    catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = jobPostRouter;
