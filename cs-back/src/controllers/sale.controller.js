const mongoose = require("mongoose");
const { Sale } = require("../models");

const alterSale = async (req, res) => {
  const { sale } = req.body;
  console.log("Sale : ", sale);

  const query = {
      _id: mongoose.Types.ObjectId(sale._id),
    },
    update = sale,
    options = {
      upsert: true,
      new: true,
    };
  Sale.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  });
};

module.exports = {
  alterSale,
};
