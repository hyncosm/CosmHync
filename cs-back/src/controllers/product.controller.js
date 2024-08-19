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

// const getProductsByCategory = async (req, res) => {
//   const { category } = req.body;

//   Product.find({ "category": category })
//     .then((result) => {
//       return res.status(200).json(result);
//     })
//     .catch((error) => {
//       return res.status(500).json({ error });
//     });
// };

const getProductsByCategory = async (req, res) => {
  const { categories } = req.body; // Expecting mains to be an array of main categories

  // Ensure mains is an array
  if (!Array.isArray(categories)) {
    return res.status(400).json({ error: "Mains should be an array" });
  }

  try {
    // Query to find products where category.main matches any value in mains array
    const products = await Product.find({
      "category.main": { $in: categories }
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductsBySubCategory = async (req, res) => {
  const { subs } = req.body; // Expecting subs to be an array of sub categories

  // Ensure subs is an array
  if (!Array.isArray(subs)) {
    return res.status(400).json({ error: "Subs should be an array" });
  }

  try {
    // Query to find products where category.sub matches any value in subs array
    const products = await Product.find({
      "category.sub": { $in: subs }
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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

const getProductsByBestSeller = async (req, res) => {
    Product.find({ "bestSeller": "true" })
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
  getByBestSellers,
  getProductsByBestSeller,
  getProductsBySubCategory
};
