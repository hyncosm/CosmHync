const mongoose = require("mongoose");

const bcrypt = require("bcrypt-nodejs");

const User = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "" },
    sex: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
    mail: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    mdp: { type: String, required: false, default: "" },
    role: { type: String, required: false, default: "CLIENT" }
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    //toJSON,
  }
);

User.methods.generateHash = function (pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function (pass) {
  console.log("Validating password");
  return bcrypt.compareSync(pass, this.mdp);
};

module.exports = mongoose.model("User", User);
