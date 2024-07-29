require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register user
const registerUser = async (req, res) => {
  const { email, password, nomUser, prenomUser } = req.body;
  try {
    const user = await User.register(email, password, nomUser, prenomUser);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) {
    res.status(400).json({ error: "No such User" });
  }
  res.status(200).json({ user });
};

// test service user

const testUser = (req, res) => {
  res.send("User service works");
};
// EXPORT methods
module.exports = {
  loginUser,
  registerUser,
  updateUser,
  testUser,
};
