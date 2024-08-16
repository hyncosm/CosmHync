const mongoose = require("mongoose");
const { Commande } = require("../models");

const alterCommande = async (req, res) => {
  const { commande } = req.body;
  console.log("commande : ", commande);

  const query = {
      _id: mongoose.Types.ObjectId(commande._id),
    },
    update = commande,
    options = {
      upsert: true,
      new: true,
    };
  Commande.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  });
};

const getAllCommandes = async (req, res) => {
    Commande.find()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  };

module.exports = {
  alterCommande,
  getAllCommandes
};
