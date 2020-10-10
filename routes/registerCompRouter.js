const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const Company = require("../schema/companySchema");
const registerCompRouter = express.Router();

registerCompRouter.post("/registerComp", async (req, res) => {
  const { companyName, email, password } = req.body;

  //validate request
  if (!companyName || !email || !password) {
    req.flash("error", "All fields are mandatory");
    req.flash("companyName", companyName);
    req.flash("email", email);
    return res.redirect("/");
  }

  //Check if email exists
  User.exists({ email: email }, (err, result) => {
    if (result) {
      req.flash("error", "Email Exists");
      return res.redirect("/");
    }
  });

  //password hashing by use of bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const company = new Company({
    email: email,
    password: hashedPassword,
  });
  try {
    await company.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }

  //storing req body data in database
  const user = new User({
    firstName: companyName,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.redirect("/");
  } catch (err) {
    res.status(500);
  }
  console.log(req.body);
});

module.exports = registerCompRouter;
