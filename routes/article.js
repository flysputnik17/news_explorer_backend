const router = require("express").Router();
const { addNews, getNews, deleteNews } = require("../controllers/article");
const auth = require("../middlewares/auth.js");
// const { validateId } = require("../middlewares/validation");

router.get("/", getNews);
router.use(auth);

router.post("/", addNews);
router.delete("/:articleId", deleteNews);

module.exports = router;
