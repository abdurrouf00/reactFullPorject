const User = require("../model/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User Already Exist");

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.send({
      success: true,
      message: "user is created successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "email already exist",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).send({ success: false, message: "user and password incorrect" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).send({ success: false, message: "incorrect password" });

    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });

    res.status(200).send({
      success: true,
      message: "user logged in successfully",
      token: "Bearer " + token,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "server error", error: error.message });
  }
};

exports.dashboard = (req, res) => {
  res.status(200).send({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
    },
  }); 
};

exports.logout = (req, res) => {
  res.send({ success: true, message: "Logged out successfully. Please remove the token." });
};
