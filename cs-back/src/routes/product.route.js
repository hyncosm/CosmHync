const { productController } = require("../controllers");

const router = require("express").Router();

router.post("/add", productController.alterProduct);
router.get("/all", productController.getProducts);
router.get("/category", productController.getProductsByCategory);
router.get("/one/:id", productController.getProductsById);
router.get("/:userId", productController.getProductsForUser);

module.exports = router;
