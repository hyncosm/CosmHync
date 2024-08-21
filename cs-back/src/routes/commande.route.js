const { commandeController } = require("../controllers");

const router = require("express").Router();

router.post("/add", commandeController.alterCommande);
router.get("/all", commandeController.getAllCommandes);
router.post("/confirm", commandeController.confirmCommande);
router.post("/cancel", commandeController.cancelCommande);
router.post("/ship", commandeController.shipCommande);

module.exports = router;
