const mongoose = require("mongoose");
const { Category } = require("../models");

const alterCategory = async (req, res) => {
  console.log(req.query, req.params, req.body ) 
  const { banner, descAR, descFR, descEN, nameAR, nameFR, nameEN, subs } = req.body;
  const { id } = req.params;
  const query = {
    _id: mongoose.Types.ObjectId(id),
  },
    update = { banner, descAR, descFR, descEN, nameAR, nameFR, nameEN, subs },
    options = {
      upsert: false,
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

const deleteCategory = async (req, res) => {
  Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.error(err);
    } else {
      return res.status(200).json('Document deleted');
    }
  });
}

const newCategory = async (req, res) => {
  const { banner, descAR, descFR, descEN, nameAR, nameFR, nameEN, subs } = req.body;
  try {
    const newCategory = new Category({
      banner,
      nameAR,
      descAR,
      nameFR,
      descFR,
      nameEN,
      descEN,
      subs
    });
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCategories = async (req, res) => {
  Category.find(function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  }).sort({ createdAt: -1 });
};

module.exports = {
  deleteCategory,
  newCategory,
  alterCategory,
  getCategories,
};
