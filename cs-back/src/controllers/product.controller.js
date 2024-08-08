const mongoose = require("mongoose");
const { Product } = require("../models");

const alterProduct = async (req, res) => {
  const { product } = req.body;
  console.log("Product : ", product);

  const query = {
      _id: mongoose.Types.ObjectId(product._id),
    },
    update = product,
    options = {
      upsert: true,
      new: true,
    };
  Product.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  });

  // const image = new Image(product.image);
  // try {
  //   await image.save();
  //   console.log("Image :: ", image);
  //   product.pictures = product.image.image;
  //   const query = {
  //       _id: mongoose.Types.ObjectId(product._id),
  //     },
  //     update = product,
  //     options = {
  //       upsert: true,
  //       new: true,
  //     };
  //   Product.findOneAndUpdate(query, update, options, function (error, result) {
  //     if (error) {
  //       console.log("An error occured : ", error);
  //       return res.status(500).json({ message: error });
  //     } else {
  //       console.log("Result :", result);
  //       return res.status(200).json(result);
  //     }
  //   });
  // } catch (error) {
  //   return res.status(500).json({ message: error });
  // }
};

const getProductsForUser = async (req, res) => {
  const { userId } = req.params;

  Product.find({ "owner.id": userId })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getProducts = async (req, res) => {
  Product.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  console.log("/GET products by category : ", category);

  Product.find({ category: category })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getProductsById = async (req, res) => {
  // console.log(req);
  const { id } = req.params;

  console.log("/GET products by id : ", id);

  Product.findById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  alterProduct,
  getProductsForUser,
  getProductsByCategory,
  getProducts,
  getProductsById,
};
