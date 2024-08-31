const { commandeController } = require("../controllers");
const auth = require("../middlewares/auth");
const {admin} = require("../middlewares/roles")

const router = require("express").Router();

router.post("/add", commandeController.alterCommande);
router.get("/all",[auth, admin], commandeController.getAllCommandes);
router.post("/confirm",[auth, admin], commandeController.confirmCommande);
router.post("/cancel",[auth, admin], commandeController.cancelCommande);
router.post("/ship",[auth, admin], commandeController.shipCommande);

module.exports = router;
