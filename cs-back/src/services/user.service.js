const mongoose = require("mongoose");
const { User } = require("../models");
const Users = mongoose.model("User");

const alterUser = (query, update, options) => {
  User.findOneAndUpdate(query, update, options, (error, result) => {
    error && console.log("an erorr occured", error);
  });
};

const addUser = (body) => {
  return Users.findOne({ mail: body.mail }, function (err, user) {
    if (user) {
      return "This email already exists";
    } else {
      let userr = new Users();
      userr.name = body.name;
      userr.sex = body.sex;
      userr.tel = body.tel;
      userr.mail = body.mail;
      userr.mdp = userr.generateHash(body.mdp);
      // user.role = body.role;
      userr.interest = body.interest;
      userr.source = body.source;
      userr.address = {
        numero: body.address.numero,
        avenue: body.address.avenue,
        ville: body.address.ville,
        codePostale: body.address.codePostale,
      };
      return userr.save((err) => {
        if (!err) return "Done !";
        else {
          console.log("Error during record insertion" + err);

          return err;
        }
      });
    }
  });
};

module.exports = { alterUser, addUser };
