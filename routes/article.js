const router = require("express").Router();
const { addNews, getNews, deleteNews } = require("../controllers/article");
const auth = require("../middlewares/auth,js");

router.use(auth);

router.get("/", getNews);
router.post("/", addNews);
router.put("/articleId", deleteNews);
// router.put("/:articleId/likes", likeNews);
// router.put("/:articleId/likes", unlikeNews);

module.exports = router;
