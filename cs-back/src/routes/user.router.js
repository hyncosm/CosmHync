const { userController } = require("../controllers");

const router = require("express").Router();

router.post("/update", userController.alterUsers);
router.get("/:id", userController.getById);

module.exports = router;
