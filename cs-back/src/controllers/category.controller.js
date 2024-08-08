const mongoose = require("mongoose");
const { Category } = require("../models");

const alterCategory = async (req, res) => {
  const { category } = req.body;
  const query = {
      _id: mongoose.Types.ObjectId(category._id),
    },
    update = category,
    options = {
      upsert: true,
      new: true,
    };
  Category.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  });
};

const getCategories = async (req, res) => {
  console.log("/GET categories");
  Category.find(function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  });
};

module.exports = {
  alterCategory,
  getCategories,
};
