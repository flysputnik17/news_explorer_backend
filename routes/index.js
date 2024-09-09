const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const NotFoundError = require("../utils/NotFoundError");
const articleRouter = require("./article");

const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.use("/articles", articleRouter);

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

router.use("/users", userRouter);

router.use((req, res, next) => {
  if (req.originalUrl === "/") {
    res.send("Welcome to the NEWS EXPLORER API");
  } else {
    next(new NotFoundError("Requested resource not found"));
  }
});

module.exports = router;
