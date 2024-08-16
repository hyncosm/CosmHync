const { productController } = require("../controllers");

const router = require("express").Router();

router.post("/add", productController.alterProduct);
router.get("/all", productController.getProducts);
router.get("/one/:id", productController.getProductsById);
router.get("/user/:userId", productController.getProductsForUser);
router.get("/category", productController.getProductsByCategory);
router.get("/gender", productController.getProductsByGender);
router.get("/bestSeller", productController.getProductsByBestSeller);

module.exports = router;
