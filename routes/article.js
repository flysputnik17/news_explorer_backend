const router = require("express").Router();
const { addNews, getNews, deleteNews } = require("../controllers/article");
const auth = require("../middlewares/auth.js");
const { validateId, validateNewsBody } = require("../middlewares/validation");

router.use(auth);
router.get("/", getNews);

router.post("/", validateNewsBody, addNews);
router.delete("/:articleId", validateId, deleteNews);

module.exports = router;
