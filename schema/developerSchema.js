const mongoose = require("mongoose");
const Experience = require("../schema/experienceSchema");
const Certificate = require("../schema/certificationSchema");

const developer = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    devPic: {
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    subscribed: [
      {
        type: String,
      },
    ],
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    facebook: {
      type: String,
    },
    website: {
      type: String,
    },
    dob: {
      type: Date,
    },
    school: {
      type: String,
    },
    headline: {
      type: String,
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    industry: {
      type: String
    },
    experience: [Experience.schema],
    certificate: [Certificate.schema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Developer", developer);
