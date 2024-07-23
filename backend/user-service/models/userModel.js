const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nomUser: {
    type: String,
    required: true,
  },
  prenomUser: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email) {
    throw Error("Email is required");
  }
  if (!password) {
    throw Error("Password is required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is notvalid");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  console.log(user);
  return user;
};

// static register method
userSchema.statics.register = async function (
  email,
  password,
  nomUser,
  prenomUser
) {
  if (!email) {
    throw Error("Email is required");
  }
  if (!password) {
    throw Error("Password is required");
  }
  if (!nomUser) {
    throw Error("First name is required");
  }
  if (!prenomUser) {
    throw Error("Last name is required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: email,
    password: hash,
    nomUser: nomUser,
    prenomUser: prenomUser,
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
