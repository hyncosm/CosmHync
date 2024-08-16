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

const getProductsByCategory = async (req, res) => {
  const { category } = req.body;

  Product.find({ "category": category })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getProductsByGender = async (req, res) => {
  const { gender } = req.query;
  console.log("----------------------",gender);

  if(gender) {
    Product.find({ "genders": gender })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    }); 
  } else {
    return res.status(500).json({ error: "Gender is not present" });
  }

   
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

/* const getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  console.log("/GET products by category : ", category);

  Product.find({ category: category })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
}; */

const getProductsById = async (req, res) => {
  // console.log(req);
  const { id } = req.params;

  Product.findById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getByBestSellers = async (req, res) => {
  const { bestSeller } = req.query;

  Product.find({ "bestSeller" : bestSeller })
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
  getProductsByGender,
  getByBestSellers
};
