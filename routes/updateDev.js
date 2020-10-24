const express = require("express");
const router = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");
const Developer = require("../schema/developerSchema");
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

router.post("/updateBasic/:id", upload.single("devpic"), async (req, res) => {
	try {
    const dev = await Developer.findById(req.params.id);
    console.log(dev);
		console.log(req.file)
		let path;
		if (req.file===undefined) {
			path = dev.devPic;
		}
		else { path = req.file.originalname; }
		console.log(path)
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
});

module.exports = router;
