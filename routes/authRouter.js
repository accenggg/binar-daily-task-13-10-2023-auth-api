const router = require("express").Router();

const Auth = require("../controller/authController");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.post("/token", Auth.token);
router.get("/", Auth.cek);

module.exports = router;
