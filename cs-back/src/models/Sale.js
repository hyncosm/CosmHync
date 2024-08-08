const mongoose = require("mongoose");

const Sale = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "" },
    number: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    product: { type: String, required: false, default: "" },
    role: { type: String, required: false, default: "CLIENT" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);
module.exports = mongoose.model("Sale", Sale);
