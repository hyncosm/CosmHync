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
    const { status } = req.query
    let query = {};
    if (status) {
      query["status"] = status;
    }
    const commandes = await Commande.find(query).sort({ createdAt: -1 });

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

const confirmCommande = async (req, res) => {
  try {
    // Extract the commande ID from the request body
    const { id } = req.body;

    // Find the commande by ID and update its status
    const updatedCommande = await Commande.findByIdAndUpdate(
      id,
      { status: 'CONFIRMED' },
      { new: true } // Return the updated document
    );

    // Check if the commande was found
    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }

    // Respond with the updated commande
    res.status(200).json(updatedCommande);
  } catch (error) {
    console.error('Error confirming commande:', error);
    res.status(500).json({ message: 'Server error' });
  }

}

const cancelCommande = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedCommande = await Commande.findByIdAndUpdate(
      id,
      { status: 'CANCELED' },
      { new: true } // Return the updated document
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }

    res.status(200).json(updatedCommande);
  } catch (error) {
    console.error('Error canceling commande:', error);
    res.status(500).json({ message: 'Server error' });
  }

}

const shipCommande = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedCommande = await Commande.findByIdAndUpdate(
      id,
      { status: 'SHIPPED' },
      { new: true } // Return the updated document
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }

    res.status(200).json(updatedCommande);
  } catch (error) {
    console.error('Error shipping commande:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  alterCommande,
  getAllCommandes,
  confirmCommande,
  cancelCommande,
  shipCommande
};
