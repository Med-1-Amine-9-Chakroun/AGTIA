require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const cors = require("./routes/taskRoute");

const app = express();
app.use((req, res, next) => {
  console.log("User service: " + req.path, req.method);
  next();
});

app.get("/api/task", (req, res) => {
  res.send("Api task works");
});
// app.use("/api/task/", taskRoute);

app.listen(process.env.PORT, () => {
  console.log(`Task service listening on port ${process.env.PORT}`);
});
