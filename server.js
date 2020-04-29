const http = require("http");
const colors = require("colors");

const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
  )
);
