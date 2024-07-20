const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/news_explorer_db")
  .then(() => {
    console.log("Connected to DB news_explorer_db");
  })
  .catch(console.error);

app.listen(3001, () => {
  console.log(`server is running on port ${PORT}`);
});
