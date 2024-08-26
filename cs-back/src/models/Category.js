const mongoose = require("mongoose");
const subCategories = new mongoose.Schema({
  nameAR: { type: String, required: true },
  nameFR: { type: String, required: true },
  nameEN: { type: String, required: true },
})

const Category = new mongoose.Schema(
  {
    nameAR: { type: String, required: true },
    nameFR: { type: String, required: true },
    nameEN: { type: String, required: true },
    
    descAR: { type: String, required: true },
    descFR: { type: String, required: true },
    descEN: { type: String, required: true },

    subs: [{ type: subCategories, required: false  }],
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);


module.exports = mongoose.model("Category", Category);
