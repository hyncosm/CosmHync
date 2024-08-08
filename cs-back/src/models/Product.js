const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "" },
    pictures: [{ type: String, required: false, default: "" }],
    video: { type: String, required: false, default: "" },
    category: { type: String, required: false, default: "Product" },
    owner: {
      id: { type: String, required: false, default: "" },
      name: { type: String, required: false, default: "" },
    },
    price: { type: Number, required: false, default: 0 },
    oldPrice: { type: Number, required: false, default: 0 },
    stars: { type: Number, required: false, default: 0 },
    sales: { type: Number, required: false, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    comments: [
      {
        username: { type: String, required: false, default: "" },
        message: { type: String, required: false, default: "" },
      },
    ],
    support: { type: Number, required: false, default: 0 },
    description: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

module.exports = mongoose.model("Product", Product);
