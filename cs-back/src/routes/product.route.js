const { productController } = require("../controllers");

const router = require("express").Router();
//abdo
router.get("/", productController.getProductsByFilter);

router.post("/add", productController.alterProduct);
router.get("/all", productController.getProducts);
router.get("/one/:id", productController.getProductsById);
// router.post("/delete/:id", productController.deleteProduct);
router.get("/bestSeller", productController.getProductsByBestSeller);
router.get("/brands", productController.getProductOwners);
router.post("/delete", productController.deleteProduct);


module.exports = router;
