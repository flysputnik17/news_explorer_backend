const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const NotFoundError = require("../utils/NotFoundError");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
