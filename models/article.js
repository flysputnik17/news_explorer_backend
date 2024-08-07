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
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Missing URL",
    },
  },
  urlToImage: {
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
});

module.exports = mongoose.model("article", articleSchema);
