const router = require("express").Router();

const Product = require("../controller/productController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");

router.post("/", upload.single("image"), Product.createProduct);
router.get("/", autentikasi, Product.findProducts);
router.get("/:id", autentikasi, Product.findProductById);
router.patch(
  "/:id",
  autentikasi,
  checkOwnership("Owner"),
  Product.UpdateProduct
);
router.delete(
  "/:id",
  autentikasi,
  checkOwnership("Owner"),
  Product.deleteProduct
);

module.exports = router;
