const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    nameFR: { type: String, required: false, default: "" },
    nameEN: { type: String, required: false, default: "" },
    nameAR: { type: String, required: false, default: "" },
    pictures: [{ type: String, required: false, default: "" }],
    video: { type: String, required: false, default: "" },
    category: {
      main: { type: String, required: false, default: "Product" },
      sub: { type: String, required: false, default: "Product" },
    },
    owner: {
      id: { type: String, required: false, default: "" },
      name: { type: String, required: false, default: "" },
    },
    price: { type: Number, required: false, default: 0 },
    currency: { type: String, required: false, default: "MAD" },
    oldPrice: { type: Number, required: false, default: 0 },
    stars: { type: Number, required: false, default: 0 },
    sales: { type: Number, required: false, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    genders: [{ type: String, required: false, default: "female" }],
    comments: [
      {
        username: { type: String, required: false, default: "" },
        message: { type: String, required: false, default: "" },
      },
    ],
    support: { type: Number, required: false, default: 0 },
    descriptionFR: { type: String, required: false, default: "" },
    descriptionEN: { type: String, required: false, default: "" },
    descriptionAR: { type: String, required: false, default: "" },
    bestSeller: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);


module.exports = mongoose.model("Product", Product);
