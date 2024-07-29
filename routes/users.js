const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth.js");

router.use(auth);

router.get("/me", getCurrentUser);

module.exports = router;
