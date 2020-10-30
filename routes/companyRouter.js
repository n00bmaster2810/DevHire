const express = require("express");
const companyRouter = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");
const moment = require("moment");
const multer = require("multer");

//Defining the location where the uploaded file will be stored abd the name of the file while stoing it.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    return cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

var cpUpload = upload.fields([
  { name: "compPic", maxCount: 1 },
  { name: "compCover", maxCount: 1 },
]);

/* GET company page. */
companyRouter
  .get("/companies", developerGuest, async (req, res) => {
    try {
      const comp = await Company.findOne({ email: req.user.email });
      if (comp) {
        res.render("companies", { user: comp });
      } else {
        res.render("/");
      }
    } catch (err) {
      return res.status(500);
    }
  })
  .get("/companies/:id", developerGuest, async (req, res) => {
    try {
      console.log(req.params.id);
      const comp = await Company.findOne({ _id: req.params.id });
      if (comp) {
        res.render("companyProfile", { user: comp });
      } else {
        res.redirect("/companies");
      }
    } catch (err) {
      res.redirect("/companies");
    }
  })
  .post("/editComp/:id", cpUpload, async (req, res) => {
    try {
      const comp = await Company.findById(req.params.id);
      let compPic = "",
        compCover = "";

      console.log(req.files);
      if (comp.compPic) {
        if (req.files.compPic[0]) {
          compPic = req.files.compPic[0].originalname;
        } else {
          compPic = comp.compPic;
        }
      } else {
        if (req.files.compPic[0]) {
          compPic = req.files.compPic[0].originalname;
        } else {
          compPic = "default-comPic.jpg";
        }
      }
      console.log(req.body);
      if (comp.coverPic) {
        if (req.files.compCover[0]) {
          compCover = req.files.compCover[0].originalname;
        } else {
          compCover = comp.coverPic;
        }
      } else {
        if (req.files.compCover[0]) {
          compCover = req.files.compCover[0].originalname;
        } else {
          compPic = "default-compCover.jpg";
        }
      }
      console.log(compPic);
      console.log(compCover);
      await Company.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          website: req.body.website,
          headquarter: req.body.head,
          linkedin: req.body.linkedin,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          pininterest: req.body.pininterest,
          instagram: req.body.instagram,
          compPic: compPic,
          coverPic: compCover,
        },
        (err, doc) => {
          if (err) {
            res.status(500).send(err);
            console.log(err);
          } else {
            console.log(doc);
            res.redirect("/companies");
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = companyRouter;
