const mongoose = require("mongoose");

const company = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    compPic: {
      type: String,
    },
    preference: {
      type: String,
      require: true,
    },
    website: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", company);
