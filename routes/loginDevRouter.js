const express = require("express");
const passport = require("passport");
const Developer = require("../schema/developerSchema");
const loginDevRouter = express.Router();

loginDevRouter.post("/loginDev", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      if (!user) {
        req.flash("error", info.message);
        return res.redirect("/");
      }
      const dev = await Developer.findOne({ email: user.email });
      if (dev) {
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/developers");
        });
      }
      else {
        console.log("correct");
        return res.redirect("/"); 
      }
    } catch (err) {
      return res.redirect("/");
    }
  })(req, res, next);
});

module.exports = loginDevRouter;
