const mongoose = require("mongoose");

const Image = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "" },
    image: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

module.exports = mongoose.model("Image", Image);
