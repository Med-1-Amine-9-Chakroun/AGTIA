require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRouter");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log("User service: " + req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `User service connected to DB & listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
