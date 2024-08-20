const { productController } = require("../controllers");

const router = require("express").Router();
//abdo
router.get("/", productController.getProductsByFilter);

router.post("/add", productController.alterProduct);
router.get("/all", productController.getProducts);
router.get("/one/:id", productController.getProductsById);
router.get("/bestSeller", productController.getProductsByBestSeller);


module.exports = router;
