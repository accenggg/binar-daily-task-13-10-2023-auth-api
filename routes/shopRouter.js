const router = require("express").Router();

const Shop = require("../controller/shopController");

const autentikasi = require("../middlewares/authenticate");
const checkOwnership = require("../middlewares/checkOwnership");

router.get("/", Shop.findShops);
router.post("/", checkOwnership("Owner"), Shop.createShop);
router.get("/:id", Shop.findShopById);
router.patch("/:id", checkOwnership("Owner"), Shop.UpdateShop);
router.delete("/:id", checkOwnership("Owner"), Shop.deleteShop);

module.exports = router;
