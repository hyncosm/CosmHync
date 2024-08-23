const mongoose = require("mongoose");
const Users = mongoose.model("User");

const alterUsers = (req, res) => {
  const { user } = req.body;
  const query = {
    _id: mongoose.Types.ObjectId(user._id),
  },
    update = user,
    options = {
      upsert: true,
      new: true,
    };
  Users.findOneAndUpdate(query, update, options, (error, result) => {
    error && console.log("an erorr occured", error);
  });
  return res.status(200).json({ message: "Done !" });
};

const getById = (req, res) => {
  Users.findOne({ _id: req.params.id }, function (err, user) {
    if (!user) {
      return res
        .status(401)
        .send({ success: false, msg: "Id is incorrect" });
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
      address: user.address
    };

    return res.status(200).json(userData);

  });
};

module.exports = { alterUsers, getById };
