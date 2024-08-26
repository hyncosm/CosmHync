const { brandController } = require("../controllers");
const router = require("express").Router();

router.post("/:id", brandController.alterBrand);
router.post("/delete/:id", brandController.deleteBrand);
router.get("/", brandController.getBrands);
router.post("/", brandController.newBrand);

module.exports = router;
