const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    main: { type: String, required: false, default: "" },
    sub: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    picture: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

module.exports = mongoose.model("Category", Category);
