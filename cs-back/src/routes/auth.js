const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.mdp, salt);
    const newUser = new User({
      name: req.body.name,
      mail: req.body.mail,
      tel: req.body.tel,
      mdp: hashedPassword,
      sex: req.body.sex,
      address: req.body.address,
      role: "CLIENT",
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ role:req.body.role,  mail: req.body.email });
    if (!user) {
      return res.status(404).json("user not found");
    } else {
      const validPassword = await bcrypt.compare(req.body.password, user.mdp);
      if (!validPassword) {
        return res.status(400).json("wrong password");
      } else {

        return res.status(200).json(
          {
            name: user.name,
            sex: user.sex,
            tel: user.tel,
            mail: user.mail,
            role: user.role,
            interest: user.interest,
            id: user._id,
            address: user.address
          }
        );
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
