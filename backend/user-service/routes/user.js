const express = require("express");

const {
  loginUser,
  registerUser,
  updateUser,
  testUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.get("/login", loginUser);

// register route
router.post("/register", registerUser);

// update route
router.put("/update/:id", updateUser);

// test route
router.get("/test", testUser);

module.exports = router;
