require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
const taskRouter = require("./routes/taskRouter");

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
  console.log("User service: " + req.path, req.method);
  next();
});

// routes
app.use("/api/task", taskRouter);

mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Task service connected to DB and listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
