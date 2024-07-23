const express = require("express");

const {
  loginUser,
  registerUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.get("/login", loginUser);

// register route
router.post("/register", registerUser);

// update route
router.put("/update", updateUser);

// test route
router.put("/test", updateUser);

module.exports = router;
