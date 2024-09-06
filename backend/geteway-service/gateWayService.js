require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log("***************************************");
  console.log("API GateWay: " + req.path, req.headers);
  console.log("Headers: ", req.headers);
  console.log("Body: ", req.body);
  console.log("***************************************");

  next();
});

app.use(
  "/user",
  createProxyMiddleware({
    target: process.env.USER_SERVICE + "/api/user",
    changeOrigin: true,
    pathRewrite: {
      "^/user": "/api/user",
    },
    logLevel: "debug",
  })
);

app.use(
  "/task",
  createProxyMiddleware({
    target: process.env.TASK_SERVICE + "/api/task",
    changeOrigin: true,
    pathRewrite: {
      "^/task": "/api/task",
    },
  })
);
app.listen(process.env.PORT, () => {
  console.log(`API Gateway service listening at ${process.env.PORT}`);
});
