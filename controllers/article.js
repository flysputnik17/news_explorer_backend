const Article = require("../models/article");

const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");
const NotFoundError = require("../utils/NotFoundError");

const getNews = (req, res, next) => {
  Article.find({})
    .then((news) => res.send(news))
    .catch((err) => {
      next(err);
    });
};

const addNews = (req, res, next) => {
  const { keyword, title, description, publishedAt, source, url, urlToImage } =
    req.body;
  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner: req.user._id,
  })
    .then((newNews) => res.status(201).send({ data: newNews }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteNews = (req, res, next) => {
  const { articleId } = req.params;
  console.log("Received articleId:", articleId);
  Article.findById(articleId)
    .orFail()
    .then((news) => {
      if (String(news.owner) === req.user._id) {
        return news.deleteOne().then(() => {
          res.send({ message: "news deleted" });
        });
      }

      return next(
        new ForbiddenError("You are not authorized to delete this news.")
      );
    })
    .catch((err) => {
      console.error(err);
      console.error("err", err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  addNews,
  getNews,
  deleteNews,
};
