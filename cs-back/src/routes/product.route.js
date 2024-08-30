const { productController } = require("../controllers");
const auth = require("../middlewares/auth");
const {admin} = require("../middlewares/roles")

const router = require("express").Router();
//abdo
router.get("/", productController.getProductsByFilter);

router.post("/add",[auth, admin], productController.alterProduct);
router.get("/all", productController.getProducts);
router.get("/one/:id", productController.getProductsById);
router.post("/delete/:id", [auth, admin],productController.deleteProduct);
router.get("/bestSeller", productController.getProductsByBestSeller);
router.get("/brands",productController.getProductOwners);

module.exports = router;
