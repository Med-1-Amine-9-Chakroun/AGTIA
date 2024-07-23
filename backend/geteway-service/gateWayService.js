require("dotenv").config();

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// app.use(
//   "/api/user/test",
//   createProxyMiddleware({
//     target: "USER_SERVICE",
//     pathRewrite: {
//       "^/api/user": "",
//     },
//   })
// );

// app.use(express.json());

app.use((req, res, next) => {
  console.log("API GateWay: " + req.path, req.method);
  // authentification

  next();
});

app.use(
  "/user",
  createProxyMiddleware({
    target: `${process.env.USER_SERVICE}` + "api/user",
    changeOrigin: true,
    pathRewrite: {
      [`^/user`]: "",
    },
  })
);

app.use(
  "/task",
  createProxyMiddleware({
    target: `${process.env.TASK_SERVICE}` + "api/task",
    changeOrigin: true,
    pathRewrite: {
      [`^/task`]: "",
    },
  })
);
app.listen(process.env.PORT, () => {
  console.log(`API Gateway service listening at ${process.env.PORT}`);
});
