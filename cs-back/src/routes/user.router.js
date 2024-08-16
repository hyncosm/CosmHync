const { userController } = require("../controllers");

const router = require("express").Router();

router.post("/add", userController.addUser);
router.post("/update", userController.alterUsers);
router.post("/login", userController.authenticate);
router.get("/one/:id", userController.getById);

module.exports = router;
