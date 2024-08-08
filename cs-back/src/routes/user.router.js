const { userController } = require("../controllers");

const router = require("express").Router();

router.post("/add", userController.addUser);
router.post("/update", userController.alterUsers);
router.post("/login", userController.authenticate);

module.exports = router;
