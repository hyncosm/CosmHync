const mongoose = require("mongoose");

const Commande = new mongoose.Schema(
  {
    nom: { type: String, required: false, default: "" },
    prenom: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    product: { type: mongoose.Schema.Types.Mixed, required: false, default: "" },
    adresse: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
    status: { type: String, required: false,enum:['PENDING','CONFIRMED', 'SHIPPED'], default: "PENDING" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);
module.exports = mongoose.model("Commande", Commande);
