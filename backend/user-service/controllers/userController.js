require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
// login user
const loginUser = (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.login(email, password);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register user
const registerUser = (req, res) => {
  const { email, password, nomUser, prenomUser } = req.body;
  try {
    const user = User.register(email, password, nomUser, prenomUser);
    res.status(200).json({ user });
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
