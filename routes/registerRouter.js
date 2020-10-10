const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const Developer = require("../schema/developerSchema");
const Company = require("../schema/companySchema");
const registerRouter = express.Router();



registerRouter.post("/register", async (req, res) => {
	
  const { firstName, lastName, email, password } = req.body;

  //validate request
  if (!firstName || !lastName || !email || !password) {
    req.flash("error", "All fields are mandatory");
    req.flash("firstname", firstName);
    req.flash("lastname", lastName);
    req.flash("email", email);
    return res.redirect("/");
  }

  const comp = req.body.company;
  const dev = req.body.developer;
  
  //Check if email exists
  User.exists({ email: email }, (err, result) => {
    if (result) {
      req.flash("error", "Email Exists");
      return res.redirect("/");
    }
  });

  //password hashing by use of bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  
  if (comp === "on") {
    const company = new Company({
      email: email,
      password: hashedPassword
    });
    try {
      await company.save();
      res.redirect("/");
    } catch (err) {
      res.status(500).send(err);
    }
  } else if (dev === "on") {
    const developer = new Developer({
      email: email,
      password: hashedPassword,
    });
    try {
      await developer.save();
      res.redirect("/");
    } catch (err) {
      res.status(500).send(err);
    }
  }
	
  //storing req body data in database
  const user = new User({
    firstName: firstName,
    lastName: lastName,
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

module.exports = registerRouter;