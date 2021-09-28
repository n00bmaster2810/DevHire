const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const Company = require("../schema/companySchema");
const Developer = require("../schema/developerSchema");
const registerRouter = express.Router();
const multer = require("multer");
const randomstring = require("randomstring");
const mailer = require("../misc/mailer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(null, true);
  } else if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

registerRouter
  .post("/registerDev", upload.single("devPic"), async (req, res) => {
    try {
      console.log(req.body);
      const { firstName, lastName, email, level, institution } = req.body;

      //Check if email exists
      const devi = await Developer.findOne({ email: req.body.email });

      if (devi) {
        req.flash("error", "Email Exists");
        res.redirect("/register");
      }

      //password hashing by use of bcrypt
      const password = randomstring.generate();
      const hashedPassword = await bcrypt.hash(password, 10);

      const dev = new Developer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        devPic: req.file !== undefined ? req.file.originalname : null,
        level: level,
        institution: institution,
      });
      //await dev.save();

      //const user = new User({
      //  email: email,
      //  password: hashedPassword,
      //});

      //await user.save();
      const html = `Hi there
		<br/> This is your password
		<br/>
		Password: <b>${password}</b>
		<br/>
		Login as a developer on the following page:
		<a href="http://localhost:5000/login">http://localhost:5000/login</a>
		<br/> <br/>
		`;

      await mailer.sendEmail("hack.mnnit.36@gmail.com", email, "Please verify your email", html);
      req.flash("success", "Registered succesfully.  Login with your email-id and password which has been emailed to you.");
      res.redirect("/login");
    } catch (err) {
      return res.status(500);
    }
  })
  .post("/registerComp", upload.single("compPic"), async (req, res) => {
    try {
      const { companyName, email, preference, website } = req.body;

      //Check if email exists
      const compi = await Company.findOne({ email: req.body.email });
      if (compi) {
        req.flash("error", "Email Exists");
        res.redirect("/register");
      }

      //password hashing by use of bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      //storing req body data in database
      const comp = new Company({
        name: companyName,
        email: email,
        password: hashedPassword,
        compPic: req.file !== undefined ? req.file.originalname : null,
        preference: preference,
        website: website,
      });

      const user = new User({
        email: email,
        password: hashedPassword,
      });

      await user.save();

      await comp.save();
      req.flash("success", "Registered succesfully.  Login with your email-id and password which has been emailed to you.");
      res.redirect("/login");
      console.log(comp);
    } catch (err) {
      return res.status(500);
    }
  });

module.exports = registerRouter;
