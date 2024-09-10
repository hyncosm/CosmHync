const { userController } = require("../controllers");
const auth = require("../middlewares/auth");
const {admin} = require("../middlewares/roles")

const router = require("express").Router();

router.post("/update", [auth, admin], userController.alterUsers);
router.get("/:id", [auth, admin], userController.getById);

module.exports = router;
