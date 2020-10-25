const express = require("express");
const router = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");
const Developer = require("../schema/developerSchema");
const multer = require("multer");
const Experience = require("../schema/experienceSchema");
const Certificate = require("../schema/certificationSchema");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .post("/updateBasic/:id", upload.single("devpic"), async (req, res) => {
    try {
      const dev = await Developer.findById(req.params.id);
      console.log(dev);
      console.log(req.file);
      let path;
      if (req.file === undefined) {
        path = dev.devPic;
      } else {
        path = req.file.originalname;
      }
      console.log(path);
      await Developer.findByIdAndUpdate(
        req.params.id,
        {
          devPic: path,
          headline: req.body.headline,
          linkedin: req.body.linkedin,
          github: req.body.github,
          facebook: req.body.facebook,
          website: req.body.website,
          dob: req.body.dob,
          country: req.body.country,
          city: req.body.city,
          industry: req.body.industry,
        },
        (err) => {
          if (err) {
            res.status(404).send(err);
          } else {
            res.redirect("/developers/profile");
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post("/addExp/:id", upload.single("media"), async (req, res) => {
    try {
      const experience = new Experience({
        title: req.body.title,
        type: req.body.type,
        company: req.body.company,
        location: req.body.location,
        startDate: req.body.start,
        endDate: req.body.end,
        industry: req.body.industry,
        description: req.body.description,
        media: req.file.originalname,
      });
      const dev = await Developer.findById(req.params.id);
      if (dev) {
        dev.experience.push(experience);
        await dev.save();
        res.redirect("/developers/profile");
      } else {
        res.status(500).send();
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post("/editExp/:id", upload.single("media"), async (req, res) => {
    try {
      const experience = new Experience({
        title: req.body.title,
        type: req.body.type,
        company: req.body.company,
        location: req.body.location,
        startDate: req.body.start,
        endDate: req.body.end,
        industry: req.body.industry,
        description: req.body.description,
        media: req.file.originalname,
      });
      const dev = await Developer.findOne({ email: req.user.email });
      Developer.findOneAndUpdate(
        { _id: dev._id, "experience._id": req.params.id },
        {
          $set: {
            "experience.$.title": req.body.title,
            "experience.$.type": req.body.type,
            "experience.$.company": req.body.company,
            "experience.$.location": req.body.location,
            "experience.$.startDate": req.body.start,
            "experience.$.endDate": req.body.end,
            "experience.$.industry": req.body.industry,
            "experience.$.description": req.body.description,
            "experience.$.media": req.file.originalname,
          },
        },
        function (err, doc) {
          if (err) {
            res.status(500).send(err);
          } else {
            console.log(doc);
            res.redirect("/developers/profile");
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post("/addCert/:id", async (req, res) => {
    console.log(req.body);
    try {
      const certificate = new Certificate({
        name: req.body.name,
        organisation: req.body.org,
        issueDate: req.body.issue,
        url: req.body.cred,
      });
      const dev = await Developer.findById(req.params.id);
      if (dev) {
        dev.certificate.push(certificate);
        await dev.save();
        res.redirect("/developers/profile");
      } else {
        res.status(500).send();
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post("/editCert/:id", async (req, res) => {
    try {
       const certificate = new Certificate({
         name: req.body.name,
         organisation: req.body.org,
         issueDate: req.body.issue,
         url: req.body.cred,
       });
      const dev = await Developer.findOne({ email: req.user.email });
      Developer.findOneAndUpdate(
        { _id: dev._id, "certificate._id": req.params.id },
        {
          $set: {
            "certificate.$.name": req.body.name,
            "certificate.$.organisation": req.body.org,
            "certificate.$.issueDate": req.body.issue,
            "certificate.$.url": req.body.cred,
          },
        },
        function (err, doc) {
          if (err) {
            res.status(500).send(err);
          } else {
            console.log(doc);
            res.redirect("/developers/profile");
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
