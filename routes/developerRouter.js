const express = require("express");
const developerRouter = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");
const Developer = require("../schema/developerSchema");
const Apply = require("../schema/applySchema");
const moment = require("moment");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET developers page. */
developerRouter
  .get("/developers", developerGuest, async (req, res) => {
    try {
      let subs = [];
      const dev = await Developer.findOne({ email: req.user.email });
      for (let i = 0; i < dev.subscribed.length; i++) {
        const comp = await Company.findById(dev.subscribed[i]);
        subs.push(comp);
      }
      req.session.dev = dev;
      res.render("developers", { subs: subs, dev: dev, moment: moment });
    }
    catch (err) {
      res.status(500).send();
    }
  })
  .get("/developers/:id", async (req, res) => {
    try {
      let subs = [];
      const dev = await Developer.findById(req.params.id);
      const log = await Developer.findOne({ email: req.user.email });
      for (let i = 0; i < dev.subscribed.length; i++) {
        const comp = await Company.findById(dev.subscribed[i]);
        subs.push(comp);
      }
      res.render("devProfile", { subs: subs, dev: dev, moment: moment, log: log });
    } catch (err) {
      res.status(500).send();
    }
  })
  .get("/developers/subscribe/:id", developerGuest, async (req, res) => {
    try {
      console.log("!\n");
      const comp = await Company.findById(req.params.id);
      const dev = await Developer.findOne({ email: req.user.email });
      if (comp && dev) {
        let flag = true;
        let subs = comp.subscribers;
        let subscr = dev.subscribed;
        for (let i = 0; i < subscr.length; i++) {
          if (subscr[i] == req.params.id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          await Developer.findByIdAndUpdate(dev._id, { "$push": { subscribed: req.params.id } }, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send();
            }
          });
          await Company.findByIdAndUpdate(req.params.id, { "$push": { subscribers: dev._id } }, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send();
            } else {
              
              res.redirect("/developers");
            }
          });
        } else {
          res.redirect("/search");
        }
      } else {
        return res.status(500).send();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })
  .get("/developers/unsubscribe/:id", developerGuest, async (req, res) => {
    try {
      const comp = await Company.findById(req.params.id);
      const dev = await Developer.findOne({ email: req.user.email });
      if (comp && dev) {
        let flag = true;
        let subs = comp.subscribers;
        let subscr = dev.subscribed;
        for (let i = 0; i < subscr.length; i++) {
          if (subscr[i] == req.params.id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          await Developer.findByIdAndUpdate(dev._id, { subscribed: req.params.id }, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send();
            }
          });
          await Company.findByIdAndUpdate(req.params.id, { subscribers: dev._id }, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send();
            } else {
              res.redirect("/trending");
            }
          });
        } else {
          res.redirect("/trending");
        }
      } else {
        return res.status(500).send();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })
  .post("/apply",upload.single("resume"), async (req, res) => {
    try {
      const dev = await Developer.findOne({ email: req.user.email });
      const comp = await Company.findById(req.params.compId);
      if (dev) {
        var apply = new Apply({
          company_id: req.body.compId,
          post_id: req.body.postId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mob: req.body.mob,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          resume: req.file.originalname,
        });
        await apply.save();
        await Company.findOneAndUpdate(
          { _id: req.body.compId, "posts._id": req.body.postId },
          {
            $set: {
              "posts.$.applied": apply._id,
            }
          },
          function (err, doc) {
            if (err) {
              res.status(500).send(err);
            } else {
              console.log(doc);
              res.redirect("/developers");
            }
          }
        );
        await dev.applied.push(req.body.postId);
        await dev.save();
      }
    }
    catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = developerRouter;
