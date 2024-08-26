const mongoose = require("mongoose");

const Brand = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "" },
    logo: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

module.exports = mongoose.model("Brand", Brand);
