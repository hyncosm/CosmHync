const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      name: req.body.username,
      mail: req.body.email,
      mdp: hashedPassword,
      role: req.body.role,
    });

    //save user and respond
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log("/POST /login");
  try {
    const user = await User.findOne({ mail: req.body.email });
    // !user && res.status(404).json("user not found");

    if (!user) {
      console.log("!user : ", user);
      return res.status(404).json("user not found");
    } else {
      const validPassword = await bcrypt.compare(req.body.password, user.mdp);
      if (!validPassword) {
        return res.status(400).json("wrong password");
      } else {
        delete user["mdp"];

        return res.status(200).json(user);
      }
    }
  } catch (err) {
    console.log("Error :: ", err);
    return res.status(500).json(err);
  }
});

module.exports = router;
