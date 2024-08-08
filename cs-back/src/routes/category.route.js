const { categoryController } = require("../controllers");

const router = require("express").Router();

router.post("/add", categoryController.alterCategory);
router.get("/all", categoryController.getCategories);

module.exports = router;
