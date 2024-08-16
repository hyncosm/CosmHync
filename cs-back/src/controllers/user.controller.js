const { alterUser } = require("../services");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Users = mongoose.model("User");
const configs = require("../../config");

const alterUsers = (req, res) => {
  const { user } = req.body;
  console.log(user);
  const query = {
      _id: mongoose.Types.ObjectId(user._id),
    },
    update = user,
    options = {
      upsert: true,
      new: true,
    };
  alterUser.alterUser(query, update, options);
  return res.status(200).json({ message: "Done !" });
};

const authenticate = (req, res) => {
  Users.findOne({ mail: req.body.mail }, function (err, user) {
    if (!user) {
      return res
        .status(401)
        .send({ success: false, msg: " email  is incorrect" });
    }
    if (user.source === "local") {
      if (!user) {
        console.log("verifie email");
        return res
          .status(401)
          .send({ success: false, msg: " email  is incorrect" });
      }

      if (!user.validPassword(req.body.mdp)) {
        console.log("verified");
        return res
          .status(403)
          .send({ success: false, msg: " password is incorrect." });
      }
      var userData = {
        _id: user._id,
        name: user.name,
        sex: user.sex,
        tel: user.tel,
        mail: user.mail,
        role: user.role,
        interest: user.interest,
        source: user.source,
        address: {
          numero: user.address.numero,
          avenue: user.address.avenue,
          ville: user.address.ville,
          codePostale: user.address.codePostale,
        },
      };
      console.log("sending  token");
      var token = jwt.sign(userData, configs.SIGN, {
        expiresIn: 60,
      });
      UserTokenData = { token: token };

      console.log(UserTokenData);

      return res.json(UserTokenData);
    } else {
      return res
        .status(401)
        .send({ success: false, msg: " email  is already used" });
    }
  });
};

const addUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  Users.findById(id)
  .then((user) => {
    return res.status(200).json({
      name: user.name,
      sex: user?.sex,
      tel:  user.tel,
      mail: user?.mail,
      role: user.role,
      interest: user.interest,
     id: user._id,
      address: [
          {
              numero:  user?.address?.numero,
              avenue: user?.address?.avenue,
              ville: user?.address?.ville,
              codePostale: user?.address?.codePostale,
          }
      ],
  });
  })
  .catch((error) => {
    return res.status(500).json({ error });
  });
};

const getById = (req, res) => {
  console.log("in get user", req.params.id)
  Users.findOne({ _id: req.params.id }, function (err, user) {
    if (!user) {
      return res
        .status(401)
        .send({ success: false, msg: " Id is incorrect" });
    }

      var userData = {
        _id: user._id,
        name: user.name,
        sex: user.sex,
        tel: user.tel,
        mail: user.mail,
        role: user.role,
        interest: user.interest,
        source: user.source,
        address: {
          numero: user.address.numero,
          avenue: user.address.avenue,
          ville: user.address.ville,
          codePostale: user.address.codePostale,
        },
      };
      console.log("sending  token");
      var token = jwt.sign(userData, configs.SIGN, {
        expiresIn: 60,
      });
      UserTokenData = { token: token };

      console.log(UserTokenData);

      return res.json({user: userData, UserTokenData});
   
  });
};

module.exports = { alterUsers, authenticate, addUser, getById };
