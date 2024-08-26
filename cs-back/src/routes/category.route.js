const { categoryController } = require("../controllers");

const router = require("express").Router();

router.post("/:id", categoryController.alterCategory);
router.get("/", categoryController.getCategories);
router.post("/", categoryController.newCategory);
router.post("/delete/:id", categoryController.deleteCategory);

module.exports = router;
