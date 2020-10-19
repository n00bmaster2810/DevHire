const mongoose = require("mongoose");
const Post = require("../schema/jobPostSchema");

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
    posts: [Post.schema],
    headquarter: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0
    },
    coverPic: {
      type: String,
    },   
  },
  { timestamps: true }
);


var comModel= mongoose.model("Company", company);
module.exports =comModel;