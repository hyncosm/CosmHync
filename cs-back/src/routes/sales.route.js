const { saleController } = require("../controllers");

const router = require("express").Router();

router.post("/add", saleController.alterSale);

module.exports = router;
