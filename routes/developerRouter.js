const express = require("express");
const developerRouter = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");
const Developer = require("../schema/developerSchema");

/* GET developers page. */
developerRouter
  .get("/developers", developerGuest, async (req, res) => {
    try {
      let subs = [];
      const dev = await Developer.findOne({ email: req.user.email });
      for (let i = 0; i < dev.subscribed.length; i++){
        const comp = await Company.findById(dev.subscribed[i]);
        subs.push(comp);
      }
      res.render("developers", {subs: subs, dev: dev});
    }
    catch (err) {
      res.status(500).send();
    }
  })
  .get("/developers/profile", developerGuest, (req, res) => {
    res.render("devProfile");
  })
  .get("/developers/subscribe/:id", developerGuest, async (req, res) => {
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
  });

module.exports = developerRouter;
