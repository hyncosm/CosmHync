const mongoose = require("mongoose");
const { Product } = require("../models");
const Products = mongoose.model("Product");

const addProduct = (product) => {
  console.log(product);
};

const alterProduct = () => {};

const deleteProduct = () => {};

module.exports = {
  addProduct,
};
