const {
  NODE_ENV,
  JWT_SECRET = "secret_password",
  DB_CONNECTION_STRING = "mongodb://127.0.0.1:27017/news_explorer_db",
  PORT = 3001,
} = process.env || {};

module.exports = { JWT_SECRET, NODE_ENV, DB_CONNECTION_STRING, PORT };
