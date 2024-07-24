const router = require("express").Router();
const {
  createNews,
  getNews,
  likeNews,
  unlikeNews,
  deleteNews,
} = require("../controllers/article");

router.get("/", getNews);
router.post("/articles", createNews);
router.put("/articles/articleId", deleteNews);
router.put("/:articleId/likes", likeNews);
router.put("/:articleId/likes", unlikeNews);

module.exports = router;
