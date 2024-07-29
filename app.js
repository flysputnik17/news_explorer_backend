require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

console.log("process.env:", process.env.NODE_ENV);

mongoose
  .connect("mongodb://127.0.0.1:27017/news_explorer_db")
  .then(() => {
    console.log("Connected to DB news_explorer_db");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3001, () => {
  console.log(`server is running on port ${PORT}`);
});
