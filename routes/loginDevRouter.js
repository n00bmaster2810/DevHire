const express = require("express");
const passport = require("passport");
const Developer = require("../schema/developerSchema");
const loginDevRouter = express.Router();

loginDevRouter.post("/loginDev", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      console.log(req.body);
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      if (!user) {
        req.flash("error", info.message);
        return res.redirect("/login");
      }
      const dev = await Developer.findOne({ email: user.email });
      if (dev) {
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          console.log(dev)
          req.session.dev = dev;
          res.redirect("/developers");
        });
      }
      else {
        console.log("correct");
        return res.redirect("/login"); 
      }
    } catch (err) {
      return res.redirect("/login");
    }
  })(req, res, next);
});

module.exports = loginDevRouter;
