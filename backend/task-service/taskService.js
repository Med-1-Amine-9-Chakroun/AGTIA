require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const cors = require("./routes/taskRoute");

const app = express();

app.get("/api/task", (req, res) => {
  res.send("Api task works");
});
// app.use("/api/task/", taskRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});
