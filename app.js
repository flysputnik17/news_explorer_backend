require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { DB_CONNECTION_STRING, PORT, NODE_ENV } = require("./utils/config");

const app = express();

console.log(`NODE_ENV: ${NODE_ENV}`);

console.log(`DB_CONNECTION_STRING: ${DB_CONNECTION_STRING}`);
console.log(`PORT: ${PORT}`);

const corsOptions = {
  origin:
    NODE_ENV === "production"
      ? "https://newsexplorer.jumpingcrab.com"
      : "http://localhost:3000",
  optionsSuccessStatus: 200,
};

console.log("DB_CONNECTION_STRING:", DB_CONNECTION_STRING);

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB news_explorer_db");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err.message);
    process.exit(1);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
