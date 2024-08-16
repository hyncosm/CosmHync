const { commandeController } = require("../controllers");

const router = require("express").Router();

router.post("/add", commandeController.alterCommande);

module.exports = router;
