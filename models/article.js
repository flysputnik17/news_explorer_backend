const mongoose = require("mongoose");
const validator = require("validator");
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Missing URL",
    },
  },
  image: {
    type: String,
    required: [true, "The image URL field is Missing"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Missing image URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
});

module.exports = mongoose.model("article", articleSchema);
