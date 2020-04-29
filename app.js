const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/dbconnect");

dotenv.config({ path: "./config/config.env" });

const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const jobRoutes = require("./api/routes/jobs");
const userRoutes = require("./api/routes/users");

// connect to mongodb
connectDB();

// log requests in console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// getting the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// define routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/jobs", jobRoutes);
app.use("/users", userRoutes);

// handling errors
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
