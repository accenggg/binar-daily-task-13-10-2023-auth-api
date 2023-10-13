const router = require("express").Router();

const User = require("../controller/userController");

router.get("/", User.findUsers);
router.post("/", User.createUser);
router.get("/:id", User.findUserById);
router.patch("/:id", User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;
