const mongoose = require("mongoose");

const Group = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "" },
    categories: [{ type: String, required: false, default: "" }],
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

module.exports = mongoose.model("Group", Group);
