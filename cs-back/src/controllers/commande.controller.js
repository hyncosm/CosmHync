const mongoose = require("mongoose");
const { Commande, Product } = require("../models");

const alterCommande = async (req, res) => {
  const { commande } = req.body;

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
    try {
      // Fetch all commandes
      const commandes = await Commande.find();
  
      // Map over commandes and fetch product details
      const updatedCommandes = await Promise.all(commandes.map(async (commande) => {
        try {
          // Fetch the product details
          const product = await Product.findById(commande.product);
          if (product) {
            // Update the commande with product details
            commande.product = product;
          } else {
            // Handle case where product is not found
            commande.product = null; // or handle as appropriate
          }
        } catch (err) {
          console.error('Error fetching product:', err);
          // Handle specific error, possibly set product to null or handle accordingly
          commande.product = null;
        }
        return commande;
      }));
  
      // Send the updated commandes as a response
      return res.status(200).json(updatedCommandes);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

module.exports = {
  alterCommande,
  getAllCommandes
};
