const { brandController } = require("../controllers");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const {admin} = require("../middlewares/roles")

router.post("/:id", [auth, admin],brandController.alterBrand);
router.post("/delete/:id", [auth, admin],brandController.deleteBrand);
router.get("/", brandController.getBrands);
router.post("/", [auth, admin],brandController.newBrand);

module.exports = router;
