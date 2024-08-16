const { commandeController } = require("../controllers");

const router = require("express").Router();

router.post("/add", commandeController.alterCommande);
router.post("/all", commandeController.getAllCommandes);

module.exports = router;
