const express = require("express");
const passport = require("passport");
const Company = require("../schema/companySchema");
const loginCompRouter = express.Router();

loginCompRouter.post("/loginComp", (req, res, next) => {
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
      const comp = await Company.findOne({ email: user.email });
      if (comp) {
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/companies");
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

module.exports = loginCompRouter;
