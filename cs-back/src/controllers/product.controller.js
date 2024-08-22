const mongoose = require("mongoose");
const { Product } = require("../models");

const getProductsByFilter = async (req, res) => {
  try {
    const { main_categories, sub_categories, gender, marques } = req.query;
    let query = {};
    if (main_categories) {
      query["category.main"] = { $in: main_categories };
    }
    if (sub_categories) {
      query["category.sub"] = { $in: sub_categories };
    }
    if (marques) {
      query["owner.name"] = { $in: marques };
    }
    if (gender) {
      query["genders"] = { $in: [gender] };
    }
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

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

const getProductsByBestSeller = async (req, res) => {
  Product.find({ bestSeller: "true" })
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

const getProductOwners = async (req, res) => {
  try {
    const uniqueOwnerNames = await Product.aggregate([
      { $group: { _id: "$owner.name" } }, 
      { $project: { _id: 0, name: "$_id" } },
    ]);

    // Extract only the names from the results
    const ownerNames = uniqueOwnerNames.map((owner) => owner.name);

    res.status(200).json(ownerNames);
  } catch (error) {
    console.error("Error fetching unique owner names:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProductsByFilter,
  alterProduct,
  getProducts,
  getProductsById,
  getProductsByBestSeller,
  getProductOwners
};
