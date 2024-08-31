const { categoryController } = require("../controllers");
const auth = require("../middlewares/auth");
const {admin} = require("../middlewares/roles")

const router = require("express").Router();

router.post("/:id",[auth, admin], categoryController.alterCategory);
router.get("/", categoryController.getCategories);
router.post("/",[auth, admin], categoryController.newCategory);
router.post("/delete/:id", [auth, admin],categoryController.deleteCategory);

module.exports = router;
