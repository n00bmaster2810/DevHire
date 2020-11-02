const mongoose = require("mongoose");
const Post = require("../schema/jobPostSchema");
const Update = require("../schema/updateSchema");
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
    website: {
      type: String,
      require: true,
    },
    posts: [Post.schema],
    update: [Update.schema],
    headquarter: {
      type: String,
    },
    subscribers: [
      {
        type: String,
      },
    ],
    coverPic: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    pininterest: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  { timestamps: true }
);


var comModel= mongoose.model("Company", company);
module.exports =comModel;