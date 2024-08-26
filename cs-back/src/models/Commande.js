const mongoose = require("mongoose");

const Commande = new mongoose.Schema(
  {
    reference: { type: String, default: function () { return getKey(this); } },
    nom: { type: String, required: false, default: "" },
    prenom: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    product: { type: mongoose.Schema.Types.Mixed, required: false, default: "" },
    adresse: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
    qty: { type: Number, required: false, default: 0 },
    status: { type: String, required: false, enum:['PENDING','CONFIRMED', 'SHIPPED', 'CANCELED'], default: "PENDING" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

function getKey(doc) {
  let ID = String(doc._id);
  let ref = `${parseInt(`${ID.substring(ID.length - 6, ID.length)}`, 16)}`;
  return ref;
}

module.exports = mongoose.model("Commande", Commande);
